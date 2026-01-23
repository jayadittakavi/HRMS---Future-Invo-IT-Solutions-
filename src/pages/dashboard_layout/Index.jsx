import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';
import SettingsDrawer from '../settings/SettingsDrawer';
import '../../components/DashboardLayout.css'; // Point to the main css or local if strictly needed

const DashboardLayout = ({ children, title, onNavigate }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <div className="d-flex vh-100 bg-light overflow-hidden">
            {/* Sidebar Wrapper */}
            <div className={`bg-white border-end transition-all ${isSidebarOpen ? 'd-block' : 'd-none d-md-block'}`} style={{ width: isSidebarOpen ? '280px' : '0', overflow: 'hidden', transition: 'width 0.3s' }}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onNavigate={onNavigate} />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden">
                <DashboardHeader title={title} toggleSidebar={toggleSidebar} onOpenSettings={() => setIsSettingsOpen(true)} />

                {/* Scrollable Content Area */}
                <div className="flex-grow-1 overflow-auto p-4">
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
            </div>

            {/* Global Settings Drawer */}
            <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    );
};

export default DashboardLayout;
