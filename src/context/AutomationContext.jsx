import React, { createContext, useContext, useState, useEffect } from 'react';

const AutomationContext = createContext();

export const AutomationProvider = ({ children }) => {
    const [rules, setRules] = useState([
        // Default Automation Rules
        {
            id: 'rule_1',
            module: 'Attendance',
            event: 'onInactivity',
            condition: 'no_punch_by_10am',
            action: 'mark_absent',
            target: 'Employee',
            isActive: true
        },
        {
            id: 'rule_2',
            module: 'Leave',
            event: 'onApply',
            condition: 'duration_lt_2days',
            action: 'auto_approve',
            target: 'Manager',
            isActive: false
        },
        {
            id: 'rule_3',
            module: 'Helpdesk',
            event: 'onCreate',
            condition: 'category_IT',
            action: 'assign_to_it_admin',
            target: 'Admin',
            isActive: true
        }
    ]);

    const [logs, setLogs] = useState([]);

    const triggerEvent = (eventName, data) => {
        console.log(`[Automation Engine] Event Triggered: ${eventName}`, data);

        // Find matching active rules
        const matchingRules = rules.filter(r => r.event === eventName && r.isActive);

        matchingRules.forEach(rule => {
            executeRule(rule, data);
        });
    };

    const executeRule = (rule, data) => {
        const timestamp = new Date().toLocaleString();
        const logEntry = {
            id: Date.now() + Math.random(),
            timestamp,
            ruleId: rule.id,
            module: rule.module,
            action: rule.action,
            status: 'Success',
            details: `Automated ${rule.action} for ${data?.employeeName || 'System'}`
        };

        setLogs(prev => [logEntry, ...prev].slice(0, 50));

        // In a real app, this would call a backend API
        console.log(`[Automation Engine] Executing Action: ${rule.action}`, { rule, data });

        // Mock notification for feedback
        if (window.showNotification) {
            window.showNotification(`${rule.module} Automation: ${rule.action} triggered!`, 'info');
        }
    };

    const updateRule = (id, updates) => {
        setRules(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    };

    const addRule = (newRule) => {
        setRules(prev => [...prev, { ...newRule, id: 'rule_' + Date.now(), isActive: true }]);
    };

    return (
        <AutomationContext.Provider value={{ rules, logs, triggerEvent, updateRule, addRule }}>
            {children}
        </AutomationContext.Provider>
    );
};

export const useAutomation = () => {
    const context = useContext(AutomationContext);
    if (!context) {
        throw new Error('useAutomation must be used within an AutomationProvider');
    }
    return context;
};
