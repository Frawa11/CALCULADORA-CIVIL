import React from 'react';

export const Card = ({ children, title, className = '' }) => {
    return (
        <div className={`card ${className}`}>
            {title && (
                <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: 'var(--primary-dark)',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '0.5rem'
                }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};
