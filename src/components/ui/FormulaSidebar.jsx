import React from 'react';
import { X, BookOpen, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { FORMULAS_DATA } from '../../utils/formulas';

export const FormulaSidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const data = FORMULAS_DATA[currentPath] || FORMULAS_DATA['default'];

    return (
        <>
            {/* Overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={`formula-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <BookOpen size={24} color="var(--primary)" />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>
                            {data.title}
                        </h2>
                    </div>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="sidebar-content">
                    {data.sections.map((section, index) => {
                        switch (section.type) {
                            case 'header':
                                return (
                                    <h3 key={index} className="formula-section-header">
                                        {section.content}
                                    </h3>
                                );
                            case 'text':
                                return (
                                    <p key={index} className="formula-text">
                                        {section.content}
                                    </p>
                                );
                            case 'highlight':
                                return (
                                    <div key={index} className="formula-highlight">
                                        {section.content}
                                    </div>
                                );
                            case 'table':
                                return (
                                    <div key={index} className="formula-table-container">
                                        {section.title && <h4 className="formula-table-title">{section.title}</h4>}
                                        <table className="formula-table">
                                            <thead>
                                                <tr>
                                                    {section.headers.map((header, i) => (
                                                        <th key={i}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section.rows.map((row, i) => (
                                                    <tr key={i}>
                                                        {row.map((cell, j) => (
                                                            <td key={j}>{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            case 'list':
                                return (
                                    <ul key={index} className="formula-list">
                                        {section.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            case 'info':
                                return (
                                    <div key={index} className="formula-info">
                                        <Info size={16} />
                                        <p>{section.content}</p>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </>
    );
};
