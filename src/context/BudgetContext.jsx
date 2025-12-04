import React, { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};

export const BudgetProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems(prev => [...prev, { ...item, id: Date.now() }]);
    };

    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearBudget = () => {
        setItems([]);
    };

    return (
        <BudgetContext.Provider value={{ items, addItem, removeItem, clearBudget }}>
            {children}
        </BudgetContext.Provider>
    );
};
