import React, { useState } from 'react';
import { Card } from '../../../components/ui/card.jsx';

// Capacities in m3
const CAPACITIES = {
    'Carretilla': 0.056, // Approx 2 ft3
    'Buggy': 0.085, // Approx 3 ft3
    'Balde (20L)': 0.020
};

export const Transport = () => {
    const [volume, setVolume] = useState('1'); // m3

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Transporte de Concreto">
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                    Calcula cuántos viajes necesitas para mover un volumen de concreto.
                </p>

                <div className="input-group">
                    <label className="label">Volumen a Transportar (m³)</label>
                    <input
                        type="number"
                        className="input"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                    />
                </div>

                <div className="result-box">
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Equivalencias</h4>
                    {Object.entries(CAPACITIES).map(([name, cap]) => (
                        <div key={name} className="result-row">
                            <span>{name}:</span>
                            <span className="result-value">
                                {Math.ceil((parseFloat(volume) || 0) / cap)} viajes
                                <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#666', marginLeft: '0.5rem' }}>
                                    {((parseFloat(volume) || 0) / cap).toFixed(1)}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Transport;
