import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrickWall, Droplets, PaintRoller, ArrowRight, Layers, Box, Columns as ColumnsIcon, Square, Scale, FlaskConical, Truck } from 'lucide-react';
import { Card } from '../components/ui/card';

const CalculatorLink = ({ to, icon: Icon, title, description, color, index }) => (
    <Link to={to} className="animate-fade-in" style={{ textDecoration: 'none', color: 'inherit', animationDelay: `${index * 0.1}s` }}>
        <Card className="hover-card" style={{ height: '100%', transition: 'transform 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                    background: color,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={24} />
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{description}</p>
                </div>
                <ArrowRight size={20} style={{ color: 'var(--text-light)', alignSelf: 'center' }} />
            </div>
        </Card>
    </Link>
);


const TOOLS_DATA = {
    'Estructuras': [
        {
            to: "/calculators/foundation",
            icon: Layers,
            title: "Cimiento Corrido",
            description: "Calcula volumen y materiales para cimientos.",
            color: "#8b5cf6"
        },
        {
            to: "/calculators/over-foundation",
            icon: Box,
            title: "Sobrecimiento",
            description: "Concreto y encofrado para sobrecimientos.",
            color: "#6366f1"
        },
        {
            to: "/calculators/footing",
            icon: Square,
            title: "Zapatas",
            description: "Concreto estructural para zapatas.",
            color: "#ec4899"
        },
        {
            to: "/calculators/columns",
            icon: ColumnsIcon,
            title: "Columnas",
            description: "Concreto, encofrado y acero para columnas.",
            color: "#f43f5e"
        }
    ],
    'Albañilería y Acabados': [
        {
            to: "/calculators/concrete-1m3",
            icon: Droplets,
            title: "Concreto 1m3",
            description: "Calcula cemento, hormigón y agua por metro cúbico.",
            color: "#3b82f6"
        },
        {
            to: "/calculators/brick-wall",
            icon: BrickWall,
            title: "Ladrillos por m2",
            description: "Cantidad de ladrillos y mortero para muros.",
            color: "#ef4444"
        },
        {
            to: "/calculators/plaster",
            icon: PaintRoller,
            title: "Tarrajeo de Muros",
            description: "Materiales para tarrajeo (cemento y arena.",
            color: "#10b981"
        }
    ],
    'Auxiliares': [
        {
            to: "/calculators/weight-volume",
            icon: Scale,
            title: "Peso a Volumen",
            description: "Convierte dosificación en peso a volumen.",
            color: "#f59e0b"
        },
        {
            to: "/calculators/mix-yield",
            icon: FlaskConical,
            title: "Rendimiento Mezcla",
            description: "Volumen real producido por bolsa de cemento.",
            color: "#84cc16"
        },
        {
            to: "/calculators/transport",
            icon: Truck,
            title: "Transporte",
            description: "Equivalencia en carretillas y buggys.",
            color: "#78716c"
        }
    ]
};

export const Home = () => {
    const [filter, setFilter] = useState('Todas');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text)' }}>Herramientas</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label htmlFor="category-filter" style={{ fontWeight: '500', color: 'var(--text)' }}>Filtrar por:</label>
                    <select
                        id="category-filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                            border: '1px solid var(--border)',
                            background: 'var(--surface)',
                            color: 'var(--text)',
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="Todas">Todas las categorías</option>
                        {Object.keys(TOOLS_DATA).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            <p style={{
                color: 'var(--text-light)',
                marginBottom: '2rem',
                maxWidth: '700px',
                lineHeight: '1.6',
                margin: '0 auto 2rem auto',
                textAlign: 'justify'
            }}>
                Realiza cálculos de materiales, agrégalos a un presupuesto que suma automáticamente y exporta el resultado final a Excel.
            </p>

            {Object.entries(TOOLS_DATA).map(([category, tools]) => {
                if (filter !== 'Todas' && filter !== category) return null;

                return (
                    <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-light)', marginTop: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                            {category}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                            {tools.map((tool, index) => (
                                <CalculatorLink key={tool.to} {...tool} index={index} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
