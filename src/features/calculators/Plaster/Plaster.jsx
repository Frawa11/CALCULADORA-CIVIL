import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { PLASTER_PROPORTIONS } from '../../../utils/plasterData.js';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

export const Plaster = () => {
    const [proportion, setProportion] = useState('1:5');
    const [length, setLength] = useState('3'); // m
    const [height, setHeight] = useState('2.5'); // m
    const [thickness, setThickness] = useState('1.5'); // cm
    const [waste, setWaste] = useState('5'); // %

    // Prices
    const [priceCement, setPriceCement] = useState(''); // per bag
    const [priceSand, setPriceSand] = useState(''); // per m3
    const [priceWater, setPriceWater] = useState(''); // per m3

    const [results, setResults] = useState(null);
    const { addItem } = useBudget();

    useEffect(() => {
        const data = PLASTER_PROPORTIONS.find(item => item.label === proportion);
        if (data) {
            const l = parseFloat(length) || 0;
            const h = parseFloat(height) || 0;
            const t = parseFloat(thickness) || 0;
            const w = parseFloat(waste) || 0;

            const volume = l * h * (t / 100); // m3
            const totalVolume = volume * (1 + w / 100);

            const cementQty = totalVolume * data.cement;
            const sandQty = totalVolume * data.sand;
            const waterQty = totalVolume * data.water; // Liters

            const pCement = parseFloat(priceCement) || 0;
            const pSand = parseFloat(priceSand) || 0;
            const pWater = parseFloat(priceWater) || 0;

            const costCement = cementQty * pCement;
            const costSand = sandQty * pSand;
            const costWater = (waterQty / 1000) * pWater; // Convert L to m3 for price
            const totalCost = costCement + costSand + costWater;

            setResults({
                volume: volume.toFixed(3), // Display volume without waste
                totalVolume: totalVolume.toFixed(4), // For internal check if needed
                cement: cementQty.toFixed(2),
                sand: sandQty.toFixed(2),
                water: waterQty.toFixed(1), // Liters
                costCement: costCement.toFixed(2),
                costSand: costSand.toFixed(2),
                costWater: costWater.toFixed(2),
                totalCost: totalCost.toFixed(2)
            });
        }
    }, [proportion, length, height, thickness, waste, priceCement, priceSand, priceWater]);

    const handleSave = () => {
        if (!results) return;
        addItem({
            type: 'Tarrajeo',
            description: `Muro ${length}x${height}m - Prop. ${proportion} - Esp. ${thickness}cm`,
            details: {
                'Volumen': `${results.volume} m³`,
                'Cemento': `${results.cement} bls`,
                'Arena Fina': `${results.sand} m³`,
                'Agua': `${results.water} L`,
                'Desperdicio': `${waste}%`,
                'Costo Cemento': `S/. ${results.costCement}`,
                'Costo Arena': `S/. ${results.costSand}`,
                'Costo Agua': `S/. ${results.costWater}`,
                'Costo Total': `S/. ${results.totalCost}`
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Tarrajeo de Muros">
                <div className="input-group">
                    <label className="label">Proporción (Cemento:Arena)</label>
                    <select
                        className="select"
                        value={proportion}
                        onChange={(e) => setProportion(e.target.value)}
                    >
                        {PLASTER_PROPORTIONS.map(item => (
                            <option key={item.label} value={item.label}>{item.label}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label className="label">Dimensiones (m)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>Largo</span>
                            <input
                                type="number"
                                className="input"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>Alto</span>
                            <input
                                type="number"
                                className="input"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label className="label">Espesor (cm)</label>
                    <input
                        type="number"
                        className="input"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                        step="0.1"
                    />
                </div>

                <div className="input-group">
                    <label className="label">Desperdicio (%)</label>
                    <input
                        type="number"
                        className="input"
                        value={waste}
                        onChange={(e) => setWaste(e.target.value)}
                    />
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>Precios Unitarios (S/.)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Cemento (bls)</label>
                            <input type="number" className="input" value={priceCement} onChange={e => setPriceCement(e.target.value)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Arena (m³)</label>
                            <input type="number" className="input" value={priceSand} onChange={e => setPriceSand(e.target.value)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Agua (m³)</label>
                            <input type="number" className="input" value={priceWater} onChange={e => setPriceWater(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Card>

            {results && (
                <div className="result-box">
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Resultados</h4>
                    <div className="result-row">
                        <span>Volumen de Mortero:</span>
                        <span className="result-value">{results.volume} m³</span>
                    </div>
                    <div className="result-row">
                        <span>Cemento (Bolsas):</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.cement} bls</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costCement}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Arena Fina (m³):</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.sand} m³</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costSand}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Agua (Litros):</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.water} L</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costWater}</div>
                        </div>
                    </div>
                    <div className="result-row" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #ddd' }}>
                        <span style={{ fontWeight: 'bold' }}>Costo Total:</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>S/. {results.totalCost}</span>
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

export default Plaster;
