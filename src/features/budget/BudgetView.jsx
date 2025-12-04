import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Card } from '../../components/ui/card.jsx';
import { Trash2, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

export const BudgetView = () => {
    const { items, removeItem, clearBudget } = useBudget();

    const parseValue = (val) => {
        if (!val) return 0;
        // Remove currency symbols, units, and whitespace
        const cleanVal = val.toString().replace(/[^\d.-]/g, '');
        return parseFloat(cleanVal) || 0;
    };

    const handleExport = () => {
        if (items.length === 0) return;

        // Define standard columns mapping
        // Key: Excel Column Name
        // Values: Possible keys in item.details to look for
        const columnMapping = {
            // Quantities
            'Cemento (bls)': ['Cemento'],
            'Arena (m3)': ['Arena', 'Arena Fina', 'Ag. Fino'],
            'Piedra (m3)': ['Piedra', 'Piedra Grande', 'Piedra Mediana', 'Ag. Grueso'],
            'Hormigón (m3)': ['Hormigón'],
            'Agua (m3)': ['Agua'],
            'Ladrillo (und)': ['Ladrillos'],
            'Mortero (m3)': ['Mortero'],
            'Acero (kg)': ['Acero Total', 'Peso Acero'],

            // Costs
            'Costo Cemento': ['Costo Cemento', 'Costo Cemento/m3'],
            'Costo Arena': ['Costo Arena', 'Costo Ag. Fino/m3'],
            'Costo Piedra': ['Costo Piedra', 'Costo Piedra Grande', 'Costo Piedra Mediana', 'Costo Ag. Grueso/m3'],
            'Costo Hormigón': ['Costo Hormigón'],
            'Costo Agua': ['Costo Agua', 'Costo Agua/m3'],
            'Costo Ladrillo': ['Costo Ladrillos'],
            'Costo Mortero': ['Costo Mortero'],
            'Costo Acero': ['Costo Acero'],

            // Total
            'Costo Total': ['Costo Total', 'Costo Total/m3']
        };

        const data = items.map(item => {
            const row = {
                Fecha: new Date(item.id).toLocaleDateString(),
                Tipo: item.type,
                Detalle: item.description,
            };

            // Map details to standard columns
            Object.entries(columnMapping).forEach(([excelCol, possibleKeys]) => {
                let foundValue = 0;
                for (const key of possibleKeys) {
                    if (item.details[key]) {
                        foundValue = parseValue(item.details[key]);
                        break;
                    }
                }
                // Only add to row if value is > 0 or it's a cost column (to show 0.00)
                if (foundValue > 0 || excelCol.startsWith('Costo')) {
                    row[excelCol] = foundValue;
                }
            });

            return row;
        });

        // Calculate Grand Total for the footer
        const grandTotal = data.reduce((sum, row) => sum + (row['Costo Total'] || 0), 0);

        // Add a total row
        data.push({
            Fecha: '',
            Tipo: '',
            Detalle: 'TOTAL PRESUPUESTO',
            'Costo Total': grandTotal
        });

        const ws = XLSX.utils.json_to_sheet(data);

        // Adjust column widths (optional but nice)
        const wscols = [
            { wch: 12 }, // Fecha
            { wch: 20 }, // Tipo
            { wch: 40 }, // Detalle
            { wch: 15 }, // Cemento
            { wch: 15 }, // Arena
            { wch: 15 }, // Piedra
            { wch: 15 }, // Hormigon
            { wch: 15 }, // Agua
            { wch: 15 }, // Ladrillo
            { wch: 15 }, // Mortero
            { wch: 15 }, // Acero
            { wch: 15 }, // Costo Cemento
            { wch: 15 }, // Costo Arena
            { wch: 15 }, // Costo Piedra
            { wch: 15 }, // Costo Hormigon
            { wch: 15 }, // Costo Agua
            { wch: 15 }, // Costo Ladrillo
            { wch: 15 }, // Costo Mortero
            { wch: 15 }, // Costo Acero
            { wch: 20 }, // Costo Total
        ];
        ws['!cols'] = wscols;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Presupuesto");
        XLSX.writeFile(wb, "Presupuesto_Civil_Ordenado.xlsx");
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mi Presupuesto</h2>
                <button className="btn btn-outline" onClick={clearBudget} style={{ width: 'auto', padding: '0.5rem' }}>
                    <Trash2 size={16} />
                </button>
            </div>

            {items.length === 0 ? (
                <Card>
                    <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>No hay items en el presupuesto.</p>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {items.map(item => (
                        <Card key={item.id} style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 style={{ fontWeight: '600', color: 'var(--primary)' }}>{item.type}</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{item.description}</p>

                                    {/* Render details dynamically */}
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                        {Object.entries(item.details).map(([key, value]) => (
                                            <div key={key}>
                                                <span style={{ fontWeight: '500' }}>{key}: </span>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {items.length > 0 && (
                <button className="btn btn-primary" onClick={handleExport} style={{ marginTop: '1rem', background: '#10b981' }}>
                    <FileSpreadsheet size={20} />
                    Exportar a Excel (Ordenado)
                </button>
            )}
        </div>
    );
};
