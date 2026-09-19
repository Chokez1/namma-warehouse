from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class OptimizeRequest(BaseModel):
    num_warehouses: int = Field(default=3, ge=1, le=100, description="Number of warehouses to place (1 to 100)")
    budget_monthly: Optional[float] = Field(default=None, description="Max monthly facility rent budget in INR (None = unconstrained)")
    property_size_sqft: float = Field(default=2500.0, ge=100.0, description="Warehouse footprint in sq.ft (default: 2,500 sq.ft)")
    petrol_cost_per_km: float = Field(default=2.0, ge=0.5, description="Fuel cost rate in INR per km (default: 2.0)")
    batch_size: int = Field(default=23, ge=1, le=50, description="Deliveries per driver per day (default: 23, range: 15-30) or batch trip size")
    min_dispersion_km: float = Field(default=6.5, ge=0.0, description="Minimum separation distance between hubs in km (default: 6.5 km)")
    max_radius_km: Optional[float] = Field(default=None, description="Max delivery radius cutoff in km (None = unconstrained)")
    use_capacity: bool = Field(default=False, description="Whether to enforce warehouse capacity limits")
    capacity_per_warehouse: Optional[float] = Field(default=None, description="Max daily order throughput per warehouse")

class WarehouseDetail(BaseModel):
    id: str
    name: str
    locality: str
    zone: str
    lat: float
    lng: float
    price_per_sqft: float
    traffic_index: float
    suitability_score: float
    monthly_rent: float
    annual_rent: float
    assigned_orders: float
    employees_required: int
    daily_salary: float
    monthly_salary: float
    utilization_pct: float
    color: str

class Assignment(BaseModel):
    demand_id: str
    warehouse_id: str
    distance_km: float

class CostBreakdown(BaseModel):
    daily_fleet_km: float
    daily_fuel: float
    annual_fuel: float
    daily_fuel_liters: float
    annual_co2_tons: float
    avg_km_per_driver: float
    total_employees: int
    daily_driver_wages: float
    monthly_driver_wages: float
    monthly_rent: float
    annual_rent: float
    total_annual: float
    budget_used_pct: Optional[float] = None

class OptimizeResponse(BaseModel):
    status: str
    reason: Optional[str] = None
    message: Optional[str] = None
    suggested_budget: Optional[float] = None
    warehouses: List[WarehouseDetail] = []
    assignments: List[Assignment] = []
    costs: Optional[CostBreakdown] = None
    meta: Dict[str, Any] = {}

class CityDataPoint(BaseModel):
    point_id: str
    latitude: float
    longitude: float
    orders_per_day: float
    price_per_sqft: float
    traffic_index: float
    norm_demand: float
    norm_price: float
    norm_traffic: float
    suitability_score: float
    nearest_locality: str
    zone: str

class CityResponse(BaseModel):
    bounds: Dict[str, float]
    total_points: int
    total_daily_orders: float
    points: List[CityDataPoint]
    defaults: Dict[str, Any]

class TradeoffPoint(BaseModel):
    num_warehouses: int
    monthly_rent: float
    annual_rent: float
    annual_fuel: float
    total_annual: float
    feasible: bool

class TradeoffResponse(BaseModel):
    points: List[TradeoffPoint]
    recommended_p: int
