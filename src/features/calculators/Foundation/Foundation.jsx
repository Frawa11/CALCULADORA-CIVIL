import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

import { MATERIALS, WASTAGE } from '../../../utils/materials.js';

export const Foundation = () => {
    const [length, setLength] = useState(10); // m
    const [width, setWidth] = useState(0.4); // m
    const [height, setHeight] = useState(0.6); // m
    const [proportion, setProportion] = useState('1:10 + 30% PG');

    // Prices
    const [priceCement, setPriceCement] = useState(0); // per bag
    const [priceHormigon, setPriceHormigon] = useState(0); // per m3
    const [priceStone, setPriceStone] = useState(0); // per m3 (Piedra Grande)
    const [priceWater, setPriceWater] = useState(0); // per m3

    const [results, setResults] = useState(null);
    const { addItem } = useBudget();

    useEffect(() => {
        if (length < 0 || width < 0 || height < 0) {
            setResults(null);
            return;
        }

        const volume = length * width * height;

        // Calculation Logic for 1:10 + 30% PG
        // 1. Calculate Yield (Rendimiento de mezcla)
        // Mix 1:10 (Cement : Hormigon) with a/c 0.8
        const cementVol = 1 * MATERIALS.CEMENT.weightPerBag / MATERIALS.CEMENT.density;
        const hormigonVol = 10 * MATERIALS.CONVERSION.ft3_to_m3 * MATERIALS.HORMIGON.unitWeight / MATERIALS.HORMIGON.density;
        const waterVol = 0.8 * MATERIALS.CEMENT.weightPerBag / MATERIALS.WATER.density;

        const yieldMix = cementVol + hormigonVol + waterVol; // Absolute volume of paste

        // 2. Calculate Cement Factor
        // 1 m3 of concrete = 30% Stone + 1% Air + 69% Paste
        const pasteVolume = 1 - 0.30 - 0.01;
        const cementFactor = pasteVolume / yieldMix; // bags/m3 (without waste)

        // 3. Calculate Materials per m3 (without waste)
        const cementPerM3 = cementFactor;
        const hormigonPerM3 = 10 * MATERIALS.CONVERSION.ft3_to_m3 * cementFactor;
        const waterPerM3 = 0.8 * MATERIALS.CEMENT.weightPerBag * cementFactor / 1000; // m3
        const stonePerM3 = 0.30 * (MATERIALS.STONE.density / MATERIALS.STONE.unitWeight); // Convert absolute to loose volume

        // 4. Apply Waste
        // Excel uses ~1.7% effective waste for cement (2.92 -> 2.97)
        const cementWaste = 1 + WASTAGE.cement;
        const aggregateWaste = 1 + WASTAGE.aggregates;

        const totalCement = volume * cementPerM3 * cementWaste;
        const totalHormigon = volume * hormigonPerM3 * aggregateWaste;
        const totalStone = volume * stonePerM3 * aggregateWaste;
        const totalWater = volume * waterPerM3 * aggregateWaste; // m3

        const costCement = totalCement * priceCement;
        const costHormigon = totalHormigon * priceHormigon;
        const costStone = totalStone * priceStone;
        const costWater = totalWater * priceWater;
        const totalCost = costCement + costHormigon + costStone + costWater;

        setResults({
            volume: volume.toFixed(2),
            cement: totalCement.toFixed(2),
            hormigon: totalHormigon.toFixed(2),
            stone: totalStone.toFixed(2),
            water: totalWater.toFixed(2), // Display in m3 with 2 decimals
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
            type: 'Cimiento Corrido',
            description: `${length}m x ${width}m x ${height}m`,
            details: {
                'Volumen Total': `${results.volume} m³`,
                'Cemento': `${results.cement} bls`,
                'Hormigón': `${results.hormigon} m³`,
                'Piedra Grande': `${results.stone} m³`,
                'Agua': `${results.water} m³`,
                'Costo Cemento': `S/. ${results.costCement}`,
                'Costo Hormigón': `S/. ${results.costHormigon}`,
                'Costo Piedra Grande': `S/. ${results.costStone}`,
                'Costo Agua': `S/. ${results.costWater}`,
                'Costo Total': `S/. ${results.totalCost}`
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Cimiento Corrido">
                <div className="input-group">
                    <label className="label">Largo (m)</label>
                    <input type="number" className="input" min="0" value={length} onChange={e => setLength(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label className="label">Ancho (m)</label>
                    <input type="number" className="input" min="0" value={width} onChange={e => setWidth(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label className="label">Alto (m)</label>
                    <input type="number" className="input" min="0" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label className="label">Proporción</label>
                    <select className="select" disabled value={proportion}>
                        <option>1:10 + 30% PG</option>
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
                            <label className="label" style={{ fontSize: '0.8rem' }}>Hormigón (m³)</label>
                            <input type="number" className="input" value={priceHormigon} onChange={e => setPriceHormigon(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Piedra Grande (m³)</label>
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
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Resultados</h4>
                    <div className="result-row">
                        <span>Volumen Total:</span>
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
                        <span>Hormigón:</span>
                        <div style={{ textAlign: 'right' }}>
                            <div className="result-value">{results.hormigon} m³</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S/. {results.costHormigon}</div>
                        </div>
                    </div>
                    <div className="result-row">
                        <span>Piedra Grande:</span>
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

export default Foundation;
