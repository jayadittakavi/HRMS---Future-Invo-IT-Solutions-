// src/context/CompanyContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCompanySettings } from '../services/settingsService';
import { useAuth } from './AuthContext';

const CompanyContext = createContext();

const DEFAULT_SETTINGS = {
    company_name: 'WS HRMS',
    logo_url: null,
    email: '',
    phone: '',
    address: '',
    timezone: 'Asia/Kolkata (IST)',
    working_days: '5 Days (Mon-Fri)'
};

const getStoredCompanySettings = () => {
    try {
        const stored = localStorage.getItem('companySettings');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to parse stored company settings:', e);
    }
    return DEFAULT_SETTINGS;
};

export const CompanyProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [settings, setSettings] = useState(() => getStoredCompanySettings());
    const [loading, setLoading] = useState(false);

    // Fetch fresh settings from the API
    const fetchCompanySettings = useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const data = await getCompanySettings();
            if (data) {
                const companyData = {
                    company_name: data.company_name || 'WS HRMS',
                    logo_url: data.logo_url || null,
                    email: data.email || '',
                    phone: data.phone || '',
                    address: data.address || '',
                    timezone: data.timezone || 'Asia/Kolkata (IST)',
                    working_days: data.working_days || '5 Days (Mon-Fri)'
                };
                setSettings(companyData);
                localStorage.setItem('companySettings', JSON.stringify(companyData));
            }
        } catch (err) {
            console.error('Failed to fetch company settings from backend API:', err);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    // Update state immediately (e.g. after successful save in settings)
    const updateCompanyState = useCallback((newSettings) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem('companySettings', JSON.stringify(updated));
            return updated;
        });
    }, []);

    // Sync settings from backend upon authentication
    useEffect(() => {
        if (isAuthenticated) {
            fetchCompanySettings();
        }
    }, [isAuthenticated, fetchCompanySettings]);

    // Synchronize company settings across open tabs/windows using localStorage storage events
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'companySettings' && e.newValue) {
                try {
                    setSettings(JSON.parse(e.newValue));
                } catch (err) {
                    console.error('Failed to synchronize company settings from storage event:', err);
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <CompanyContext.Provider value={{
            settings,
            loading,
            refreshSettings: fetchCompanySettings,
            updateCompanyState
        }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};
