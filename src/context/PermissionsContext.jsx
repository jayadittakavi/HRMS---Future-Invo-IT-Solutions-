import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PermissionsContext = createContext();

const defaultRoles = [
    {
        id: 'admin',
        name: 'Admin',
        description: 'Full administrative access to all modules and configurations.',
        usersCount: 2,
        modulesCount: 12,
        dotColor: '#6366f1',
        permissions: {
            dashboard: ['dashboard', 'my_dashboard', 'my_team'],
            attendance: ['attendance', 'my_attendance', 'attendance_mgmt'],
            leave: ['leave', 'my_leaves', 'leave_requests', 'wfh'],
            payroll: ['payroll', 'my_payroll', 'payroll_mgmt'],
            hr: ['employees', 'departments', 'recruitment', 'onboarding', 'training', 'performance', 'hr_tools'],
            documents: ['documents'],
            reports: ['reports'],
            loans: ['loans'],
            travel: ['travel'],
            administration: ['administration', 'delegation', 'visitor_approvals', 'visitors', 'desk', 'automation']
        }
    },
    {
        id: 'hr',
        name: 'HR',
        description: 'Manage employee directories, onboarding pipelines, performance reviews and leave approvals.',
        usersCount: 3,
        modulesCount: 9,
        dotColor: '#10b981',
        permissions: {
            dashboard: ['dashboard', 'my_dashboard', 'my_team'],
            attendance: ['attendance', 'my_attendance', 'attendance_mgmt'],
            leave: ['leave', 'my_leaves', 'leave_requests', 'wfh'],
            payroll: ['payroll', 'my_payroll', 'payroll_mgmt'],
            hr: ['employees', 'departments', 'recruitment', 'onboarding', 'training', 'performance', 'hr_tools'],
            documents: ['documents'],
            loans: ['loans'],
            travel: ['travel'],
            administration: ['administration', 'delegation', 'visitor_approvals', 'visitors', 'desk']
        }
    },
    {
        id: 'manager',
        name: 'Manager',
        description: 'View dashboard analytics, approve team leaves, manage squad desks and track travel expenses.',
        usersCount: 1,
        modulesCount: 7,
        dotColor: '#3b82f6',
        permissions: {
            dashboard: ['dashboard', 'my_dashboard', 'my_team'],
            attendance: ['attendance', 'my_attendance', 'attendance_mgmt'],
            leave: ['leave', 'my_leaves', 'leave_requests', 'wfh'],
            payroll: ['payroll', 'my_payroll', 'payroll_mgmt'],
            loans: ['loans'],
            travel: ['travel'],
            documents: ['documents'],
            administration: ['administration', 'delegation', 'visitor_approvals', 'visitors', 'desk']
        }
    },
    {
        id: 'employee',
        name: 'Employee',
        description: 'Standard employee portal access for personal dashboards, clock-ins, leave applications, and payslips.',
        usersCount: 5,
        modulesCount: 5,
        dotColor: '#6b7280',
        permissions: {
            dashboard: ['dashboard', 'my_dashboard'],
            attendance: ['attendance', 'my_attendance'],
            leave: ['leave', 'my_leaves', 'wfh'],
            payroll: ['payroll', 'my_payroll'],
            documents: ['documents'],
            administration: ['visitors', 'desk']
        }
    }
];

export const PermissionsProvider = ({ children }) => {
    const { user: authUser, token } = useAuth();
    
    const [roles, setRoles] = useState(defaultRoles);
    const [employees, setEmployees] = useState([]);
    const [onboardingData, setOnboardingData] = useState([]);
    const [currentUserPermissions, setCurrentUserPermissions] = useState(null);
    const [loading, setLoading] = useState(true);

    // ── Fetch Roles & Permissions ────────────────────────────────────────────
    useEffect(() => {
        if (!authUser || !token) {
            setRoles(defaultRoles);
            setEmployees([]);
            setOnboardingData([]);
            setCurrentUserPermissions(null);
            setLoading(false);
            return;
        }

        const fetchPermissionsData = async () => {
            setLoading(true);
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                const userRole = authUser.role?.toUpperCase();
                const isAdminOrHR = ['ADMIN', 'HR', 'SUPER_ADMIN', 'SUPERADMIN'].includes(userRole);

                if (isAdminOrHR) {
                    // Fetch Roles
                    try {
                        const rolesRes = await fetch('/api/admin/access-control/roles', { headers });
                        if (rolesRes.ok) {
                            const rolesData = await rolesRes.json();
                            const fetchedRoles = rolesData.roles || [];
                            if (fetchedRoles.length > 0) {
                                // Map backend Roles back to frontend structure with default permissions fallback
                                const mappedRoles = fetchedRoles.map(r => {
                                    const roleKey = r.name?.toLowerCase().replace(/\s/g, '');
                                    const fallback = defaultRoles.find(dr => dr.id === roleKey) || defaultRoles[3];
                                    return {
                                        id: r.id?.toString() || roleKey,
                                        name: r.name,
                                        description: r.description || fallback.description,
                                        usersCount: r.usersCount || fallback.usersCount,
                                        modulesCount: r.permissions?.length || fallback.modulesCount,
                                        dotColor: fallback.dotColor,
                                        permissions: fallback.permissions // Keep frontend category permissions
                                    };
                                });
                                setRoles(mappedRoles);
                            }
                        }
                    } catch (roleErr) {
                        console.warn("Could not fetch roles from backend, using defaults:", roleErr);
                    }

                    // Fetch Employees
                    try {
                        const empRes = await fetch('/api/admin/employees', { headers });
                        if (empRes.ok) {
                            const empData = await empRes.json();
                            const rawEmployees = empData.data || [];
                            const mappedEmployees = rawEmployees.map(emp => ({
                                id: emp.id?.toString() || emp.employee_id,
                                name: emp.name || '',
                                email: emp.email || '',
                                role: emp.role?.toLowerCase() || 'employee',
                                department: emp.department || 'Engineering',
                                status: emp.status || 'Active',
                                joinDate: emp.joining_date ? new Date(emp.joining_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'May 21, 2026',
                                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`
                            }));
                            setEmployees(mappedEmployees);
                        }
                    } catch (empErr) {
                        console.warn("Could not fetch employees from backend:", empErr);
                    }

                    // Fetch Onboarding candidates
                    try {
                        const onbRes = await fetch('/api/hr-docs/onboarding', { headers });
                        if (onbRes.ok) {
                            const onbData = await onbRes.json();
                            const rawCandidates = onbData.data || [];
                            const mappedCandidates = rawCandidates.map(c => {
                                let statusMapped = 'Pending Review';
                                if (c.Status === 'IN_PROGRESS' || c.Status === 'In Progress') {
                                    statusMapped = c.Progress > 50 ? 'Background Check' : 'Document Verification';
                                } else if (c.Status === 'COMPLETED' || c.Status === 'Completed') {
                                    statusMapped = 'Completed';
                                } else if (c.Status === 'PENDING' || c.Status === 'Pending') {
                                    statusMapped = 'Pending Review';
                                } else {
                                    statusMapped = c.Status || 'Pending Review';
                                }
                                return {
                                    id: c.id?.toString(),
                                    fullName: c.Candidate || '',
                                    role: c.Role || '',
                                    joiningDate: c.JoiningDate || '',
                                    status: statusMapped,
                                    progress: c.Progress || 0
                                };
                            });
                            setOnboardingData(mappedCandidates);
                        }
                    } catch (onbErr) {
                        console.warn("Could not fetch onboarding from backend:", onbErr);
                    }
                }
            } catch (err) {
                console.error("Error fetching permissions data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPermissionsData();
    }, [authUser, token]);

    // ── Update Current User Permissions ──────────────────────────────────────
    useEffect(() => {
        if (authUser && roles.length > 0) {
            const userRoleId = (authUser.role || 'employee').toLowerCase().replace(/\s/g, '');
            const userRole = roles.find(r => r.id === userRoleId || r.name?.toLowerCase().replace(/\s/g, '') === userRoleId);
            
            if (userRole) {
                setCurrentUserPermissions(userRole.permissions);
            } else if (authUser.role?.toLowerCase() === 'superadmin' || authUser.role?.toLowerCase() === 'super_admin') {
                setCurrentUserPermissions({
                    dashboard: ['dashboard', 'my_dashboard', 'my_team'],
                    attendance: ['attendance', 'my_attendance', 'attendance_mgmt'],
                    leave: ['leave', 'my_leaves', 'leave_requests', 'wfh'],
                    payroll: ['payroll', 'my_payroll', 'payroll_mgmt'],
                    hr: ['employees', 'departments', 'recruitment', 'onboarding', 'training', 'performance', 'hr_tools'],
                    documents: ['documents'],
                    reports: ['reports'],
                    loans: ['loans'],
                    travel: ['travel'],
                    administration: ['administration', 'delegation', 'visitor_approvals', 'visitors', 'desk', 'automation', 'audit_logs']
                });
            } else {
                // Fallback to basic employee
                setCurrentUserPermissions(defaultRoles[3].permissions);
            }
        }
    }, [authUser, roles]);

    const updateRolePermissions = async (roleId, newPermissions) => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            
            const flatPermissions = Object.entries(newPermissions)
                .reduce((acc, [category, modules]) => {
                    if (Array.isArray(modules)) {
                        modules.forEach(m => acc.push(`${category}.${m.toLowerCase()}`));
                    }
                    return acc;
                }, []);
            
            const res = await fetch(`/api/admin/access-control/roles/${roleId}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ 
                    permissions: flatPermissions,
                    name: roles.find(r => r.id === roleId)?.name || 'Role'
                })
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
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            
            const mappedRole = (employeeData.role || 'employee').toUpperCase();
            const tempPassword = Math.random().toString(36).substring(2, 10) + 'A1!';
            
            const payload = {
                name: employeeData.name,
                full_name: employeeData.name,
                email: employeeData.email,
                phone_number: employeeData.phone,
                department: employeeData.department,
                designation: employeeData.designation,
                role: mappedRole,
                password: tempPassword,
                status: 'ACTIVE'
            };
            
            const res = await fetch('/api/admin/create-employee', {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });
            
            if (res.ok) {
                const resData = await res.json();
                const newEmp = {
                    id: resData.employee_id || Date.now().toString(),
                    name: employeeData.name,
                    email: employeeData.email,
                    role: employeeData.role,
                    department: employeeData.department,
                    status: 'Active',
                    joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeData.name)}&background=random`
                };
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
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            
            const employee = employees.find(e => e.id === empId);
            if (!employee) return false;
            
            const usersRes = await fetch('/api/admin/access-control/users', { headers });
            if (!usersRes.ok) return false;
            
            const usersData = await usersRes.json();
            const users = usersData.users || [];
            const userObj = users.find(u => u.email === employee.email || u.username === employee.user);
            
            if (!userObj) return false;
            
            const flatPermissions = Object.entries(newPermissions)
                .reduce((acc, [category, modules]) => {
                    if (Array.isArray(modules)) {
                        modules.forEach(m => acc.push(`${category}.${m.toLowerCase()}`));
                    }
                    return acc;
                }, []);
            
            const res = await fetch(`/api/admin/access-control/users/${userObj.id}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ 
                    permissions: flatPermissions,
                    role: userObj.role,
                    email: userObj.email
                })
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
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            
            const payload = {
                Candidate: data.fullName || 'New Candidate',
                Role: data.prevCompany || 'Employee',
                JoiningDate: new Date().toISOString().split('T')[0],
                Status: 'IN_PROGRESS',
                Progress: 10
            };
            
            const res = await fetch('/api/hr-docs/onboarding', {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });
            
            if (res.ok) {
                const resData = await res.json();
                const newOnb = {
                    id: resData.data?.id?.toString() || Date.now().toString(),
                    fullName: payload.Candidate,
                    role: payload.Role,
                    joiningDate: payload.JoiningDate,
                    status: 'Document Verification',
                    progress: payload.Progress
                };
                setOnboardingData(prev => [...prev, newOnb]);
                return true;
            }
        } catch (err) {
            console.error("Error submitting onboarding:", err);
        }
        return false;
    };

    // Existing code up to line 419 unchanged
    const updateEmployeeInfo = async (empId, newInfo) => {
        try {
            const updatedList = employees.map(e => e.id === empId ? { ...e, ...newInfo } : e);
            setEmployees(updatedList);
            return true;
        } catch (err) {
            console.error('Error updating employee info:', err);
            return false;
        }
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
            updateEmployeeInfo // expose new function
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
