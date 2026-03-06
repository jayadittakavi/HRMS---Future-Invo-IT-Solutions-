import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import AskMeAI from '../common/AskMeAI';

const DashboardLayout = ({ title, onNavigate, activePath, children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const { user } = useAuth(); // Need user context to know role for base path

    // Use passed onNavigate or default to router navigation
    const handleNavigate = (path) => {
        if (onNavigate) {
            onNavigate(path);
        } else {
            // If path is absolute (starts with /), navigate directly
            if (path.startsWith('/')) {
                navigate(path);
            } else {
                // Otherwise, append to current dashboard path
                // This is where we ensure we stay within the correct dashboard context
                const role = user?.role?.toLowerCase();
                let basePath = '/dashboard';
                if (role === 'superadmin') basePath = '/dashboard/super-admin';
                else if (role === 'admin') basePath = '/dashboard/admin';
                else if (role === 'manager') basePath = '/dashboard/manager';
                else if (role === 'hr') basePath = '/dashboard/hr';
                else if (role === 'employee') basePath = '/dashboard/employee';

                // If the path is just 'dashboard', go to the base path
                if (path === 'dashboard') {
                    navigate(basePath);
                } else {
                    navigate(`${basePath}/${path}`);
                }
            }
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="d-flex vh-100 glass-dashboard-bg overflow-hidden position-relative p-0 m-0">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar Wrapper (Dynamic Width) */}
            <div
                className={`glass-sidebar-wrapper transition-all h-100 ${isSidebarOpen ? 'd-block' : 'd-none d-md-block'}`}
                style={{ width: isSidebarOpen ? '260px' : '80px', minWidth: isSidebarOpen ? '260px' : '80px', overflow: 'hidden' }}
            >
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} activePath={activePath} onNavigate={(path) => {
                    if (window.innerWidth < 768) {
                        setIsSidebarOpen(false);
                    }
                    handleNavigate(path);
                }} />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden">
                <div className="main-dashboard-container flex-grow-1 d-flex flex-column h-100 overflow-hidden shadow-sm">
                    <DashboardHeader title={title} toggleSidebar={toggleSidebar} onNavigate={handleNavigate} />

                    {/* Scrollable Content Area */}
                    <div className="flex-grow-1 overflow-auto">
                        <div className="container-fluid p-4">
                            {/* This renders the child route elements OR passed children */}
                            {children || <Outlet />}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Chatbot for Roles */}
            <AskMeAI />
        </div>
    );
};


export default DashboardLayout;
