// Data extracted from "(.) Calculo de materiales por 1m3..xlsx" Sheet "Tabla"
// Proporción | a/c | Cemento (bls) | Hormigón (m3) | Agua (lt)
// Note: The excel analysis showed some values, but I will use standard construction values if some are missing, 
// but based on the analysis:
// Row 4: 1:6, a/c 0.8
// Row 5: 1:7, a/c 0.8
// Row 6: 1:8, a/c 0.8
// ...
// I will also include standard concrete strengths (175, 210) from the other file "Dosificación de concreto en obra"
// which is more useful for structural concrete.

export const CONCRETE_PROPORTIONS = [
    { label: '1:6', cement: 6.2, hormigon: 1.05, water: 0.21 },
    { label: '1:7', cement: 5.5, hormigon: 1.09, water: 0.19 },
    { label: '1:8', cement: 5.24, hormigon: 1.186, water: 0.18 },
    { label: '1:9', cement: 4.6, hormigon: 1.16, water: 0.16 },
    { label: '1:10', cement: 4.2, hormigon: 1.19, water: 0.14 },
    { label: '1:12', cement: 3.6, hormigon: 1.23, water: 0.12 },
];

// From "Dosificación de concreto en obra..xlsx" Sheet "Tabla"
// F'c | Cemento (bls) | Arena (m3) | Piedra (m3) | Agua (m3)
export const STRUCTURAL_CONCRETE = [
    { fc: '140', cement: 7.01, sand: 0.51, stone: 0.64, water: 0.184 },
    { fc: '175', cement: 8.43, sand: 0.54, stone: 0.55, water: 0.185 },
    { fc: '210', cement: 9.73, sand: 0.52, stone: 0.53, water: 0.186 },
    { fc: '245', cement: 11.50, sand: 0.50, stone: 0.51, water: 0.187 },
    { fc: '280', cement: 13.34, sand: 0.45, stone: 0.51, water: 0.189 },
];
