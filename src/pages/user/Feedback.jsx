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
            <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="card-body p-5">
                        <div className="text-center mb-5">
                            <h2 className="fw-800 text-dark mb-2">We value your feedback! 🚀</h2>
                            <p className="text-muted">Help us improve the Future Invo HRMS experience. Your ideas matter.</p>
                        </div>

                        {/* Rating Section */}
                        <div className="mb-5">
                            <h5 className="fw-bold mb-4 text-center">How was your experience today?</h5>
                            <div className="d-flex justify-content-center gap-4">
                                {[
                                    { id: 'bad', icon: <FaRegFrown size={48} />, label: 'Needs Help', color: '#ef4444' },
                                    { id: 'okay', icon: <FaRegMeh size={48} />, label: 'It\'s Okay', color: '#f59e0b' },
                                    { id: 'good', icon: <FaRegSmile size={48} />, label: 'Loved it!', color: '#10b981' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setRating(item.id)}
                                        className="btn border-0 p-0 transition-transform"
                                        style={{
                                            transform: rating === item.id ? 'scale(1.2)' : 'scale(1)',
                                            color: rating === item.id ? item.color : '#e2e8f0',
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <div className="d-flex flex-column align-items-center gap-2">
                                            {item.icon}
                                            <span className="small fw-bold" style={{ color: rating === item.id ? item.color : '#94a3b8' }}>{item.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Toggle */}
                        <div className="mb-5 text-center">
                            <h5 className="fw-bold mb-3">What are you giving feedback on?</h5>
                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategory(cat.id)}
                                        className={`btn btn-sm px-4 py-2 rounded-pill fw-600 transition-all ${category === cat.id ? 'btn-primary' : 'btn-light border'}`}
                                    >
                                        <span className="me-2">{cat.icon}</span> {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Feedback */}
                        <div className="mb-5">
                            <h5 className="fw-bold mb-3">Tell us more...</h5>
                            <textarea
                                className="form-control rounded-4 p-4 border-light shadow-sm bg-light"
                                rows="5"
                                placeholder="Share your suggestions, report a bug, or just say hello! We're listening..."
                                style={{ fontSize: '0.95rem' }}
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="text-center">
                            <button className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg d-inline-flex align-items-center gap-3">
                                <FaPaperPlane /> Send Feedback
                            </button>
                            <p className="small text-muted mt-3">By submitting, you agree to our terms of service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Feedback;
