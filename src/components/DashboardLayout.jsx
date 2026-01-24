import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './DashboardLayout.css'; // Keeping for specific layout tweaks not covered by Bootstrap utils if needed, or remove if fully bootstrap

const DashboardLayout = ({ children, title, onNavigate, bgImage }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="d-flex vh-100 glass-dashboard-bg overflow-hidden position-relative">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar Wrapper */}
            <div className={`glass-sidebar-wrapper transition-all ${isSidebarOpen ? 'd-block' : 'd-none d-md-block'}`} style={{ width: isSidebarOpen ? '280px' : '0', overflow: 'hidden', transition: 'width 0.3s' }}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onNavigate={(path) => {
                    if (window.innerWidth < 768) {
                        setIsSidebarOpen(false);
                    }
                    if (onNavigate) onNavigate(path);
                }} />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden">
                <Navbar toggleSidebar={toggleSidebar} hideLogo={true} />

                {/* Scrollable Content Area */}
                <div className="flex-grow-1 overflow-auto p-4">
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
