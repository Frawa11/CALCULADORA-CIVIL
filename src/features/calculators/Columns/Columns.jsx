import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { STRUCTURAL_CONCRETE } from '../../../utils/concreteData.js';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

// Steel weights (kg/m)
const STEEL_WEIGHTS = {
    '1/4"': 0.25,
    '3/8"': 0.56,
    '1/2"': 0.99,
    '5/8"': 1.55,
    '3/4"': 2.24,
    '1"': 3.97
};

export const Columns = () => {
    const [count, setCount] = useState(1);
    const [length, setLength] = useState(0.30); // m (Largo)
    const [width, setWidth] = useState(0.25); // m (Ancho)
    const [height, setHeight] = useState(3.0); // m (Alto)
    const [strength, setStrength] = useState('210');

    // Steel
    const [longSteelType, setLongSteelType] = useState('5/8"');
    const [longSteelCount, setLongSteelCount] = useState(4);
    const [stirrupType, setStirrupType] = useState('3/8"');
    const [stirrupSpacing, setStirrupSpacing] = useState(0.20); // m

    // Prices
    const [priceCement, setPriceCement] = useState(0); // per bag
    const [priceSand, setPriceSand] = useState(0); // per m3
    const [priceStone, setPriceStone] = useState(0); // per m3
    const [priceWater, setPriceWater] = useState(0); // per m3
    const [priceSteel, setPriceSteel] = useState(0); // per kg

    const [results, setResults] = useState(null);
    const { addItem } = useBudget();

    useEffect(() => {
        // Concrete
        const volumePerCol = length * width * height;
        const totalVolume = volumePerCol * count;
        const concreteData = STRUCTURAL_CONCRETE.find(item => item.fc === strength);

        // Formwork (Encofrado) = Perimeter * Height * Count
        const perimeter = 2 * (length + width);
        const formwork = perimeter * height * count;

        // Steel
        // Longitudinal: Height * Count * Weight * Number of bars
        const longSteelTotalLen = height * longSteelCount * count;
        const longSteelWeight = longSteelTotalLen * STEEL_WEIGHTS[longSteelType] * 1.05; // +5% waste

        // Stirrups (Estribos)
        // Length per stirrup = Perimeter - (cover * 4) + hooks. Approx Perimeter + 0.20m
        const stirrupLen = perimeter + 0.20;
        const stirrupsPerCol = Math.ceil(height / stirrupSpacing);
        const totalStirrups = stirrupsPerCol * count;
        const stirrupWeight = totalStirrups * stirrupLen * STEEL_WEIGHTS[stirrupType] * 1.05; // +5% waste

        if (concreteData) {
            // Calculate steel volume (Excel subtracts this from concrete volume)
            const steelDensity = 7850; // kg/m³
            const totalSteelWeight = longSteelWeight + stirrupWeight;
            const steelVolume = totalSteelWeight / steelDensity;

            // Subtract steel volume from concrete volume
            const concreteVolumeOnly = totalVolume - steelVolume;

            // Apply 5% waste and round to 2 decimals to get exactly 2.10
            const wasteVolume = parseFloat((concreteVolumeOnly * 1.05).toFixed(2));

            const cementQty = concreteData.cement * wasteVolume;
            const sandQty = concreteData.sand * wasteVolume;
            const stoneQty = concreteData.stone * wasteVolume;
            const waterQty = concreteData.water * wasteVolume;

            const costCement = cementQty * priceCement;
            const costSand = sandQty * priceSand;
            const costStone = stoneQty * priceStone;
            const costWater = waterQty * priceWater;
            const costSteel = totalSteelWeight * priceSteel;
            const totalCost = costCement + costSand + costStone + costWater + costSteel;

            setResults({
                volume: totalVolume.toFixed(2),
                formwork: formwork.toFixed(2),
                cement: cementQty.toFixed(2),
                sand: sandQty.toFixed(2),
                stone: stoneQty.toFixed(2),
                water: waterQty.toFixed(2),
                steelWeight: totalSteelWeight.toFixed(2),
                costCement: costCement.toFixed(2),
                costSand: costSand.toFixed(2),
                costStone: costStone.toFixed(2),
                costWater: costWater.toFixed(2),
                costSteel: costSteel.toFixed(2),
                totalCost: totalCost.toFixed(2)
            });
        }

    }, [count, length, width, height, strength, longSteelType, longSteelCount, stirrupType, stirrupSpacing, priceCement, priceSand, priceStone, priceWater, priceSteel]);

    const handleSave = () => {
        if (!results) return;
        addItem({
            type: 'Columnas',
            description: `${count} und. ${length}x${width}x${height}m`,
            details: {
                'Volumen Concreto': `${results.volume} m³`,
                'Área Encofrado': `${results.formwork} m²`,
                'Acero Total': `${results.steelWeight} kg`,
                'Cemento': `${results.cement} bls`,
                'Arena': `${results.sand} m³`,
                'Piedra': `${results.stone} m³`,
                'Agua': `${results.water} m³`,
                'Costo Cemento': `S/. ${results.costCement}`,
                'Costo Arena': `S/. ${results.costSand}`,
                'Costo Piedra': `S/. ${results.costStone}`,
                'Costo Agua': `S/. ${results.costWater}`,
                'Costo Acero': `S/. ${results.costSteel}`,
                'Costo Total': `S/. ${results.totalCost}`
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Columnas">
                <div className="input-group">
                    <label className="label">Cantidad de Columnas</label>
                    <input type="number" className="input" value={count} onChange={e => setCount(parseInt(e.target.value) || 1)} />
                </div>

                <div className="input-group">
                    <label className="label">Largo (m)</label>
                    <input type="number" className="input" value={length} onChange={e => setLength(parseFloat(e.target.value) || 0)} step="0.01" />
                </div>

                <div className="input-group">
                    <label className="label">Ancho (m)</label>
                    <input type="number" className="input" value={width} onChange={e => setWidth(parseFloat(e.target.value) || 0)} step="0.01" />
                </div>

                <div className="input-group">
                    <label className="label">Alto (m)</label>
                    <input type="number" className="input" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} step="0.01" />
                </div>

                <div className="input-group">
                    <label className="label">Resistencia (f'c)</label>
                    <select className="select" value={strength} onChange={e => setStrength(e.target.value)}>
                        {STRUCTURAL_CONCRETE.map(item => (
                            <option key={item.fc} value={item.fc}>{item.fc} kg/cm²</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label className="label">Acero Longitudinal</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="number" className="input" value={longSteelCount} onChange={e => setLongSteelCount(parseInt(e.target.value))} />
                        <select className="select" value={longSteelType} onChange={e => setLongSteelType(e.target.value)}>
                            {Object.keys(STEEL_WEIGHTS).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </div>
                </div>

                <div className="input-group">
                    <label className="label">Estribos (Tipo y Espaciamiento)</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select className="select" value={stirrupType} onChange={e => setStirrupType(e.target.value)}>
                            {Object.keys(STEEL_WEIGHTS).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                        <input type="number" className="input" placeholder="Esp. (m)" value={stirrupSpacing} onChange={e => setStirrupSpacing(parseFloat(e.target.value))} step="0.05" />
                    </div>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>Precios Unitarios (S/.)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
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
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Acero (kg)</label>
                            <input type="number" className="input" value={priceSteel} onChange={e => setPriceSteel(parseFloat(e.target.value) || 0)} />
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
                        <span>Área Encofrado:</span>
                        <span className="result-value">{results.formwork} m²</span>
                    </div>
                    <div className="result-row">
                        <span>Peso Acero (+5%):</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.steelWeight} kg</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costSteel}</div>
                        </div>
                    </div>
                    <div style={{ margin: '1rem 0', borderTop: '1px dashed #ccc' }}></div>
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

export default Columns;
