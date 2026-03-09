import React from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaShieldAlt, FaUserShield, FaServer, FaLock, FaCookieBite, FaFileContract } from 'react-icons/fa';

const Privacy = () => {
    const sections = [
        {
            title: 'Data Collection',
            icon: <FaUserShield />,
            bg: 'rgba(129, 140, 248, 0.1)',
            color: '#818cf8',
            content: "We collect minimal necessary personal data including your contact information, employment details, and system usage logs to provide HRMS services effectively."
        },
        {
            title: 'Security Measures',
            icon: <FaLock />,
            bg: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            content: "All data is encrypted in transit and at rest using industry-standard protocols. We conduct regular security audits to ensure your information remains protected."
        },
        {
            title: 'Third-party Sharing',
            icon: <FaShieldAlt />,
            bg: 'rgba(245, 158, 11, 0.1)',
            color: '#f59e0b',
            content: "We do not sell your personal data. Sharing only occurs with authorized service providers (like payroll processors) necessary for HR operations."
        },
        {
            title: 'Data Storage',
            icon: <FaServer />,
            bg: 'rgba(139, 92, 246, 0.1)',
            color: '#8b5cf6',
            content: "Data is stored on secure cloud servers located in multiple regions to ensure high availability and disaster recovery compliance."
        },
        {
            title: 'Cookies Policy',
            icon: <FaCookieBite />,
            bg: 'rgba(236, 72, 153, 0.1)',
            color: '#ec4899',
            content: "Our system uses session cookies only to maintain your authenticated session and personalize your user experience."
        }
    ];

    return (
        <DashboardLayout title="Privacy Policy">
            <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>
                <div className="card shadow-lg rounded-4 overflow-hidden border-0"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)'
                    }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                        padding: '60px 40px',
                        color: '#fff',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px',
                            background: 'rgba(129, 140, 248, 0.15)', borderRadius: '50%', filter: 'blur(60px)'
                        }}></div>

                        <div className="d-flex align-items-center gap-4 mb-3">
                            <div style={{
                                width: '64px', height: '64px', borderRadius: '18px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <FaFileContract />
                            </div>
                            <div>
                                <h1 style={{ fontWeight: 800, marginBottom: '5px', fontSize: '2.25rem', letterSpacing: '-0.02em' }}>Privacy & Data Governance</h1>
                                <p style={{ opacity: 0.7, marginBottom: 0, fontWeight: 500 }}>Last updated: March 1, 2026 • Secure & Transparent</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-body p-5">
                        <div className="alert border-0 rounded-4 d-flex align-items-start gap-3 mb-5 p-4"
                            style={{ background: 'rgba(129, 140, 248, 0.08)', color: '#1e1b4b' }}>
                            <FaShieldAlt size={28} style={{ color: '#818cf8', marginTop: '3px' }} className="flex-shrink-0" />
                            <div>
                                <h6 style={{ fontWeight: 800, marginBottom: '4px' }}>Our Privacy Commitment</h6>
                                <div style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.6 }}>
                                    Future Invo IT Solutions is strictly committed to protecting your personal information. We maintain high standards of data integrity and transparency in all our HRMS operations.
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-5">
                            {sections.map((section, i) => (
                                <div key={i} className="row g-4 align-items-start">
                                    <div className="col-lg-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div style={{
                                                width: '52px', height: '52px', borderRadius: '14px',
                                                background: section.bg, color: section.color,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '1.4rem'
                                            }}>
                                                {section.icon}
                                            </div>
                                            <h5 style={{ fontWeight: 800, color: '#0f172a', marginBottom: 0 }}>{section.title}</h5>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div style={{
                                            background: 'rgba(248, 250, 252, 0.5)',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            color: '#475569',
                                            lineHeight: 1.7,
                                            fontSize: '1rem',
                                            border: '1px solid rgba(226, 232, 240, 0.6)'
                                        }}>
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 pt-5 border-top border-light text-center">
                            <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
                                For detailed information or specific inquiries about your data rights, please contact our Data Protection Office at:
                                <br />
                                <a href="mailto:privacy@futureinvo.com"
                                    style={{ color: '#818cf8', fontWeight: 700, textDecoration: 'none', display: 'inline-block', marginTop: '8px' }}>
                                    privacy@futureinvo.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Privacy;
