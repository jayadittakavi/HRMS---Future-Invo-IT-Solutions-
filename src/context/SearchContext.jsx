import React, { createContext, useContext, useState, useCallback } from 'react';

// Context to provide global search term and a reusable filter utility
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [globalSearchTerm, setGlobalSearchTerm] = useState('');

    // Utility: filter a list of objects based on the current search term
    const filterItems = useCallback((items = [], keys = []) => {
        if (!globalSearchTerm) return items;
        const term = globalSearchTerm.trim().toLowerCase();
        return items.filter(item =>
            keys.some(key => {
                const value = item[key];
                return value != null && String(value).toLowerCase().includes(term);
            })
        );
    }, [globalSearchTerm]);

    return (
        <SearchContext.Provider value={{ globalSearchTerm, setGlobalSearchTerm, filterItems }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
