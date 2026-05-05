import React from 'react';
import { FaMoneyCheckAlt, FaFileInvoiceDollar, FaCalculator, FaUniversity } from 'react-icons/fa';
import ModuleInfoPage from './ModuleInfoPage';

const features = [
    { icon: <FaCalculator />,         title: "Auto-Calculation",      desc: "Calculate earnings, deductions, and taxes instantly." },
    { icon: <FaFileInvoiceDollar />,  title: "Payslip Generation",    desc: "One-click payslip generation and email distribution." },
    { icon: <FaUniversity />,         title: "Direct Deposit",        desc: "Integrate with banks for direct salary transfers." },
    { icon: <FaMoneyCheckAlt />,      title: "Expense Reimbursement", desc: "Manage and approve employee expense claims." },
];

const PayrollInfo = () => (
    <ModuleInfoPage
        title="Payroll & Compensation"
        subtitle="Error-free payroll processing and statutory compliance."
        description="Automate your payroll calculations, payslip generation, and tax filings. Ensure timely payments, statutory compliance, and happy employees every month."
        features={features}
        heroIcon={<FaMoneyCheckAlt />}
    />
);

export default PayrollInfo;
