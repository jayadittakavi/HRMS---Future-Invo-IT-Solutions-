// src/config/SidebarConfig.js
import React from 'react';
import {
    MdDashboard,
    MdPeople,
    MdBusiness,
    MdFactCheck,
    MdEventBusy,
    MdAttachMoney,
    MdBarChart,
    MdGroups,
    MdDescription,
    MdFlight,
    MdAdminPanelSettings,
    MdGridView,
    MdSecurity,
    MdUserPlus
} from 'react-icons/md';

export const SIDEBAR_CONFIG = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <MdDashboard size={20} />,
        module: 'dashboard',
        children: [
            { id: 'my-dashboard', label: 'My Dashboard', path: '/dashboard/my-space', permission: 'VIEW_MY' },
            { id: 'overall-dashboard', label: 'Overall Dashboard', path: '/dashboard', permission: 'VIEW_ALL' },
        ],
    },
    {
        id: 'employees',
        label: 'Employees',
        icon: <MdPeople size={20} />,
        module: 'employees',
        children: [
            { id: 'employee-directory', label: 'Directory', path: '/employee-directory', permission: 'VIEW' },
            { id: 'invite-member', label: 'Invite Member', path: '/invite-member', permission: 'INVITE' },
            { id: 'roles-permissions', label: 'Roles & Permissions', path: '/roles-list', permission: 'MANAGE_ROLES' },
        ],
    },
    {
        id: 'attendance',
        label: 'Attendance',
        icon: <MdFactCheck size={20} />,
        module: 'attendance',
        children: [
            { id: 'my-attendance', label: 'My Attendance', path: '/my-attendance', permission: 'VIEW_MY' },
            { id: 'attendance-logs', label: 'Attendance Logs', path: '/attendance', permission: 'VIEW_ALL' },
        ],
    },
    {
        id: 'payroll',
        label: 'Payroll',
        icon: <MdAttachMoney size={20} />,
        module: 'payroll',
        children: [
            { id: 'my-payroll', label: 'My Payroll', path: '/my-payslips', permission: 'VIEW_MY' },
            { id: 'financial-reports', label: 'Financial Reports', path: '/financial-reports', permission: 'VIEW_REPORTS' },
        ],
    },
    {
        id: 'leaves',
        label: 'Leaves',
        icon: <MdEventBusy size={20} />,
        module: 'leaves',
        children: [
            { id: 'my-leaves', label: 'My Leaves', path: '/my-leaves', permission: 'APPLY' },
            { id: 'leave-requests', label: 'Requests', path: '/leave-management', permission: 'APPROVE' },
        ],
    },
    {
        id: 'documents',
        label: 'HR Documents',
        icon: <MdDescription size={20} />,
        module: 'documents',
        path: '/documents'
    },
    {
        id: 'onboarding',
        label: 'Onboarding',
        icon: <MdUserPlus size={20} />,
        module: 'onboarding',
        path: '/onboarding'
    },
    {
        id: 'administration',
        label: 'Administration',
        icon: <MdGridView size={20} />,
        module: 'administration',
        children: [
            { id: 'companies', label: 'Companies', path: '/companies', roles: ['superadmin'] },
            { id: 'departments', label: 'Departments', path: '/departments' },
            { id: 'automation', label: 'Automation', path: '/automation-center', roles: ['superadmin', 'admin'] },
        ],
    },
];
