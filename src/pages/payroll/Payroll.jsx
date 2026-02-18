import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {
    FaDollarSign, FaFileInvoiceDollar, FaFileAlt, FaMoneyCheckAlt,
    FaFileContract, FaChartLine, FaEnvelope
} from 'react-icons/fa';

// Import tab components
import SalaryUI from './tabs/SalaryUI';
import PayrollDashboard from './tabs/PayrollDashboard';
import StatutoryUI from './tabs/StatutoryUI';
import PayslipUI from './tabs/PayslipUI';
import Form16UI from './tabs/Form16UI';
import FandFUI from './tabs/FandFUI';
import LetterUI from './tabs/LetterUI';
import ReportsUI from './tabs/ReportsUI';

export const PayrollContent = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
        { id: 'salary', label: 'Salary', icon: <FaDollarSign /> },
        { id: 'statutory', label: 'Statutory', icon: <FaFileContract /> },
        { id: 'payslip', label: 'Payslip', icon: <FaFileInvoiceDollar /> },
        { id: 'form16', label: 'Form-16', icon: <FaFileAlt /> },
        { id: 'fandf', label: 'F&F', icon: <FaMoneyCheckAlt /> },
        { id: 'letter', label: 'Letter', icon: <FaEnvelope /> },
        { id: 'reports', label: 'Reports', icon: <FaChartLine /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <PayrollDashboard />;
            case 'salary': return <SalaryUI />;
            case 'statutory': return <StatutoryUI />;
            case 'payslip': return <PayslipUI />;
            case 'form16': return <Form16UI />;
            case 'fandf': return <FandFUI />;
            case 'letter': return <LetterUI />;
            case 'reports': return <ReportsUI />;
            default: return <PayrollDashboard />;
        }
    };

    return (
        <div className="payroll-content p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
                <h4 className="fw-bold text-dark m-0">Payroll Management</h4>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-4" style={{ overflowX: 'auto' }}>
                <ul className="nav nav-pills bg-white p-2 rounded shadow-sm d-inline-flex" style={{ gap: '8px', flexWrap: 'nowrap' }}>
                    {tabs.map(tab => (
                        <li className="nav-item" key={tab.id}>
                            <button
                                className={`nav-link fw-bold ${activeTab === tab.id ? 'active bg-primary' : 'text-secondary'}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {tab.icon && <span className="me-2">{tab.icon}</span>}
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content Area */}
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

const Payroll = () => {
    return (
        <DashboardLayout title="">
            <PayrollContent />
        </DashboardLayout>
    );
};

export default Payroll;
