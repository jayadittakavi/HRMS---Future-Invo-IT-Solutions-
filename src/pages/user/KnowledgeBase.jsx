import React from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaSearch, FaBookOpen, FaQuestionCircle, FaLightbulb, FaTools, FaShieldAlt, FaChevronRight } from 'react-icons/fa';

const KnowledgeBase = () => {
    const categories = [
        { title: 'Getting Started', icon: <FaLightbulb size={24} color="#3b82f6" />, bg: '#eff6ff', articles: 12 },
        { title: 'Attendance & Leave', icon: <FaBookOpen size={24} color="#10b981" />, bg: '#f0fdf4', articles: 8 },
        { title: 'Payroll & Taxes', icon: <FaTools size={24} color="#f59e0b" />, bg: '#fffbeb', articles: 15 },
        { title: 'Security & Privacy', icon: <FaShieldAlt size={24} color="#ef4444" />, bg: '#fef2f2', articles: 6 },
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
            <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Search Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    borderRadius: '24px',
                    padding: '60px 24px',
                    textAlign: 'center',
                    marginBottom: '48px',
                    color: '#fff',
                    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
                }}>
                    <h1 style={{ fontWeight: 800, marginBottom: '16px' }}>How can we help you?</h1>
                    <p style={{ opacity: 0.9, marginBottom: '32px', fontSize: '1.1rem' }}>Search our knowledge base for quick answers and guides.</p>
                    <div className="position-relative mx-auto" style={{ maxWidth: '600px' }}>
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-4 text-muted" size={18} />
                        <input
                            type="text"
                            className="form-control form-control-lg rounded-pill ps-5 border-0 shadow"
                            placeholder="Type keywords like 'leave', 'payroll', 'login'..."
                            style={{ padding: '16px 24px 16px 64px', fontSize: '1.05rem' }}
                        />
                    </div>
                </div>

                {/* Categories */}
                <h4 className="fw-bold mb-4">Browse Categories</h4>
                <div className="row g-4 mb-5">
                    {categories.map((cat, i) => (
                        <div key={i} className="col-md-3">
                            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center transition-hover" style={{ cursor: 'pointer' }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '16px',
                                    background: cat.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px'
                                }}>
                                    {cat.icon}
                                </div>
                                <h5 className="fw-bold mb-1">{cat.title}</h5>
                                <p className="text-muted small mb-0">{cat.articles} articles</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ & Popular */}
                <div className="row g-5">
                    <div className="col-md-7">
                        <h4 className="fw-bold mb-4">Popular Articles</h4>
                        <div className="d-flex flex-column gap-3">
                            {popularArticles.map((art, i) => (
                                <div key={i} className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row justify-content-between align-items-center transition-hover" style={{ cursor: 'pointer' }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-light p-2"><FaQuestionCircle className="text-primary" /></div>
                                        <span className="fw-600 text-dark">{art}</span>
                                    </div>
                                    <FaChevronRight className="text-muted" size={12} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card border-0 shadow-sm rounded-4 p-4 h-100" style={{ background: '#f8fafc' }}>
                            <h4 className="fw-bold mb-3">Still need help?</h4>
                            <p className="text-muted mb-4">If you can't find what you're looking for, our support team is available to assist you.</p>
                            <button className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm">Contact Support</button>
                            <div className="mt-4 pt-4 border-top">
                                <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
                                    <span style={{ fontSize: '1.2rem' }}>📞</span> <span>+1 (234) 567-890</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 text-muted small">
                                    <span style={{ fontSize: '1.2rem' }}>📧</span> <span>support@futureinvo.com</span>
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
