import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

// Brick pattern images
import sogaImg from '../../../assets/images/brick_soga.png';
import cabezaImg from '../../../assets/images/brick_cabeza.png';
import cantoImg from '../../../assets/images/brick_canto.png';

export const BrickWall = () => {
    // Dimensions in cm
    const [length, setLength] = useState(23); // King Kong standard
    const [height, setHeight] = useState(9);
    const [thickness, setThickness] = useState(12.5);
    const [joint, setJoint] = useState(1.5);
    const [waste, setWaste] = useState(5); // %
    const [area, setArea] = useState(1); // m2

    // Prices
    const [priceBrick, setPriceBrick] = useState(0); // per unit
    const [priceMortar, setPriceMortar] = useState(0); // per m3

    const [results, setResults] = useState(null);
    const [patternResults, setPatternResults] = useState(null);
    const [selectedPattern, setSelectedPattern] = useState('soga');
    const [includeWaste, setIncludeWaste] = useState(true);
    const { addItem } = useBudget();

    useEffect(() => {
        const l_m = length / 100;
        const h_m = height / 100;
        const t_m = thickness / 100;
        const j_m = joint / 100;

        // Bricks per m2 formula: 1 / ((L + J) * (H + J))
        const bricksPerM2 = 1 / ((l_m + j_m) * (h_m + j_m));

        // Mortar volume per m2: (1 * 1 * Thickness) - (Bricks * L * H * Thickness)
        const wallVolPerM2 = 1 * 1 * t_m;
        const bricksVolPerM2 = bricksPerM2 * l_m * h_m * t_m;
        const mortarVolPerM2 = wallVolPerM2 - bricksVolPerM2;

        // Totals with waste
        const totalBricks = Math.ceil(bricksPerM2 * area * (1 + waste / 100));
        const totalMortar = mortarVolPerM2 * area * (1 + waste / 100);

        setResults({
            bricksUnit: bricksPerM2.toFixed(2),
            mortarUnit: mortarVolPerM2.toFixed(4),
            totalBricks: totalBricks,
            totalMortar: totalMortar.toFixed(3)
        });

        // Calculate for the three standard patterns using dynamic dimensions
        // TIPO SOGA: Largo x Alto (thickness is wall width)
        const sogaBricks = 1 / ((l_m + j_m) * (h_m + j_m));
        const sogaBricksWithWaste = Math.ceil(sogaBricks * (1 + waste / 100));

        // TIPO CABEZA: Ancho x Alto (length is wall width)
        const cabezaBricks = 1 / ((t_m + j_m) * (h_m + j_m));
        const cabezaBricksWithWaste = Math.ceil(cabezaBricks * (1 + waste / 100));

        // TIPO CANTO: Largo x Ancho (height is wall width)
        const cantoBricks = 1 / ((l_m + j_m) * (t_m + j_m));
        const cantoBricksWithWaste = Math.ceil(cantoBricks * (1 + waste / 100));

        setPatternResults({
            soga: { base: sogaBricks.toFixed(2), withWaste: sogaBricksWithWaste },
            cabeza: { base: cabezaBricks.toFixed(2), withWaste: cabezaBricksWithWaste },
            canto: { base: cantoBricks.toFixed(2), withWaste: cantoBricksWithWaste }
        });

    }, [length, height, thickness, joint, waste, area]);

    const handleSave = () => {
        if (!results || !patternResults) return;

        const patternData = patternResults[selectedPattern];
        const totalBricks = includeWaste ? patternData.withWaste : Math.ceil(patternData.base * area);
        const totalMortar = includeWaste ? results.totalMortar : (results.mortarUnit * area).toFixed(3);

        const costBricks = (totalBricks * priceBrick).toFixed(2);
        const costMortar = (totalMortar * priceMortar).toFixed(2);
        const totalCost = (parseFloat(costBricks) + parseFloat(costMortar)).toFixed(2);

        addItem({
            type: 'Muro de Ladrillo',
            description: `Área ${area} m² - ${selectedPattern.toUpperCase()} - Ladrillo ${length}x${height}x${thickness}`,
            details: {
                'Total Ladrillos': `${totalBricks} und`,
                'Total Mortero': `${totalMortar} m³`,
                'Ladrillos/m2': `${patternData.base} und`,
                'Desperdicio': includeWaste ? `${waste}%` : '0%',
                'Costo Ladrillos': `S/. ${costBricks}`,
                'Costo Mortero': `S/. ${costMortar}`,
                'Costo Total': `S/. ${totalCost}`
            }
        });
    };

    // Calculate current costs for display
    const getCurrentCosts = () => {
        if (!results || !patternResults) return { bricks: 0, mortar: 0, total: 0 };
        const patternData = patternResults[selectedPattern];
        const totalBricks = includeWaste ? patternData.withWaste : Math.ceil(patternData.base * area);
        const totalMortar = includeWaste ? results.totalMortar : (results.mortarUnit * area).toFixed(3);

        const costBricks = (totalBricks * priceBrick).toFixed(2);
        const costMortar = (totalMortar * priceMortar).toFixed(2);
        const total = (parseFloat(costBricks) + parseFloat(costMortar)).toFixed(2);

        return { bricks: costBricks, mortar: costMortar, total };
    };

    const currentCosts = getCurrentCosts();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Cálculo de Ladrillos">
                <div className="input-group">
                    <label className="label">Tipo de Ladrillo (Largo x Alto x Ancho) cm</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>Largo</span>
                            <input type="number" className="input" value={length} onChange={e => setLength(Number(e.target.value))} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>Alto</span>
                            <input type="number" className="input" value={height} onChange={e => setHeight(Number(e.target.value))} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>Ancho</span>
                            <input type="number" className="input" value={thickness} onChange={e => setThickness(Number(e.target.value))} />
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label className="label">Junta (cm)</label>
                    <input type="number" className="input" value={joint} onChange={e => setJoint(Number(e.target.value))} step="0.1" />
                </div>

                <div className="input-group">
                    <label className="label">Área de Muro (m²)</label>
                    <input type="number" className="input" value={area} onChange={e => setArea(Number(e.target.value))} />
                </div>

                <div className="input-group">
                    <label className="label">Desperdicio (%)</label>
                    <input type="number" className="input" value={waste} onChange={e => setWaste(Number(e.target.value))} />
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>Precios Unitarios (S/.)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Ladrillo (und)</label>
                            <input type="number" className="input" value={priceBrick} onChange={e => setPriceBrick(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Mortero (m³)</label>
                            <input type="number" className="input" value={priceMortar} onChange={e => setPriceMortar(parseFloat(e.target.value) || 0)} />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Brick Pattern Types */}
            {patternResults && (
                <div style={{
                    background: '#f8f9fa',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.1rem' }}>
                        Tipos de Aparejo (1 m²)
                    </h4>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        {/* TIPO SOGA */}
                        <div style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '6px',
                            textAlign: 'center',
                            border: '2px solid #fbbf24'
                        }}>
                            <h5 style={{ color: '#f59e0b', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                ⭐ TIPO SOGA
                            </h5>
                            <img
                                src={sogaImg}
                                alt="Tipo Soga"
                                style={{ width: '100%', maxWidth: '150px', margin: '0.5rem auto', display: 'block' }}
                            />
                            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                                {length} cm × {height} cm
                            </div>
                            <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                <strong>{patternResults.soga.base}</strong> und/m²
                            </div>
                            <div style={{
                                background: '#fef3c7',
                                padding: '0.4rem',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                color: '#92400e'
                            }}>
                                Con {waste}%: <strong>{patternResults.soga.withWaste}</strong> und
                            </div>
                        </div>

                        {/* TIPO CABEZA */}
                        <div style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '6px',
                            textAlign: 'center',
                            border: '2px solid #fb923c'
                        }}>
                            <h5 style={{ color: '#ea580c', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                ⭐ TIPO CABEZA
                            </h5>
                            <img
                                src={cabezaImg}
                                alt="Tipo Cabeza"
                                style={{ width: '100%', maxWidth: '150px', margin: '0.5rem auto', display: 'block' }}
                            />
                            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                                {thickness} cm × {height} cm
                            </div>
                            <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                <strong>{patternResults.cabeza.base}</strong> und/m²
                            </div>
                            <div style={{
                                background: '#fed7aa',
                                padding: '0.4rem',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                color: '#7c2d12'
                            }}>
                                Con {waste}%: <strong>{patternResults.cabeza.withWaste}</strong> und
                            </div>
                        </div>

                        {/* TIPO CANTO */}
                        <div style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '6px',
                            textAlign: 'center',
                            border: '2px solid #f87171'
                        }}>
                            <h5 style={{ color: '#dc2626', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                ⭐ TIPO CANTO
                            </h5>
                            <img
                                src={cantoImg}
                                alt="Tipo Canto"
                                style={{ width: '100%', maxWidth: '150px', margin: '0.5rem auto', display: 'block' }}
                            />
                            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                                {length} cm × {thickness} cm
                            </div>
                            <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                <strong>{patternResults.canto.base}</strong> und/m²
                            </div>
                            <div style={{
                                background: '#fecaca',
                                padding: '0.4rem',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                color: '#7f1d1d'
                            }}>
                                Con {waste}%: <strong>{patternResults.canto.withWaste}</strong> und
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {results && (
                <div className="result-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ margin: 0, color: 'var(--primary)' }}>Resultados</h4>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <select
                                className="select"
                                style={{ padding: '0.25rem', fontSize: '0.9rem', width: 'auto' }}
                                value={selectedPattern}
                                onChange={(e) => setSelectedPattern(e.target.value)}
                            >
                                <option value="soga">Tipo Soga</option>
                                <option value="cabeza">Tipo Cabeza</option>
                                <option value="canto">Tipo Canto</option>
                            </select>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={includeWaste}
                                    onChange={(e) => setIncludeWaste(e.target.checked)}
                                />
                                +5% Desp.
                            </label>
                        </div>
                    </div>

                    <div className="result-row">
                        <span>Ladrillos por m²:</span>
                        <span className="result-value">
                            {patternResults && patternResults[selectedPattern] ? patternResults[selectedPattern].base : 0} und
                        </span>
                    </div>
                    <div className="result-row">
                        <span>Mortero por m²:</span>
                        <span className="result-value">{results.mortarUnit} m³</span>
                    </div>
                    <div style={{ margin: '1rem 0', borderTop: '1px dashed #ccc' }}></div>
                    <div className="result-row">
                        <span>Total Ladrillos:</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value" style={{ fontSize: '1.2rem', color: '#dc2626' }}>
                                {patternResults && patternResults[selectedPattern] ?
                                    (includeWaste ? patternResults[selectedPattern].withWaste : Math.ceil(patternResults[selectedPattern].base * area))
                                    : 0} und
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {currentCosts.bricks}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Total Mortero:</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">
                                {includeWaste ? results.totalMortar : (results.mortarUnit * area).toFixed(3)} m³
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {currentCosts.mortar}</div>
                        </div>
                    </div>
                    <div className="result-row" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #ddd' }}>
                        <span style={{ fontWeight: 'bold' }}>Costo Total:</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>S/. {currentCosts.total}</span>
                    </div>
                </div>
            )}

            <button className="btn btn-primary" onClick={handleSave}>
                <Save size={20} />
                Guardar en Presupuesto
            </button>
        </div>
    );
};

export default BrickWall;
