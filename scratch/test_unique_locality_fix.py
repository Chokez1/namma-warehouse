import sys, os
sys.path.insert(0, 'backend')
from solver import GridpointSolver
import numpy as np
import time

BASE_DIR = os.getcwd()
data_path = os.path.join(BASE_DIR, 'City data', 'bangalore_data_normalized.csv')
if not os.path.exists(data_path):
    data_path = os.path.join(BASE_DIR, 'City data', 'bangalore_data.csv')
loc_path = os.path.join(BASE_DIR, 'City data', 'prices', 'bangalore_locality_prices.csv')

s = GridpointSolver(data_path, loc_path)

def solve_with_unique_localities(num_warehouses, budget_monthly, min_dispersion_km, property_size_sqft=2500.0):
    start_time = time.time()
    p = num_warehouses

    single_site_monthly_rents = (s.prices * property_size_sqft * 0.004) + 120000.0 * (s.prices / s.mean_price)
    sorted_rents = np.sort(single_site_monthly_rents)
    min_possible_rent = float(np.sum(sorted_rents[:p]))

    max_packing_d = 25.0 / np.sqrt(p) if p > 1 else 0.0
    base_d_min = min(min_dispersion_km, max_packing_d) if p > 1 else 0.0
    d_floor = max(1.5, min(base_d_min * 0.60, 20.0 / np.sqrt(p))) if p > 1 else 0.0

    # 1. Calculate true minimum possible rent for p dispersed sites across UNIQUE localities
    sorted_by_rent = np.argsort(single_site_monthly_rents)
    cheapest_dispersed = []
    seen_locs = set()
    for idx in sorted_by_rent:
        loc = s.points[idx]['nearest_locality']
        if loc not in seen_locs and all(s.D_road[idx, c] >= d_floor for c in cheapest_dispersed):
            cheapest_dispersed.append(idx)
            seen_locs.add(loc)
            if len(cheapest_dispersed) == p:
                break

    if len(cheapest_dispersed) < p:
        return {
            'status': 'infeasible',
            'reason': 'dispersion_or_budget',
            'message': f"Cannot pack {p} warehouses across distinct localities with {min_dispersion_km:.1f} km separation in Bangalore.",
            'suggested_budget': None
        }

    min_dispersed_rent = float(np.sum(single_site_monthly_rents[cheapest_dispersed]))

    if budget_monthly is not None and budget_monthly < min_dispersed_rent:
        suggested = round(min_dispersed_rent * 1.06, -4)
        return {
            'status': 'infeasible',
            'reason': 'dispersion_or_budget',
            'message': f"Monthly budget of Rs {budget_monthly/100000:.1f} Lakhs is insufficient to place {p} warehouses across distinct localities with {min_dispersion_km:.1f} km separation. Minimum required rent is Rs {min_dispersed_rent/100000:.1f} Lakhs/month. Increase budget to Rs {suggested/100000:.1f} Lakhs or reduce warehouse count.",
            'suggested_budget': suggested
        }

    cand_indices = np.arange(s.n)
    cand_costs_init = s.shifts.dot(s.D_traffic[:, cand_indices])

    if budget_monthly is not None:
        tightness = budget_monthly / min_dispersed_rent
        if tightness < 1.35:
            target_rent = budget_monthly / p
            rent_dev = np.abs(single_site_monthly_rents[cand_indices] - target_rent) / target_rent
            cost_norm = cand_costs_init / max(1.0, float(np.max(cand_costs_init)))
            seed_scores = cost_norm + 1.2 * rent_dev
            sorted_seed_indices = cand_indices[np.argsort(seed_scores)]
        else:
            sorted_seed_indices = cand_indices[np.argsort(cand_costs_init)]
    else:
        sorted_seed_indices = cand_indices[np.argsort(cand_costs_init)]

    d_levels = [base_d_min * (0.88 ** i) for i in range(8)]
    d_levels = [d for d in d_levels if d >= d_floor]
    if not d_levels or d_levels[-1] > d_floor:
        d_levels.append(d_floor)

    best_sites = None
    best_cost = np.inf
    achieved_d = d_floor

    # Pre-build locality lookup map
    point_locality = [s.points[i]['nearest_locality'] for i in range(s.n)]

    for d_curr in d_levels:
        for attempt in range(min(20, len(sorted_seed_indices))):
            first_site = int(sorted_seed_indices[attempt])
            current_sites = [first_site]
            current_locs = {point_locality[first_site]}
            curr_min_dists = s.D_traffic[:, first_site].copy()

            feasible = True
            for step in range(1, p):
                rem_p = p - step - 1
                cand_mins = np.minimum(curr_min_dists[:, None], s.D_traffic)
                cand_eval_costs = s.shifts.dot(cand_mins)
                cand_eval_costs[current_sites] = np.inf

                if budget_monthly is not None:
                    spent_so_far = float(np.sum(single_site_monthly_rents[current_sites]))
                    future_min_spent = float(np.sum(sorted_rents[:rem_p])) if rem_p > 0 else 0.0
                    exceeds_budget = (spent_so_far + single_site_monthly_rents + future_min_spent) > budget_monthly
                    cand_eval_costs[exceeds_budget] = np.inf

                # HARD DISPERSION: distance >= d_curr
                for prev_s in current_sites:
                    cand_eval_costs[s.D_road[:, prev_s] < d_curr] = np.inf

                # HARD UNIQUE LOCALITY: locality cannot already be in current_locs
                for idx in np.where(cand_eval_costs < np.inf)[0]:
                    if point_locality[idx] in current_locs:
                        cand_eval_costs[idx] = np.inf

                valid = np.where(cand_eval_costs < np.inf)[0]
                if len(valid) == 0:
                    feasible = False
                    break

                if budget_monthly is not None:
                    spent_so_far = float(np.sum(single_site_monthly_rents[current_sites]))
                    future_min_spent = float(np.sum(sorted_rents[:rem_p])) if rem_p > 0 else 0.0
                    rem_budget = budget_monthly - spent_so_far - future_min_spent
                    target_avg = rem_budget / (rem_p + 1)
                    rent_penalty = np.maximum(0, (single_site_monthly_rents[valid] - target_avg) / target_avg)
                    trans_scores = cand_eval_costs[valid]
                    trans_norm = trans_scores / max(1.0, float(np.max(trans_scores)))
                    combined_scores = trans_norm + 1.2 * rent_penalty
                    best_cand = int(valid[np.argmin(combined_scores)])
                else:
                    best_cand = int(valid[np.argmin(cand_eval_costs[valid])])

                current_sites.append(best_cand)
                current_locs.add(point_locality[best_cand])
                curr_min_dists = cand_mins[:, best_cand]

            if feasible and len(current_sites) == p:
                actual_rent = float(np.sum(single_site_monthly_rents[current_sites]))
                if budget_monthly is None or actual_rent <= budget_monthly:
                    total_trans = float(np.sum(s.shifts * curr_min_dists))
                    if total_trans < best_cost:
                        best_cost = total_trans
                        best_sites = current_sites
                        achieved_d = d_curr
                        break
        if best_sites is not None:
            break

    if best_sites is None:
        suggested = round(min_dispersed_rent * 1.12, -4)
        return {
            'status': 'infeasible',
            'reason': 'dispersion_or_budget',
            'message': f"Could not place {p} warehouses across distinct localities under budget of Rs {budget_monthly/100000:.1f} Lakhs.",
            'suggested_budget': suggested
        }

    current_sites = best_sites

    # Local swap search respecting BOTH dispersion AND unique locality
    if p > 1:
        swap_d_min = max(d_floor, achieved_d * 0.85)
        for _ in range(4):
            improved = False
            for i in range(min(p, 10)):
                other_sites = [current_sites[k] for k in range(p) if k != i]
                other_locs = {point_locality[s] for s in other_sites}
                base_min = np.min(s.D_traffic[:, other_sites], axis=1)
                cand_mins = np.minimum(base_min[:, None], s.D_traffic)
                cand_costs = s.shifts.dot(cand_mins)

                cand_costs[other_sites] = np.inf
                cand_costs[current_sites[i]] = np.inf

                for s_prev in other_sites:
                    cand_costs[s.D_road[:, s_prev] < swap_d_min] = np.inf

                for idx in np.where(cand_costs < np.inf)[0]:
                    if point_locality[idx] in other_locs:
                        cand_costs[idx] = np.inf

                if budget_monthly is not None:
                    other_rent = float(np.sum(single_site_monthly_rents[other_sites]))
                    cand_costs[(other_rent + single_site_monthly_rents) > budget_monthly] = np.inf

                valid = np.where(cand_costs < np.inf)[0]
                if len(valid) > 0:
                    best_cand_idx = int(valid[np.argmin(cand_costs[valid])])
                    current_cost = float(np.sum(s.shifts * np.minimum(base_min, s.D_traffic[:, current_sites[i]])))
                    if cand_costs[best_cand_idx] < current_cost - 1e-1:
                        current_sites[i] = best_cand_idx
                        improved = True
            if not improved:
                break

    min_pair_d = min(s.D_road[current_sites[i], current_sites[j]] for i in range(p) for j in range(i+1, p)) if p > 1 else 0.0
    locs = [s.points[c]['nearest_locality'] for c in current_sites]
    tot_rent = sum(single_site_monthly_rents[c] for c in current_sites)

    return {
        'status': 'ok',
        'p': p,
        'rent_lakhs': tot_rent / 100000,
        'min_pair_d': min_pair_d,
        'unique_localities': len(set(locs)),
        'localities': locs,
        'solve_time_ms': round((time.time() - start_time) * 1000, 2)
    }

print("=== TEST 1: User's screenshot (20 hubs, 30L budget, 2km disp) ===")
r1 = solve_with_unique_localities(20, 3000000.0, 2.0)
print("Status:", r1['status'])
print("Message:", r1.get('message', ''))
print("Suggested Budget:", r1.get('suggested_budget', 0)/100000, "Lakhs")

print("\n=== TEST 2: 20 hubs with realistic budget (35L budget, 2km disp) ===")
r2 = solve_with_unique_localities(20, 3500000.0, 2.0)
print("Status:", r2['status'])
if r2['status'] == 'ok':
    print(f"Placed {r2['p']} hubs | Rent: {r2['rent_lakhs']:.2f}L | Min pair dist: {r2['min_pair_d']:.2f} km | Unique: {r2['unique_localities']}/{r2['p']}")
    print("Localities:", r2['localities'])

print("\n=== TEST 3: 20 hubs Unlimited budget ===")
r3 = solve_with_unique_localities(20, None, 2.0)
print("Status:", r3['status'])
if r3['status'] == 'ok':
    print(f"Placed {r3['p']} hubs | Rent: {r3['rent_lakhs']:.2f}L | Min pair dist: {r3['min_pair_d']:.2f} km | Unique: {r3['unique_localities']}/{r3['p']}")
    print("Localities:", r3['localities'])
