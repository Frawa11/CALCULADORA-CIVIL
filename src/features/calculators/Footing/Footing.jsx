import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { STRUCTURAL_CONCRETE } from '../../../utils/concreteData.js';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

export const Footing = () => {
    const [length, setLength] = useState(1.0); // m
    const [width, setWidth] = useState(1.0); // m
    const [height, setHeight] = useState(0.6); // m
    const [quantity, setQuantity] = useState(1); // New state for quantity
    const [strength, setStrength] = useState('210');

    // Prices
    const [priceCement, setPriceCement] = useState(0); // per bag
    const [priceSand, setPriceSand] = useState(0); // per m3
    const [priceStone, setPriceStone] = useState(0); // per m3
    const [priceWater, setPriceWater] = useState(0); // per m3

    const [results, setResults] = useState(null);
    const { addItem } = useBudget();

    useEffect(() => {
        const volumePerUnit = length * width * height;
        const totalVolume = volumePerUnit * quantity;
        const data = STRUCTURAL_CONCRETE.find(item => item.fc === strength);

        if (data) {
            // Apply 5% waste factor as shown in Excel
            const wasteVolume = totalVolume * 1.05;

            const cementQty = data.cement * wasteVolume;
            const sandQty = data.sand * wasteVolume;
            const stoneQty = data.stone * wasteVolume;
            const waterQty = data.water * wasteVolume;

            const costCement = cementQty * priceCement;
            const costSand = sandQty * priceSand;
            const costStone = stoneQty * priceStone;
            const costWater = waterQty * priceWater;
            const totalCost = costCement + costSand + costStone + costWater;

            setResults({
                volume: totalVolume.toFixed(2),
                cement: cementQty.toFixed(2),
                sand: sandQty.toFixed(2),
                stone: stoneQty.toFixed(2),
                water: waterQty.toFixed(2), // Changed to m³
                costCement: costCement.toFixed(2),
                costSand: costSand.toFixed(2),
                costStone: costStone.toFixed(2),
                costWater: costWater.toFixed(2),
                totalCost: totalCost.toFixed(2)
            });
        }

    }, [length, width, height, strength, quantity, priceCement, priceSand, priceStone, priceWater]);

    const handleSave = () => {
        if (!results) return;
        addItem({
            type: 'Zapata',
            description: `${quantity} und. de ${length}m x ${width}m x ${height}m (f'c ${strength})`,
            details: {
                'Volumen Total': `${results.volume} m³`,
                'Cemento': `${results.cement} bls`,
                'Arena': `${results.sand} m³`,
                'Piedra': `${results.stone} m³`,
                'Agua': `${results.water} m³`, // Changed to m³
                'Costo Cemento': `S/. ${results.costCement}`,
                'Costo Arena': `S/. ${results.costSand}`,
                'Costo Piedra': `S/. ${results.costStone}`,
                'Costo Agua': `S/. ${results.costWater}`,
                'Costo Total': `S/. ${results.totalCost}`
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Zapatas v2">
                <div className="input-group">
                    <label className="label">Largo (m)</label>
                    <input type="number" className="input" value={length} onChange={e => setLength(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label className="label">Ancho (m)</label>
                    <input type="number" className="input" value={width} onChange={e => setWidth(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label className="label">Alto (m)</label>
                    <input type="number" className="input" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label className="label">Cantidad</label>
                    <input type="number" className="input" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10) || 1)} />
                </div>
                <div className="input-group">
                    <label className="label">Resistencia (f'c)</label>
                    <select
                        className="select"
                        value={strength}
                        onChange={(e) => setStrength(e.target.value)}
                    >
                        {STRUCTURAL_CONCRETE.map(item => (
                            <option key={item.fc} value={item.fc}>{item.fc} kg/cm²</option>
                        ))}
                    </select>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>Precios Unitarios (S/.)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Cemento (bls)</label>
                            <input type="number" className="input" value={priceCement} onChange={e => setPriceCement(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Arena (m³)</label>
                            <input type="number" className="input" value={priceSand} onChange={e => setPriceSand(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Piedra (m³)</label>
                            <input type="number" className="input" value={priceStone} onChange={e => setPriceStone(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Agua (m³)</label>
                            <input type="number" className="input" value={priceWater} onChange={e => setPriceWater(parseFloat(e.target.value) || 0)} />
                        </div>
                    </div>
                </div>
            </Card>

            {results && (
                <div className="result-box">
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Resultados Totales</h4>
                    <div className="result-row">
                        <span>Volumen Concreto:</span>
                        <span className="result-value">{results.volume} m³</span>
                    </div>
                    <div className="result-row">
                        <span>Cemento:</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.cement} bls</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costCement}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Arena:</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.sand} m³</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costSand}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Piedra:</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.stone} m³</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costStone}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Agua:</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.water} m³</div>
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

export default Footing;
