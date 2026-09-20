import sys, os
sys.path.insert(0, 'backend')
from solver import GridpointSolver
import numpy as np

BASE_DIR = os.getcwd()
data_path = os.path.join(BASE_DIR, 'City data', 'bangalore_data_normalized.csv')
if not os.path.exists(data_path):
    data_path = os.path.join(BASE_DIR, 'City data', 'bangalore_data.csv')
loc_path = os.path.join(BASE_DIR, 'City data', 'prices', 'bangalore_locality_prices.csv')

s = GridpointSolver(data_path, loc_path)
p = 20
budget_monthly = 3000000.0
property_size_sqft = 2500.0

single_site_monthly_rents = (s.prices * property_size_sqft * 0.004) + 120000.0 * (s.prices / s.mean_price)

# Check: Can we pick 20 sites with UNIQUE localities?
# What is the minimum cost of 20 sites with UNIQUE localities?
# Group points by locality, find the cheapest point in each locality:
locality_cheapest = {}
for idx in range(s.n):
    loc = s.points[idx]['nearest_locality']
    rent = single_site_monthly_rents[idx]
    if loc not in locality_cheapest or rent < locality_cheapest[loc]['rent']:
        locality_cheapest[loc] = {'idx': idx, 'rent': rent}

print(f"Total unique localities in Bangalore dataset: {len(locality_cheapest)}")
# Sort localities by cheapest rent:
sorted_locs = sorted(locality_cheapest.items(), key=lambda x: x[1]['rent'])
print("Top 25 cheapest localities:")
for loc, data in sorted_locs[:25]:
    print(f"  {loc}: Rs {data['rent']:.0f}")

cheapest_20_unique_loc_rent = sum(data['rent'] for loc, data in sorted_locs[:20])
print(f"\nSum of 20 cheapest UNIQUE localities: Rs {cheapest_20_unique_loc_rent:,.0f} ({cheapest_20_unique_loc_rent/100000:.2f} Lakhs)")

# Now what if we ALSO require min dispersion (e.g. >= 2.5 km or >= 3.0 km)?
for d in [3.5, 3.0, 2.5, 2.0]:
    chosen = []
    chosen_locs = set()
    for loc, data in sorted_locs:
        idx = data['idx']
        if all(s.D_road[idx, c] >= d for c in chosen):
            chosen.append(idx)
            chosen_locs.add(loc)
            if len(chosen) == p:
                break
    if len(chosen) == p:
        tot = sum(single_site_monthly_rents[chosen])
        print(f"Dispersion >= {d:.1f} km + Unique Localities: Cheapest {p} sites = Rs {tot/100000:.2f} Lakhs (Fits in 30L? {tot <= budget_monthly})")
    else:
        print(f"Dispersion >= {d:.1f} km + Unique Localities: Cannot find {p} sites (only found {len(chosen)})")
