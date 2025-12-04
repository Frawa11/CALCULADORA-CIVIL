export const MATERIALS = {
    CEMENT: {
        weightPerBag: 42.5, // kg
        density: 3150, // kg/m3 (Pe)
    },
    HORMIGON: {
        density: 2700, // kg/m3 (Pe)
        unitWeight: 1800, // kg/m3 (PUS)
    },
    STONE: {
        density: 2700, // kg/m3 (Pe)
        unitWeight: 1700, // kg/m3 (PUS)
    },
    WATER: {
        density: 1000, // kg/m3
    },
    CONVERSION: {
        ft3_to_m3: 0.02832 // Standard conversion used in Excel
    }
};

export const WASTAGE = {
    standard: 0.05, // 5%
    cement: 0.017, // ~1.7% to match Excel's 2.97 factor
    aggregates: 0.05 // 5%
};
