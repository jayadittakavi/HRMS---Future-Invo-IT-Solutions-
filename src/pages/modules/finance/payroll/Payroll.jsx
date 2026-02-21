import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";
import DashboardTab from './tabs/DashboardTab';
import SalaryTab from './tabs/SalaryTab';
import StatutoryTab from './tabs/StatutoryTab';
import PayslipsTab from './tabs/PayslipsTab';
import Form16Tab from './tabs/Form16Tab';
import FullAndFinalTab from './tabs/FullAndFinalTab';
import LettersTab from './tabs/LettersTab';
import ReportsTab from './tabs/ReportsTab';
import { useLocation } from 'react-router-dom';

// Export PayrollContent for use in other dashboards to avoid nested layouts
export const PayrollContent = ({ personal = false }) => {
    // Determine default tab based on personal prop
    const [activeTab, setActiveTab] = useState(personal ? 'payslip' : 'dashboard');
    const location = useLocation();

    // Effect to handle initial tab if passed in state (optional)
    useEffect(() => {
        if (personal) {
            setActiveTab('payslip');
        }
    }, [personal]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardTab />;
            case 'salary':
                return <SalaryTab />;
            case 'statutory':
                return <StatutoryTab />;
            case 'payslip':
                return <PayslipsTab personal={personal} />;
            case 'form16':
                return <Form16Tab />;
            case 'fnf':
                return <FullAndFinalTab />;
            case 'letters':
                return <LettersTab />;
            case 'reports':
                return <ReportsTab />;
            default:
                return <DashboardTab />;
        }
    };

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', access: ['admin', 'hr', 'manager'] },
        { id: 'salary', label: 'Salary', access: ['all'] },
        { id: 'statutory', label: 'Statutory', access: ['admin', 'hr'] },
        { id: 'payslip', label: 'Payslips', access: ['all'] },
        { id: 'form16', label: 'Form-16', access: ['all'] },
        { id: 'fnf', label: 'F&F', access: ['admin', 'hr'] },
        { id: 'letters', label: 'Letters', access: ['admin', 'hr'] },
        { id: 'reports', label: 'Reports', access: ['admin', 'hr', 'manager'] }
    ];

    return (
        <>
            <div className="d-flex overflow-auto border-bottom mb-4">
                {tabs.map((tab) => {
                    // Simple access control logic: Usually handled better, but here we check visibility
                    // If personal mode, hide management tabs mostly.
                    if (personal && !['payslip', 'form16'].includes(tab.id)) return null;

                    return (
                        <button
                            key={tab.id}
                            className={`btn rounded-0 px-4 py-2 border-0 fw-bold ${activeTab === tab.id ? 'btn-white text-primary border-bottom border-primary border-3' : 'text-secondary'}`}
                            onClick={() => setActiveTab(tab.id)}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            <div className="tab-content py-2">
                {renderContent()}
            </div>
        </>
    );
};

const Payroll = ({ personal = false }) => {
    return (
        <DashboardLayout title={personal ? "My Payroll" : "Payroll Management"}>
            <PayrollContent personal={personal} />
        </DashboardLayout>
    );
};

export default Payroll;
