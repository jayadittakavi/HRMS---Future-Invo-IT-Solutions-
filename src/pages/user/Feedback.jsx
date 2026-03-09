import React, { useState } from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaRegSmile, FaRegMeh, FaRegFrown, FaPaperPlane, FaUserGraduate, FaBusinessTime, FaTools, FaMagic } from 'react-icons/fa';

const Feedback = () => {
    const [rating, setRating] = useState(null);
    const [category, setCategory] = useState('');

    const categories = [
        { id: 'ui', label: 'User Interface', icon: <FaMagic /> },
        { id: 'performance', label: 'Performance', icon: <FaBusinessTime /> },
        { id: 'features', label: 'Features', icon: <FaTools /> },
        { id: 'usability', label: 'Usability', icon: <FaUserGraduate /> },
    ];

    return (
        <DashboardLayout title="Give Feedback">
            <div style={{ padding: '48px 24px', maxWidth: '900px', margin: '0 auto' }}>
                <div className="card shadow-lg rounded-4 overflow-hidden border-0"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)'
                    }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                        padding: '60px 40px',
                        color: '#fff',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: '-50%', left: '-20%', width: '400px', height: '400px',
                            background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', filter: 'blur(80px)'
                        }}></div>

                        <h2 style={{ fontWeight: 800, marginBottom: '12px', fontSize: '2.5rem', letterSpacing: '-0.02em' }}>We value your feedback! 🚀</h2>
                        <p style={{ opacity: 0.9, marginBottom: 0, fontSize: '1.1rem', fontWeight: 500 }}>Help us improve the Future Invo HRMS experience. Your ideas matter.</p>
                    </div>

                    <div className="card-body p-5">
                        {/* Rating Section */}
                        <div className="mb-5 pb-4 border-bottom border-light">
                            <h5 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '32px', textAlign: 'center' }}>How was your experience today?</h5>
                            <div className="d-flex justify-content-center gap-5">
                                {[
                                    { id: 'bad', icon: <FaRegFrown size={54} />, label: 'Needs Help', color: '#ef4444' },
                                    { id: 'okay', icon: <FaRegMeh size={54} />, label: "It's Okay", color: '#f59e0b' },
                                    { id: 'good', icon: <FaRegSmile size={54} />, label: 'Loved it!', color: '#10b981' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setRating(item.id)}
                                        className="btn border-0 p-0 transition-all"
                                        style={{
                                            transform: rating === item.id ? 'scale(1.25) translateY(-5px)' : 'scale(1)',
                                            color: rating === item.id ? item.color : '#cbd5e1',
                                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                        }}
                                    >
                                        <div className="d-flex flex-column align-items-center gap-3">
                                            {item.icon}
                                            <span style={{
                                                fontSize: '0.85rem',
                                                fontWeight: 800,
                                                color: rating === item.id ? item.color : '#94a3b8',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}>{item.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Toggle */}
                        <div className="mb-5 text-center">
                            <h5 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>What are you giving feedback on?</h5>
                            <div className="d-flex flex-wrap justify-content-center gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategory(cat.id)}
                                        className="btn px-4 py-3 rounded-xl fw-bold transition-all border-0 shadow-sm"
                                        style={{
                                            background: category === cat.id ? '#818cf8' : 'white',
                                            color: category === cat.id ? 'white' : '#64748b',
                                            borderRadius: '16px',
                                            border: category === cat.id ? 'none' : '1px solid rgba(129, 140, 248, 0.2)'
                                        }}
                                    >
                                        <span className="me-2">{cat.icon}</span> {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Feedback */}
                        <div className="mb-5">
                            <h5 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Tell us more...</h5>
                            <textarea
                                className="form-control p-4 border-0 shadow-sm"
                                rows="5"
                                placeholder="Share your suggestions, report a bug, or just say hello! We're listening..."
                                style={{
                                    fontSize: '1rem',
                                    borderRadius: '24px',
                                    background: 'rgba(248, 250, 252, 0.8)',
                                    color: '#0f172a',
                                    resize: 'none',
                                    border: '1px solid rgba(129, 140, 248, 0.1)'
                                }}
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="text-center">
                            <button className="btn px-5 py-4 border-0 shadow-lg d-inline-flex align-items-center gap-3"
                                style={{
                                    background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                                    color: 'white',
                                    borderRadius: '20px',
                                    fontWeight: 800,
                                    fontSize: '1.1rem'
                                }}>
                                <FaPaperPlane /> Send Feedback
                            </button>
                            <p className="small text-muted mt-4 font-italic">By submitting, you agree to enable improved experience for all users.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Feedback;
