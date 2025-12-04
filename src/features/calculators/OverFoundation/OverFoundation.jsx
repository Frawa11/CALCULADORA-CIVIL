import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

export const OverFoundation = () => {
    const [length, setLength] = useState('10'); // m
    const [width, setWidth] = useState('0.25'); // m
    const [height, setHeight] = useState('0.4'); // m
    const [proportion, setProportion] = useState('1:8 + 25% PM');

    // Prices
    // Prices
    const [priceCement, setPriceCement] = useState(''); // per bag
    const [priceHormigon, setPriceHormigon] = useState(''); // per m3
    const [priceStone, setPriceStone] = useState(''); // per m3 (Piedra Mediana)
    const [priceWater, setPriceWater] = useState(''); // per m3

    const [results, setResults] = useState(null);
    const { addItem } = useBudget();

    useEffect(() => {
        const l = parseFloat(length) || 0;
        const w = parseFloat(width) || 0;
        const h = parseFloat(height) || 0;

        const volume = l * w * h;

        // Formwork area (Encofrado) = 2 * Height * Length
        const formwork = 2 * h * l;

        // Materials for 1:8 + 25% PM (Piedra Mediana)
        // Factors from Excel "Materiales en Sobrecimiento..xlsx"
        // Target per m3: Cement 3.91, Hormigon 0.887, Water 0.13, Stone 0.42

        const cement = volume * 3.91;
        const hormigon = volume * 0.887;
        const stone = volume * 0.42; // Piedra Mediana
        const water = volume * 0.13; // Agua

        const pCement = parseFloat(priceCement) || 0;
        const pHormigon = parseFloat(priceHormigon) || 0;
        const pStone = parseFloat(priceStone) || 0;
        const pWater = parseFloat(priceWater) || 0;

        const costCement = cement * pCement;
        const costHormigon = hormigon * pHormigon;
        const costStone = stone * pStone;
        const costWater = water * pWater;
        const totalCost = costCement + costHormigon + costStone + costWater;

        setResults({
            volume: volume.toFixed(2),
            formwork: formwork.toFixed(2),
            cement: cement.toFixed(2),
            hormigon: hormigon.toFixed(2),
            stone: stone.toFixed(2),
            water: water.toFixed(2),
            costCement: costCement.toFixed(2),
            costHormigon: costHormigon.toFixed(2),
            costStone: costStone.toFixed(2),
            costWater: costWater.toFixed(2),
            totalCost: totalCost.toFixed(2)
        });

    }, [length, width, height, proportion, priceCement, priceHormigon, priceStone, priceWater]);

    const handleSave = () => {
        if (!results) return;
        addItem({
            type: 'Sobrecimiento',
            description: `${length}m x ${width}m x ${height}m`,
            details: {
                'Volumen Concreto': `${results.volume} m³`,
                'Área Encofrado': `${results.formwork} m²`,
                'Cemento': `${results.cement} bls`,
                'Hormigón': `${results.hormigon} m³`,
                'Piedra Mediana': `${results.stone} m³`,
                'Agua': `${results.water} m³`,
                'Costo Cemento': `S/. ${results.costCement}`,
                'Costo Hormigón': `S/. ${results.costHormigon}`,
                'Costo Piedra Mediana': `S/. ${results.costStone}`,
                'Costo Agua': `S/. ${results.costWater}`,
                'Costo Total': `S/. ${results.totalCost}`
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Sobrecimiento">
                <div className="input-group">
                    <label className="label">Largo (m)</label>
                    <input type="number" className="input" value={length} onChange={e => setLength(e.target.value)} />
                </div>
                <div className="input-group">
                    <label className="label">Ancho (m)</label>
                    <input type="number" className="input" value={width} onChange={e => setWidth(e.target.value)} />
                </div>
                <div className="input-group">
                    <label className="label">Alto (m)</label>
                    <input type="number" className="input" value={height} onChange={e => setHeight(e.target.value)} />
                </div>
                <div className="input-group">
                    <label className="label">Proporción</label>
                    <select className="select" disabled value={proportion}>
                        <option>1:8 + 25% PM</option>
                    </select>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>Precios Unitarios (S/.)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Cemento (bls)</label>
                            <input type="number" className="input" value={priceCement} onChange={e => setPriceCement(e.target.value)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Hormigón (m³)</label>
                            <input type="number" className="input" value={priceHormigon} onChange={e => setPriceHormigon(e.target.value)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Piedra Mediana (m³)</label>
                            <input type="number" className="input" value={priceStone} onChange={e => setPriceStone(e.target.value)} />
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
                        <span>Volumen Concreto:</span>
                        <span className="result-value">{results.volume} m³</span>
                    </div>
                    <div className="result-row">
                        <span>Área Encofrado:</span>
                        <span className="result-value">{results.formwork} m²</span>
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
                        <span>Hormigón:</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.hormigon} m³</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costHormigon}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Piedra Mediana:</span>
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

export default OverFoundation;
