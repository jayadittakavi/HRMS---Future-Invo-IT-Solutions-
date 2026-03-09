import React from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaSearch, FaBookOpen, FaQuestionCircle, FaLightbulb, FaTools, FaShieldAlt, FaChevronRight } from 'react-icons/fa';

const KnowledgeBase = () => {
    const categories = [
        { title: 'Getting Started', icon: <FaLightbulb />, bg: 'rgba(129, 140, 248, 0.1)', color: '#818cf8', articles: 12 },
        { title: 'Attendance & Leave', icon: <FaBookOpen />, bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', articles: 8 },
        { title: 'Payroll & Taxes', icon: <FaTools />, bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', articles: 15 },
        { title: 'Security & Privacy', icon: <FaShieldAlt />, bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', articles: 6 },
    ];

    const popularArticles = [
        'How to apply for sick leave?',
        'Understanding your salary structure',
        'Troubleshooting login issues',
        'How to update personal information?',
        'Company policies overview',
    ];

    return (
        <DashboardLayout title="Knowledge Base">
            <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
                {/* Search Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                    borderRadius: '32px',
                    padding: '80px 24px',
                    textAlign: 'center',
                    marginBottom: '56px',
                    color: '#fff',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px',
                        background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', filter: 'blur(60px)'
                    }}></div>

                    <h1 style={{ fontWeight: 800, marginBottom: '16px', fontSize: '3rem', letterSpacing: '-0.03em' }}>How can we help you?</h1>
                    <p style={{ opacity: 0.9, marginBottom: '40px', fontSize: '1.2rem', fontWeight: 500 }}>Search our knowledge base for quick answers and guides.</p>
                    <div className="position-relative mx-auto" style={{ maxWidth: '650px' }}>
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-4 text-muted opacity-50" size={20} />
                        <input
                            type="text"
                            className="form-control form-control-lg rounded-pill ps-5 border-0 shadow-lg"
                            placeholder="Type keywords like 'leave', 'payroll', 'login'..."
                            style={{ padding: '20px 24px 20px 72px', fontSize: '1.1rem', background: 'rgba(255, 255, 255, 0.95)' }}
                        />
                    </div>
                </div>

                {/* Categories */}
                <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '24px', fontSize: '1.5rem' }}>Browse Categories</h4>
                <div className="row g-4 mb-5 pb-4">
                    {categories.map((cat, i) => (
                        <div key={i} className="col-md-3">
                            <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4 transition-all"
                                style={{
                                    cursor: 'pointer',
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.03)';
                                }}
                            >
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '20px',
                                    background: cat.bg, color: cat.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 20px', fontSize: '2rem'
                                }}>
                                    {cat.icon}
                                </div>
                                <h5 style={{ fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>{cat.title}</h5>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>{cat.articles} Articles</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ & Popular */}
                <div className="row g-5">
                    <div className="col-md-7">
                        <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '24px', fontSize: '1.5rem' }}>Popular Articles</h4>
                        <div className="d-flex flex-column gap-3">
                            {popularArticles.map((art, i) => (
                                <div key={i} className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row justify-content-between align-items-center transition-all"
                                    style={{
                                        cursor: 'pointer',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        border: '1px solid rgba(255, 255, 255, 0.6)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle p-2" style={{ background: 'rgba(129, 140, 248, 0.1)', color: '#818cf8' }}>
                                            <FaQuestionCircle size={20} />
                                        </div>
                                        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem' }}>{art}</span>
                                    </div>
                                    <FaChevronRight style={{ color: '#818cf8' }} size={14} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card h-100 border-0 shadow-lg rounded-4 p-5 overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                                color: 'white',
                                position: 'relative'
                            }}>
                            <div style={{
                                position: 'absolute', bottom: '-20%', left: '-10%', width: '200px', height: '200px',
                                background: 'rgba(129, 140, 248, 0.2)', borderRadius: '50%', filter: 'blur(40px)'
                            }}></div>

                            <h3 style={{ fontWeight: 800, marginBottom: '16px', fontSize: '1.75rem' }}>Still need help?</h3>
                            <p style={{ opacity: 0.8, marginBottom: '40px', fontSize: '1.05rem', lineHeight: 1.6 }}>Our dedicated support team is ready to assist you with any questions or technical challenges.</p>
                            <button className="btn w-100 rounded-pill py-3 fw-bold shadow-lg border-0"
                                style={{
                                    background: 'white', color: '#4c1d95',
                                    fontSize: '1.1rem'
                                }}>
                                Contact Support Team
                            </button>

                            <div className="mt-5 pt-4 border-top border-secondary border-opacity-25">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="fs-4">📞</div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase' }}>Phone Support</div>
                                        <div style={{ fontWeight: 700 }}>+1 (234) 567-890</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="fs-4">📧</div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase' }}>Email Support</div>
                                        <div style={{ fontWeight: 700 }}>support@futureinvo.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default KnowledgeBase;
