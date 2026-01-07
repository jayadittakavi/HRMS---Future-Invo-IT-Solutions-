import React from 'react';
import { useAuth } from '../context/AuthContext';
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

    switch (user.role) {
        case 'superadmin':
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
            // Check status if needed, but for now just show the dashboard
            return <NewUserDashboard />;
        case 'employee':
        default:
            return <EmployeeDashboard />;
    }
};

export default DashboardManager;
