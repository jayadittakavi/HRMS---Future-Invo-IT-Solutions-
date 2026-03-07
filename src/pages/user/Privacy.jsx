import React from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaShieldAlt, FaUserShield, FaServer, FaLock, FaCookieBite, FaFileContract } from 'react-icons/fa';

const Privacy = () => {
    const sections = [
        {
            title: 'Data Collection',
            icon: <FaUserShield size={20} color="#3b82f6" />,
            content: "We collect minimal necessary personal data including your contact information, employment details, and system usage logs to provide HRMS services effectively."
        },
        {
            title: 'Security Measures',
            icon: <FaLock size={20} color="#10b981" />,
            content: "All data is encrypted in transit and at rest using industry-standard protocols. We conduct regular security audits to ensure your information remains protected."
        },
        {
            title: 'Third-party Sharing',
            icon: <FaShieldAlt size={20} color="#f59e0b" />,
            content: "We do not sell your personal data. Sharing only occurs with authorized service providers (like payroll processors) necessary for HR operations."
        },
        {
            title: 'Data Storage',
            icon: <FaServer size={20} color="#8b5cf6" />,
            content: "Data is stored on secure cloud servers located in multiple regions to ensure high availability and disaster recovery compliance."
        },
        {
            title: 'Cookies Policy',
            icon: <FaCookieBite size={20} color="#ec4899" />,
            content: "Our system uses session cookies only to maintain your authenticated session and personalize your user experience."
        }
    ];

    return (
        <DashboardLayout title="Privacy Policy">
            <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div style={{
                        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                        padding: '40px 30px',
                        color: '#fff'
                    }}>
                        <div className="d-flex align-items-center gap-3 mb-2">
                            <FaFileContract size={28} />
                            <h2 className="mb-0 fw-bold">Privacy & Data Governance</h2>
                        </div>
                        <p className="opacity-75 mb-0">Last updated: March 1, 2026. Empowering you with data transparency.</p>
                    </div>

                    <div className="card-body p-4 pt-5">
                        <div className="alert alert-info border-0 rounded-4 d-flex align-items-center gap-3 mb-5" style={{ background: '#f0f9ff', color: '#0369a1' }}>
                            <FaShieldAlt size={24} className="flex-shrink-0" />
                            <div className="small">
                                <strong>Your Privacy Matters:</strong> Future Invo IT Solutions is committed to protecting your personal information and being transparent about how we use it.
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-5">
                            {sections.map((section, i) => (
                                <div key={i} className="row g-0">
                                    <div className="col-md-4 mb-3 mb-md-0">
                                        <div className="d-flex align-items-center gap-3">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: '#f8fafc',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid #e2e8f0'
                                            }}>
                                                {section.icon}
                                            </div>
                                            <h5 className="fw-bold mb-0 text-dark">{section.title}</h5>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <p className="text-secondary leading-relaxed mb-0" style={{ fontSize: '0.95rem' }}>
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 pt-5 border-top">
                            <p className="text-muted small text-center">
                                For detailed information or specific inquiries about your data, please contact our Data Protection Office at
                                <a href="mailto:privacy@futureinvo.com" className="ms-1 fw-600 text-primary">privacy@futureinvo.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Privacy;
