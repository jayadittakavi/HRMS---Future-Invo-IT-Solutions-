import React from 'react';
import { useAuth } from "../../context/AuthContext";
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import HRDashboard from './HRDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AccountantDashboard from './AccountantDashboard';
import NewUserDashboard from './NewUserDashboard';

const DashboardManager = () => {
    const { user } = useAuth();

    if (!user) return null; // Or loading spinner

    // Normalize role to lowercase for consistent matching
    const role = user.role ? user.role.toLowerCase() : 'employee';

    console.log("DashboardManager: Rendering dashboard for role:", role);

    switch (role) {
        case 'superadmin':
        case 'super_admin':
            return <SuperAdminDashboard />;
        case 'admin':
            return <AdminDashboard />;
        case 'manager':
            return <ManagerDashboard />;
        case 'hr':
            return <HRDashboard />;
        case 'accountant':
            return <AccountantDashboard />;
        case 'newuser':
        case 'new_user':
            return <NewUserDashboard />;
        case 'employee':
        default:
            return <EmployeeDashboard />;
    }
};

export default DashboardManager;
