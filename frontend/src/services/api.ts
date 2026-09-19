/**
 * GRIDPOINT API Service Layer
 * Decouples UI components from backend communication and provides
 * real-time facility location simulation and optimization responses.
 */

import {
  OptimizationConfig,
  OptimizationResult,
  DemandZone,
  Warehouse,
} from '../types';
import {
  BENGALURU_CANDIDATE_WAREHOUSES,
  BENGALURU_DEMAND_ZONES,
  DEFAULT_OPTIMIZATION_CONFIG,
} from '../data/cityData';
import { runOptimization } from '../utils/solver';

class GridpointApiService {
  private currentConfig: OptimizationConfig = { ...DEFAULT_OPTIMIZATION_CONFIG };
  private candidateWarehouses: Warehouse[] = [...BENGALURU_CANDIDATE_WAREHOUSES];
  private demandZones: DemandZone[] = [...BENGALURU_DEMAND_ZONES];
  private currentResult: OptimizationResult | null = null;

  constructor() {
    // Pre-calculate initial optimized state for Bengaluru
    this.currentResult = runOptimization(
      this.candidateWarehouses,
      this.demandZones,
      this.currentConfig
    );
  }

  /**
   * POST /optimize
   * Submits optimization parameters and returns calculated optimal network configuration
   */
  async optimizeNetwork(
    config: Partial<OptimizationConfig>,
    onProgress?: (step: string, index: number) => void
  ): Promise<OptimizationResult> {
    this.currentConfig = {
      ...this.currentConfig,
      ...config,
    };

    const steps = [
      'Analyzing demand zones & traffic indices...',
      'Calculating spatial transport distances...',
      'Evaluating candidate warehouse footprints...',
      'Assigning delivery routes & capacity...',
      'Generating optimal logistics network...',
    ];

    if (onProgress) {
      for (let i = 0; i < steps.length; i++) {
        onProgress(steps[i], i);
        // Small realistic async pause
        await new Promise((r) => setTimeout(r, 220));
      }
    }

    const result = runOptimization(
      this.candidateWarehouses,
      this.demandZones,
      this.currentConfig
    );
    this.currentResult = result;
    return result;
  }

  /**
   * POST /scenario
   * Simulates what-if conditions: Demand increase, Traffic hike, Fuel price spike, Warehouse failure
   */
  async simulateScenario(scenario: {
    type: 'demand' | 'traffic' | 'fuel' | 'warehouse_failure';
    percentageChange?: number;
    disabledWarehouseId?: string;
  }): Promise<{ before: OptimizationResult; after: OptimizationResult }> {
    const before = this.currentResult || runOptimization(
      this.candidateWarehouses,
      this.demandZones,
      this.currentConfig
    );

    const scenarioConfig: OptimizationConfig = {
      ...this.currentConfig,
    };

    if (scenario.type === 'demand' && scenario.percentageChange) {
      scenarioConfig.demandMultiplier = 1 + scenario.percentageChange / 100;
    } else if (scenario.type === 'traffic' && scenario.percentageChange) {
      scenarioConfig.trafficMultiplier = 1 + scenario.percentageChange / 100;
      if (scenario.percentageChange >= 30) scenarioConfig.trafficLevel = 'high';
    } else if (scenario.type === 'fuel' && scenario.percentageChange) {
      scenarioConfig.fuelPrice =
        this.currentConfig.fuelPrice * (1 + scenario.percentageChange / 100);
    } else if (scenario.type === 'warehouse_failure' && scenario.disabledWarehouseId) {
      scenarioConfig.disabledWarehouseIds = [
        ...(this.currentConfig.disabledWarehouseIds || []),
        scenario.disabledWarehouseId,
      ];
    }

    const after = runOptimization(
      this.candidateWarehouses,
      this.demandZones,
      scenarioConfig
    );

    this.currentResult = after;
    return { before, after };
  }

  /**
   * Reset scenario / back to baseline config
   */
  async resetScenario(): Promise<OptimizationResult> {
    this.currentConfig = {
      ...DEFAULT_OPTIMIZATION_CONFIG,
      disabledWarehouseIds: [],
    };
    const result = runOptimization(
      this.candidateWarehouses,
      this.demandZones,
      this.currentConfig
    );
    this.currentResult = result;
    return result;
  }

  /**
   * Update active dataset with uploaded zones or points
   */
  async setCustomDemandZones(zones: DemandZone[]): Promise<OptimizationResult> {
    this.demandZones = zones;
    return this.optimizeNetwork(this.currentConfig);
  }

  /**
   * Get current state
   */
  getCurrentResult(): OptimizationResult {
    if (!this.currentResult) {
      this.currentResult = runOptimization(
        this.candidateWarehouses,
        this.demandZones,
        this.currentConfig
      );
    }
    return this.currentResult;
  }

  getCurrentConfig(): OptimizationConfig {
    return { ...this.currentConfig };
  }

  getCandidateWarehouses(): Warehouse[] {
    return [...this.candidateWarehouses];
  }

  getDemandZones(): DemandZone[] {
    return [...this.demandZones];
  }
}

export const api = new GridpointApiService();
