import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { CONCRETE_PROPORTIONS } from '../../../utils/concreteData.js';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

export const ConcreteDosage = () => {
    const [volume, setVolume] = useState(1);
    const [proportion, setProportion] = useState('1:8');

    // Prices
    const [priceCement, setPriceCement] = useState(0); // per bag
    const [priceHormigon, setPriceHormigon] = useState(0); // per m3
    const [priceWater, setPriceWater] = useState(0); // per m3

    const [results, setResults] = useState(null);
    const { addItem } = useBudget();

    useEffect(() => {
        const data = CONCRETE_PROPORTIONS.find(item => item.label === proportion);
        if (data) {
            const cementQty = data.cement * volume;
            const hormigonQty = data.hormigon * volume;
            const waterQty = data.water * volume;

            const costCement = cementQty * priceCement;
            const costHormigon = hormigonQty * priceHormigon;
            const costWater = waterQty * priceWater;
            const totalCost = costCement + costHormigon + costWater;

            setResults({
                cement: cementQty.toFixed(2),
                hormigon: hormigonQty.toFixed(2),
                water: waterQty.toFixed(2),
                costCement: costCement.toFixed(2),
                costHormigon: costHormigon.toFixed(2),
                costWater: costWater.toFixed(2),
                totalCost: totalCost.toFixed(2)
            });
        }
    }, [volume, proportion, priceCement, priceHormigon, priceWater]);

    const handleSave = () => {
        if (!results) return;
        addItem({
            type: 'Concreto',
            description: `${proportion} - ${volume} m³`,
            details: {
                'Volumen': `${volume} m³`,
                'Cemento': `${results.cement} bls`,
                'Hormigón': `${results.hormigon} m³`,
                'Agua': `${results.water} m³`,
                'Costo Cemento': `S/. ${results.costCement}`,
                'Costo Hormigón': `S/. ${results.costHormigon}`,
                'Costo Agua': `S/. ${results.costWater}`,
                'Costo Total': `S/. ${results.totalCost}`
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Concreto Estructural">
                <div className="input-group">
                    <label className="label">Resistencia (f'c)</label>
                    <select
                        className="select"
                        value={proportion}
                        onChange={(e) => setProportion(e.target.value)}
                    >
                        {CONCRETE_PROPORTIONS.map(item => (
                            <option key={item.label} value={item.label}>{item.label}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label className="label">Volumen (m³)</label>
                    <input
                        type="number"
                        className="input"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.1"
                    />
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>Precios Unitarios (S/.)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Cemento (bls)</label>
                            <input type="number" className="input" value={priceCement} onChange={e => setPriceCement(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Hormigón (m³)</label>
                            <input type="number" className="input" value={priceHormigon} onChange={e => setPriceHormigon(parseFloat(e.target.value) || 0)} />
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
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Resultados</h4>
                    <div className="result-row">
                        <span>Cemento (Bolsas):</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.cement} bls</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costCement}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Hormigón (m³):</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.hormigon} m³</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costHormigon}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Agua (m³):</span>
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

export default ConcreteDosage;
