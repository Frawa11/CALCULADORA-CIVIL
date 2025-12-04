import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { ScrollToTop } from '../ui/ScrollToTop';
import { FormulaSidebar } from '../ui/FormulaSidebar';

export const Layout = () => {
    const [isFormulaSidebarOpen, setIsFormulaSidebarOpen] = useState(false);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header onOpenFormulas={() => setIsFormulaSidebarOpen(true)} />
            <main style={{ flex: 1, padding: '1rem 0' }}>
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer style={{
                textAlign: 'center',
                padding: '1rem',
                color: 'var(--text-light)',
                fontSize: '0.875rem',
                borderTop: '1px solid var(--border)'
            }}>
                <p>© 2025 Calculadora Civil App</p>
            </footer>
            <ScrollToTop />
            <FormulaSidebar
                isOpen={isFormulaSidebarOpen}
                onClose={() => setIsFormulaSidebarOpen(false)}
            />
        </div>
    );
};
