import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import './DashboardLayout.css'; // Keeping for specific layout tweaks not covered by Bootstrap utils if needed, or remove if fully bootstrap

const DashboardLayout = ({ children, title, onNavigate }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="d-flex vh-100 glass-dashboard-bg overflow-hidden">
            {/* Sidebar Wrapper */}
            <div className={`glass-sidebar-wrapper transition-all ${isSidebarOpen ? 'd-block' : 'd-none d-md-block'}`} style={{ width: isSidebarOpen ? '280px' : '0', overflow: 'hidden', transition: 'width 0.3s' }}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onNavigate={onNavigate} />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden">
                <DashboardHeader title={title} toggleSidebar={toggleSidebar} />

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
