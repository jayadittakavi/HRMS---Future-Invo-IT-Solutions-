import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaMoneyCheckAlt, FaFileInvoiceDollar, FaCalculator, FaUniversity } from 'react-icons/fa';

const PayrollInfo = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1 pt-5">
                <div className="bg-success text-white py-5 mb-5">
                    <div className="container py-5 text-center">
                        <h1 className="display-4 fw-bold mb-3">Payroll & Compensation</h1>
                        <p className="lead opacity-75 mb-0 max-w-2xl mx-auto">Error-free payroll processing and statutory compliance.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <p className="lead text-secondary mb-5">
                                Automate your payroll calculations, payslip generation, and tax filings. Ensure timely payments and happy employees.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mt-4">
                        {[
                            { icon: <FaCalculator />, title: "Auto-Calculation", desc: "Calculate earnings, deductions, and taxes instantly." },
                            { icon: <FaFileInvoiceDollar />, title: "Payslip Generation", desc: "One-click payslip generation and email distribution." },
                            { icon: <FaUniversity />, title: "Direct Deposit", desc: "Integrate with banks for direct salary transfers." },
                            { icon: <FaMoneyCheckAlt />, title: "Expense Reimbursement", desc: "Manage and approve employee expense claims." }
                        ].map((item, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                    <div className="display-6 text-success mb-3">{item.icon}</div>
                                    <h5 className="fw-bold">{item.title}</h5>
                                    <p className="text-secondary small">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PayrollInfo;
