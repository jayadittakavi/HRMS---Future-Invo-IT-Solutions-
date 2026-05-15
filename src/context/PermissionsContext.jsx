import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
    const { user: authUser } = useAuth();
    
    const [roles, setRoles] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [onboardingData, setOnboardingData] = useState([]);
    const [currentUserPermissions, setCurrentUserPermissions] = useState(null);
    const [loading, setLoading] = useState(true);

    // ── Fetch Roles & Permissions ────────────────────────────────────────────
    useEffect(() => {
        const fetchPermissionsData = async () => {
            try {
                // Fetch Roles
                const rolesRes = await fetch('/api/roles');
                if (rolesRes.ok) {
                    const rolesData = await rolesRes.json();
                    setRoles(rolesData);
                }

                // Fetch Employees
                const empRes = await fetch('/api/employees');
                if (empRes.ok) {
                    const empData = await empRes.json();
                    setEmployees(empData);
                }

                // Fetch Onboarding
                const onbRes = await fetch('/api/onboarding');
                if (onbRes.ok) {
                    const onbData = await onbRes.json();
                    setOnboardingData(onbData);
                }
            } catch (err) {
                console.error("Error fetching permissions data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPermissionsData();
    }, []);

    // ── Update Current User Permissions ──────────────────────────────────────
    useEffect(() => {
        if (authUser && roles.length > 0) {
            const userRoleId = (authUser.role || 'employee').toLowerCase().replace(/\s/g, '');
            const userRole = roles.find(r => r.id === userRoleId || r.name?.toLowerCase().replace(/\s/g, '') === userRoleId);
            
            if (userRole) {
                setCurrentUserPermissions(userRole.permissions);
            } else if (authUser.role?.toLowerCase() === 'superadmin') {
                // Hard-coded bypass for SuperAdmin if roles list is incomplete
                setCurrentUserPermissions({
                    dashboard: ['dashboard', 'my_dashboard'],
                    attendance: ['attendance', 'my_attendance'],
                    leave: ['leave_management', 'my_leave'],
                    payroll: ['payroll_management', 'my_payroll'],
                    hr: ['employees', 'departments', 'onboarding', 'documents'],
                    others: ['reports', 'calendar', 'settings']
                });
            }
        }
    }, [authUser, roles]);

    const updateRolePermissions = async (roleId, newPermissions) => {
        try {
            const res = await fetch(`/api/roles/${roleId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ permissions: newPermissions })
            });
            if (res.ok) {
                setRoles(prev => prev.map(role => 
                    role.id === roleId ? { ...role, permissions: newPermissions } : role
                ));
                return true;
            }
        } catch (err) {
            console.error("Error updating role permissions:", err);
        }
        return false;
    };

    const inviteEmployee = async (employeeData) => {
        try {
            const res = await fetch('/api/employees/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData)
            });
            if (res.ok) {
                const newEmp = await res.json();
                setEmployees(prev => [...prev, newEmp]);
                return true;
            }
        } catch (err) {
            console.error("Error inviting employee:", err);
        }
        return false;
    };

    const updateEmployeePermissions = async (empId, newPermissions) => {
        try {
            const res = await fetch(`/api/employees/${empId}/permissions`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ permissions: newPermissions })
            });
            if (res.ok) {
                setEmployees(prev => prev.map(emp => 
                    emp.id === empId ? { ...emp, permissionOverrides: newPermissions } : emp
                ));
                return true;
            }
        } catch (err) {
            console.error("Error updating employee permissions:", err);
        }
        return false;
    };

    const submitOnboarding = async (data) => {
        try {
            const res = await fetch('/api/onboarding/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                const newOnb = await res.json();
                setOnboardingData(prev => [...prev, newOnb]);
                return true;
            }
        } catch (err) {
            console.error("Error submitting onboarding:", err);
        }
        return false;
    };

    return (
        <PermissionsContext.Provider value={{ 
            roles, 
            employees, 
            onboardingData,
            currentUserPermissions,
            loading,
            updateRolePermissions, 
            inviteEmployee,
            updateEmployeePermissions,
            submitOnboarding
        }}>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => {
    const context = useContext(PermissionsContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionsProvider');
    }
    return context;
};
