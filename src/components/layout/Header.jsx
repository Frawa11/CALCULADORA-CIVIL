import React from 'react';
import { Calculator, ClipboardList, ArrowLeft, Sun, Moon, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useBudget } from '../../context/BudgetContext';
import { useTheme } from '../../context/ThemeContext';

export const Header = ({ onOpenFormulas }) => {
  const { items } = useBudget();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header style={{
      background: 'var(--primary)',
      color: 'white',
      padding: '1rem',
      boxShadow: 'var(--shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'background-color 0.3s'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!isHome && (
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textDecoration: 'none',
              padding: '0.25rem',
              borderRadius: '50%',
              transition: 'background-color 0.2s'
            }}>
              <ArrowLeft size={24} />
            </Link>
          )}

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white' }}>
            <Calculator size={24} />
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Calculadora Civil</h1>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onOpenFormulas}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem',
              borderRadius: '50%'
            }}
            aria-label="Ver fórmulas"
            title="Ver fórmulas"
          >
            <BookOpen size={24} />
          </button>

          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem',
              borderRadius: '50%'
            }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>

          <Link to="/budget" style={{ position: 'relative', color: 'white' }}>
            <ClipboardList size={28} />
            {items.length > 0 && (
              <span style={{
                position: 'absolute',
                top: -5,
                right: -5,
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
