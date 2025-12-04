import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

export const MixYield = () => {
    // Inputs
    const [propCement, setPropCement] = useState(1);
    const [propSand, setPropSand] = useState(2);
    const [propStone, setPropStone] = useState(4);
    const [waterPerBag, setWaterPerBag] = useState(25); // Liters per bag
    const [freshConcreteDensity, setFreshConcreteDensity] = useState(2400); // kg/m3

    // Prices & Densities for Cost Calc
    const [priceCement, setPriceCement] = useState(0); // per bag
    const [priceSand, setPriceSand] = useState(0); // per m3
    const [priceStone, setPriceStone] = useState(0); // per m3
    const [priceWater, setPriceWater] = useState(0); // per m3

    const [densitySand, setDensitySand] = useState(1600); // kg/m3 (loose)
    const [densityStone, setDensityStone] = useState(1500); // kg/m3 (loose)

    const [results, setResults] = useState(null);
    const { addItem } = useBudget();

    useEffect(() => {
        // Calculation based on Fresh Concrete Density (Peso Unitario del Concreto)
        // Basis: 1 bag of cement (42.5 kg)
        const CEMENT_BAG_KG = 42.5;

        // 1. Calculate Weight of Batch (Peso de la colada)
        const weightCement = CEMENT_BAG_KG;
        const weightSand = propSand * CEMENT_BAG_KG;
        const weightStone = propStone * CEMENT_BAG_KG;
        const weightWater = waterPerBag; // 1 Lt = 1 kg

        const totalBatchWeight = weightCement + weightSand + weightStone + weightWater;

        // 2. Yield per Bag (Rendimiento por bolsa)
        // Formula: Total Weight / Fresh Concrete Density
        const yieldPerBag = totalBatchWeight / freshConcreteDensity;

        // 3. Cement Factor (Factor cemento)
        // Formula: Fresh Concrete Density / Total Weight (or 1 / yield)
        const cementFactor = freshConcreteDensity / totalBatchWeight;

        // 4. Materials per m3 (kg)
        const cementPerM3_kg = cementFactor * weightCement;
        const sandPerM3_kg = cementFactor * weightSand;
        const stonePerM3_kg = cementFactor * weightStone;
        const waterPerM3_L = cementFactor * weightWater;

        // 5. Costs per m3
        // Cement: kg -> bags
        const cementBags = cementPerM3_kg / CEMENT_BAG_KG;
        const costCement = cementBags * priceCement;

        // Aggregates: kg -> m3 (using loose density)
        const sandM3 = sandPerM3_kg / densitySand;
        const costSand = sandM3 * priceSand;

        const stoneM3 = stonePerM3_kg / densityStone;
        const costStone = stoneM3 * priceStone;

        // Water: L -> m3
        const waterM3 = waterPerM3_L / 1000;
        const costWater = waterM3 * priceWater;

        const totalCostPerM3 = costCement + costSand + costStone + costWater;

        setResults({
            totalBatchWeight: totalBatchWeight.toFixed(1),
            yieldPerBag: yieldPerBag.toFixed(3),
            cementFactor: cementFactor.toFixed(1),
            cementPerM3: cementPerM3_kg.toFixed(0),
            sandPerM3: sandPerM3_kg.toFixed(0),
            stonePerM3: stonePerM3_kg.toFixed(0),
            waterPerM3: waterPerM3_L.toFixed(0),
            costCement: costCement.toFixed(2),
            costSand: costSand.toFixed(2),
            costStone: costStone.toFixed(2),
            costWater: costWater.toFixed(2),
            totalCostPerM3: totalCostPerM3.toFixed(2)
        });

    }, [propCement, propSand, propStone, waterPerBag, freshConcreteDensity, priceCement, priceSand, priceStone, priceWater, densitySand, densityStone]);

    const handleSave = () => {
        if (!results) return;
        addItem({
            type: 'Rendimiento de Mezcla',
            description: `Prop. 1:${propSand}:${propStone}, Agua: ${waterPerBag}L`,
            details: {
                'Rendimiento/Bolsa': `${results.yieldPerBag} m³`,
                'Factor Cemento': `${results.cementFactor} bls/m³`,
                'Materiales/m³': `C:${results.cementPerM3}kg, AF:${results.sandPerM3}kg, AG:${results.stonePerM3}kg, H2O:${results.waterPerM3}L`,
                'Costo Cemento/m3': `S/. ${results.costCement}`,
                'Costo Ag. Fino/m3': `S/. ${results.costSand}`,
                'Costo Ag. Grueso/m3': `S/. ${results.costStone}`,
                'Costo Agua/m3': `S/. ${results.costWater}`,
                'Costo Total/m3': `S/. ${results.totalCostPerM3}`
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Rendimiento de Materiales por m³">
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                    Calcula el rendimiento y la cantidad de materiales por m³ de concreto basado en el peso del concreto fresco.
                </p>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Proporción en Peso (1 : Ag. Fino : Ag. Grueso)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Cemento</span>
                            <input type="number" className="input" value={propCement} disabled style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ag. Fino</span>
                            <input type="number" className="input" value={propSand} onChange={e => setPropSand(parseFloat(e.target.value))} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ag. Grueso</span>
                            <input type="number" className="input" value={propStone} onChange={e => setPropStone(parseFloat(e.target.value))} />
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="label">Agua por Bolsa (Lt)</label>
                            <input type="number" className="input" value={waterPerBag} onChange={e => setWaterPerBag(parseFloat(e.target.value))} />
                        </div>
                        <div>
                            <label className="label">Peso Concreto Fresco (kg/m³)</label>
                            <input type="number" className="input" value={freshConcreteDensity} onChange={e => setFreshConcreteDensity(parseFloat(e.target.value))} />
                        </div>
                    </div>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>Precios Unitarios (S/.)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Cemento (bls)</label>
                            <input type="number" className="input" value={priceCement} onChange={e => setPriceCement(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Ag. Fino (m³)</label>
                            <input type="number" className="input" value={priceSand} onChange={e => setPriceSand(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Ag. Grueso (m³)</label>
                            <input type="number" className="input" value={priceStone} onChange={e => setPriceStone(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.8rem' }}>Agua (m³)</label>
                            <input type="number" className="input" value={priceWater} onChange={e => setPriceWater(parseFloat(e.target.value) || 0)} />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <div>
                            <label className="label" style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Densidad Ag. Fino (kg/m³)</label>
                            <input type="number" className="input" style={{ fontSize: '0.8rem', padding: '0.3rem' }} value={densitySand} onChange={e => setDensitySand(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="label" style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Densidad Ag. Grueso (kg/m³)</label>
                            <input type="number" className="input" style={{ fontSize: '0.8rem', padding: '0.3rem' }} value={densityStone} onChange={e => setDensityStone(parseFloat(e.target.value) || 0)} />
                        </div>
                    </div>
                </div>
            </Card>

            {results && (
                <div className="result-box">
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Resultados</h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="result-row" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                            <span style={{ fontSize: '0.9rem' }}>Rendimiento por Bolsa</span>
                            <span className="result-value" style={{ fontSize: '1.2rem' }}>{results.yieldPerBag} m³</span>
                        </div>
                        <div className="result-row" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                            <span style={{ fontSize: '0.9rem' }}>Factor Cemento</span>
                            <span className="result-value" style={{ fontSize: '1.2rem' }}>{results.cementFactor} bls</span>
                        </div>
                    </div>

                    <h5 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text)' }}>Materiales por m³ de Concreto:</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
                        <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Cemento</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>{results.cementPerM3}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>kg</div>
                        </div>
                        <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ag. Fino</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>{results.sandPerM3}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>kg</div>
                        </div>
                        <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ag. Grueso</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>{results.stonePerM3}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>kg</div>
                        </div>
                        <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Agua</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>{results.waterPerM3}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Lt</div>
                        </div>
                    </div>

                    <div className="result-row" style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #ddd' }}>
                        <span style={{ fontWeight: 'bold' }}>Costo Estimado por m³:</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>S/. {results.totalCostPerM3}</span>
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

export default MixYield;
