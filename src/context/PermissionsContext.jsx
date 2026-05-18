import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { localPermStore } from '../pages/modules/hr/employees/permission-service';

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
    const { user: authUser } = useAuth();
    
    const [roles, setRoles] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [onboardingData, setOnboardingData] = useState([]);
    const [currentUserPermissions, setCurrentUserPermissions] = useState(null);
    const [loading, setLoading] = useState(true);

    const defaultRoles = [
        { id: 'superadmin', name: 'Super Admin', description: 'Full system access and control', dotColor: '#f59e0b', usersCount: 1, modulesCount: 12, permissions: { all: true } },
        { id: 'admin', name: 'Admin', description: 'System administration and configuration', dotColor: '#3b82f6', usersCount: 2, modulesCount: 10, permissions: {} },
        { id: 'hr', name: 'HR', description: 'Human resources management', dotColor: '#10b981', usersCount: 3, modulesCount: 8, permissions: {} },
        { id: 'manager', name: 'Manager', description: 'Team management and approvals', dotColor: '#6366f1', usersCount: 5, modulesCount: 6, permissions: {} },
        { id: 'employee', name: 'Employee', description: 'Standard employee access', dotColor: '#8b5cf6', usersCount: 20, modulesCount: 4, permissions: {} },
    ];

    // ── Initialize State from LocalStorage ──────────────────────────────────
    const loadState = () => {
        try {
            const storedRoles = JSON.parse(localStorage.getItem('mockRoles'));
            const storedEmployees = JSON.parse(localStorage.getItem('mockEmployees')) || [];
            const pendingInvites = JSON.parse(localStorage.getItem('pendingInvites') || '[]');

            // Merge pendingInvites into storedEmployees if they aren't already there
            let currentEmployees = [...storedEmployees];
            let modified = false;

            pendingInvites.forEach(invite => {
                const exists = currentEmployees.some(e => e.email === invite.email);
                if (!exists) {
                    currentEmployees.push({
                        id: invite.id || Date.now(),
                        name: invite.name || invite.full_name,
                        email: invite.email,
                        role: invite.role,
                        branch: invite.branch || 'Head Office',
                        department: invite.department || "General",
                        designation: invite.designation || "Employee",
                        status: "Active",
                        permissions: invite.permissions || {}
                    });
                    modified = true;
                }
            });

            if (modified) {
                localStorage.setItem('mockEmployees', JSON.stringify(currentEmployees));
            }

            // Calculate Role Counts dynamically
            let currentRoles = storedRoles || defaultRoles;
            currentRoles = currentRoles.map(role => {
                const usersInRole = currentEmployees.filter(emp => 
                    emp.role && emp.role.toLowerCase() === role.name.toLowerCase()
                ).length;
                // If local storage employees is empty, fallback to the default mock count
                return { ...role, usersCount: usersInRole > 0 || currentEmployees.length > 0 ? usersInRole : role.usersCount };
            });

            setRoles(currentRoles);
            setEmployees(currentEmployees);
            localStorage.setItem('mockRoles', JSON.stringify(currentRoles));

            const storedOnb = JSON.parse(localStorage.getItem('mockOnboarding')) || [];
            setOnboardingData(storedOnb);

        } catch (err) {
            console.error("Error initializing mock persistence:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadState();
        
        // Listen for updates from other files
        const handleStorageChange = () => loadState();
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('localDataUpdated', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('localDataUpdated', handleStorageChange);
        };
    }, []);

    // ── Update Current User Permissions ──────────────────────────────────────
    useEffect(() => {
        if (authUser && roles.length > 0) {
            const userEmail = authUser.email || '';
            const userRoleId = (authUser.role || 'employee').toLowerCase().replace(/\s/g, '');
            const userRole = roles.find(r => r.id === userRoleId || r.name?.toLowerCase().replace(/\s/g, '') === userRoleId);

            // 1. If we have a saved structured permissions object for this user's email, use it
            if (userEmail) {
                const saved = localPermStore.get(userEmail);
                if (saved?.permissions && Object.keys(saved.permissions).length > 0) {
                    setCurrentUserPermissions(saved.permissions);
                    return;
                }
            }

            // 2. Fallback: use role-level permissions from the role definition
            if (userRole) {
                setCurrentUserPermissions(userRole.permissions);
            } else if (userRoleId === 'superadmin') {
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
        const updatedRoles = roles.map(role => 
            role.id === roleId ? { ...role, permissions: newPermissions } : role
        );
        setRoles(updatedRoles);
        localStorage.setItem('mockRoles', JSON.stringify(updatedRoles));
        window.dispatchEvent(new Event('localDataUpdated'));
        return true;
    };

    const inviteEmployee = async (employeeData) => {
        const newEmp = {
            id: Date.now(),
            name: employeeData.name || employeeData.full_name,
            email: employeeData.email,
            role: employeeData.role || 'Employee',
            branch: employeeData.branch || 'Head Office',
            department: employeeData.subDepartment || employeeData.department || 'General',
            departmentType: employeeData.departmentType || '',
            subDepartment: employeeData.subDepartment || '',
            status: 'Active',
            permissions: employeeData.permissions || {}
        };
        const updatedEmployees = [...employees, newEmp];
        setEmployees(updatedEmployees);
        localStorage.setItem('mockEmployees', JSON.stringify(updatedEmployees));
        
        // Save to pending invites as well for compatibility
        const pending = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
        pending.push(newEmp);
        localStorage.setItem('pendingInvites', JSON.stringify(pending));

        window.dispatchEvent(new Event('localDataUpdated'));
        return true;
    };

    const updateEmployeePermissions = async (empId, newPermissions) => {
        const updatedEmployees = employees.map(emp => 
            emp.id === empId ? { ...emp, permissions: newPermissions } : emp
        );
        setEmployees(updatedEmployees);
        localStorage.setItem('mockEmployees', JSON.stringify(updatedEmployees));
        window.dispatchEvent(new Event('localDataUpdated'));
        return true;
    };

    const removeEmployee = async (empId) => {
        // Find email before filtering (needed to clean pendingInvites by email)
        const removedEmp = employees.find(emp => emp.id === empId);

        // Remove from main employee list
        const updatedEmployees = employees.filter(emp => emp.id !== empId);
        setEmployees(updatedEmployees);
        localStorage.setItem('mockEmployees', JSON.stringify(updatedEmployees));

        // CRITICAL: Also remove from pendingInvites so loadState doesn't re-add them
        const pending = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
        const updatedPending = pending.filter(inv =>
            String(inv.id) !== String(empId) &&
            (!removedEmp || inv.email !== removedEmp.email)
        );
        localStorage.setItem('pendingInvites', JSON.stringify(updatedPending));

        // Dispatch after both stores are cleaned
        window.dispatchEvent(new Event('localDataUpdated'));
        return true;
    };

    const submitOnboarding = async (data) => {
        const updatedOnb = [...onboardingData, { ...data, id: Date.now() }];
        setOnboardingData(updatedOnb);
        localStorage.setItem('mockOnboarding', JSON.stringify(updatedOnb));
        return true;
    };

    const addRole = (newRoleData) => {
        const newRole = {
            id: newRoleData.name.toLowerCase().replace(/\s+/g, '_'),
            name: newRoleData.name,
            description: newRoleData.description || 'Custom role',
            usersCount: 0,
            modulesCount: 0,
            dotColor: '#' + Math.floor(Math.random()*16777215).toString(16),
            permissions: {}
        };
        const updatedRoles = [...roles, newRole];
        setRoles(updatedRoles);
        localStorage.setItem('mockRoles', JSON.stringify(updatedRoles));
        window.dispatchEvent(new Event('localDataUpdated'));
    };

    const deleteRole = (roleId) => {
        const updatedRoles = roles.filter(r => r.id !== roleId);
        setRoles(updatedRoles);
        localStorage.setItem('mockRoles', JSON.stringify(updatedRoles));
        window.dispatchEvent(new Event('localDataUpdated'));
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
            submitOnboarding,
            addRole,
            deleteRole,
            removeEmployee
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

