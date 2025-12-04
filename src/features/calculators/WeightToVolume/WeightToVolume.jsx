import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card.jsx';
import { Save } from 'lucide-react';
import { useBudget } from '../../../context/BudgetContext.jsx';

export const WeightToVolume = () => {
    // Unit Weights (Peso Unitario Suelto) kg/m3
    const [pusSand, setPusSand] = useState('1640');
    const [pusStone, setPusStone] = useState('1460');

    // Humidity (%)
    const [humSand, setHumSand] = useState('1.62');
    const [humStone, setHumStone] = useState('0.40');

    // Weight Proportions (1 : Arena : Piedra)
    const [propSand, setPropSand] = useState('1.78');
    const [propStone, setPropStone] = useState('2.78');

    // Water
    const [water, setWater] = useState('23.38'); // Lts/bls

    const [results, setResults] = useState(null);
    const { addItem } = useBudget();

    useEffect(() => {
        // Constants
        const CEMENT_BAG_KG = 42.5;
        const FACTOR_M3_TO_FT3 = 35.31;

        const pSand = parseFloat(propSand) || 0;
        const pStone = parseFloat(propStone) || 0;
        const pusS = parseFloat(pusSand) || 1640;
        const pusSt = parseFloat(pusStone) || 1460;
        const hSand = parseFloat(humSand) || 0;
        const hStone = parseFloat(humStone) || 0;
        const w = parseFloat(water) || 0;

        // Sand Calculation
        const weightSand = pSand * CEMENT_BAG_KG;
        const wetPusSand = pusS * (1 + hSand / 100);
        const volSandM3 = weightSand / wetPusSand;
        const volSandFt3 = volSandM3 * FACTOR_M3_TO_FT3;

        // Stone Calculation
        const weightStone = pStone * CEMENT_BAG_KG;
        const wetPusStone = pusSt * (1 + hStone / 100);
        const volStoneM3 = weightStone / wetPusStone;
        const volStoneFt3 = volStoneM3 * FACTOR_M3_TO_FT3;

        setResults({
            volSandFt3: volSandFt3.toFixed(2),
            volStoneFt3: volStoneFt3.toFixed(2),
            volRatio: `1 : ${volSandFt3.toFixed(2)} : ${volStoneFt3.toFixed(2)}`,
            water: w.toFixed(2)
        });

    }, [pusSand, pusStone, humSand, humStone, propSand, propStone, water]);

    const handleSave = () => {
        if (!results) return;
        addItem({
            type: 'Conversión Peso -> Volumen',
            description: `Peso 1:${propSand}:${propStone} -> Vol 1:${results.volSandFt3}:${results.volStoneFt3}`,
            details: {
                'Prop. Volumen': results.volRatio,
                'Agua': `${results.water} Lts/bls`,
                'PUS Ag. Fino': `${pusSand} kg/m³ (${humSand}%)`,
                'PUS Ag. Grueso': `${pusStone} kg/m³ (${humStone}%)`
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Conversión Peso a Volumen">
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                    Convierte una dosificación dada en peso a volumen (pies cúbicos), considerando la humedad de los agregados.
                    Base: 1 bolsa de cemento (42.5kg).
                </p>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Agregados (kg/m³ y % Humedad)</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {/* Sand */}
                        <div style={{ border: '1px solid #eee', padding: '0.5rem', borderRadius: '4px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary)' }}>Agregado Fino</div>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>Peso Unit. (kg/m³)</span>
                                <input type="number" className="input" value={pusSand} onChange={e => setPusSand(e.target.value)} />
                            </div>
                            <div>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>Humedad (%)</span>
                                <input type="number" className="input" value={humSand} onChange={e => setHumSand(e.target.value)} />
                            </div>
                        </div>

                        {/* Stone */}
                        <div style={{ border: '1px solid #eee', padding: '0.5rem', borderRadius: '4px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary)' }}>Agregado Grueso</div>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>Peso Unit. (kg/m³)</span>
                                <input type="number" className="input" value={pusStone} onChange={e => setPusStone(e.target.value)} />
                            </div>
                            <div>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>Humedad (%)</span>
                                <input type="number" className="input" value={humStone} onChange={e => setHumStone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Dosificación en Peso</h4>
                <div className="input-group">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', alignItems: 'end' }}>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Cemento</span>
                            <input type="number" className="input" value={1} disabled style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ag. Fino</span>
                            <input type="number" className="input" value={propSand} onChange={e => setPropSand(e.target.value)} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ag. Grueso</span>
                            <input type="number" className="input" value={propStone} onChange={e => setPropStone(e.target.value)} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Agua (Lts)</span>
                            <input type="number" className="input" value={water} onChange={e => setWater(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Card>

            {results && (
                <div className="result-box">
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Resultados (Dosificación en Volumen)</h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center', marginBottom: '1rem' }}>
                        <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Cemento</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text)' }}>1.0</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>bolsa</div>
                        </div>
                        <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ag. Fino</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text)' }}>{results.volSandFt3}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>pie³</div>
                        </div>
                        <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ag. Grueso</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text)' }}>{results.volStoneFt3}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>pie³</div>
                        </div>
                        <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Agua</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text)' }}>{results.water}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Lts/bls</div>
                        </div>
                    </div>

                    <div className="result-row" style={{ justifyContent: 'center', background: 'rgba(3, 105, 161, 0.1)', padding: '1rem', borderRadius: '6px' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                            1 : {results.volSandFt3} : {results.volStoneFt3}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.5rem', textAlign: 'center' }}>
                        (1 parte de Cemento : X partes de Ag. Fino : Y partes de Ag. Grueso)
                    </p>
                </div>
            )}

            <button className="btn btn-primary" onClick={handleSave}>
                <Save size={20} />
                Guardar en Presupuesto
            </button>
        </div>
    );
};

export default WeightToVolume;
