import React, { useState } from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaRegSmile, FaRegMeh, FaRegFrown, FaPaperPlane, FaUserGraduate, FaBusinessTime, FaTools, FaMagic, FaList, FaChevronRight } from 'react-icons/fa';
import { feedbackService } from '../../services/feedbackService';
import { useAuth } from '../../context/AuthContext';

const Feedback = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'employee';
    const isAdminRole = ['superadmin', 'admin', 'hr'].includes(role);

    const [activeTab, setActiveTab] = useState('submit'); // 'submit' or 'list'
    const [rating, setRating] = useState(null);
    const [category, setCategory] = useState('');
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(false);

    // List State
    const [feedbackList, setFeedbackList] = useState([]);

    const categories = [
        { id: 'User Interface', label: 'User Interface', icon: <FaMagic /> },
        { id: 'Performance', label: 'Performance', icon: <FaBusinessTime /> },
        { id: 'Features', label: 'Features', icon: <FaTools /> },
        { id: 'Usability', label: 'Usability', icon: <FaUserGraduate /> },
    ];

    const fetchList = async () => {
        setLoading(true);
        try {
            const data = await feedbackService.getFeedbackList();
            setFeedbackList(data);
        } catch (err) {
            console.error("Fetch list failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!rating || !category || !comments) {
            alert("Please complete all sections of the feedback form.");
            return;
        }

        const ratingLabels = {
            'bad': 'Needs Help',
            'okay': "It's Okay",
            'good': 'Loved It!'
        };

        setLoading(true);
        try {
            await feedbackService.submitFeedback({
                rating: ratingLabels[rating],
                category: category,
                comments: comments
            });
            alert("Feedback sent successfully! Thank you for your input.");
            setRating(null);
            setCategory('');
            setComments('');
        } catch (err) {
            alert("Failed to send feedback: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout title="Feedback & Experience">
            <div style={{ padding: '0px 24px 48px', maxWidth: '1000px', margin: '0 auto' }}>
                {isAdminRole && (
                    <div className="d-flex justify-content-center mb-4 pt-4">
                        <div className="btn-group bg-white p-1 rounded-pill shadow-sm">
                            <button
                                className={`btn rounded-pill px-4 py-2 border-0 ${activeTab === 'submit' ? 'bg-primary text-white shadow-sm' : 'text-secondary'}`}
                                onClick={() => setActiveTab('submit')}
                            >
                                <FaPaperPlane className="me-2" /> Submit Feedback
                            </button>
                            <button
                                className={`btn rounded-pill px-4 py-2 border-0 ${activeTab === 'list' ? 'bg-primary text-white shadow-sm' : 'text-secondary'}`}
                                onClick={() => {
                                    setActiveTab('list');
                                    fetchList();
                                }}
                            >
                                <FaList className="me-2" /> Feedback List (Admin)
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'submit' ? (
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
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
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
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="btn px-5 py-4 border-0 shadow-lg d-inline-flex align-items-center gap-3 transition-all"
                                style={{
                                    background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                                    color: 'white',
                                    borderRadius: '20px',
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    opacity: loading ? 0.7 : 1
                                }}>
                                <FaPaperPlane /> {loading ? 'Sending...' : 'Send Feedback'}
                            </button>
                            <p className="small text-muted mt-4 font-italic">By submitting, you agree to enable improved experience for all users.</p>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="card shadow-lg rounded-4 overflow-hidden border-0"
                        style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(15px)' }}>
                        <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center">
                            <h4 className="m-0 fw-bold">Company Feedback Submissions</h4>
                            <button className="btn btn-sm btn-white text-primary fw-bold" onClick={fetchList}>Refresh List</button>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table hover-bg-light mb-0">
                                    <thead className="bg-light">
                                        <tr className="small text-muted">
                                            <th className="px-4 py-3 border-0">USER / DATE</th>
                                            <th className="py-3 border-0">RATING</th>
                                            <th className="py-3 border-0">CATEGORY</th>
                                            <th className="py-3 border-0">COMMENTS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feedbackList.length > 0 ? feedbackList.map((fb, idx) => (
                                            <tr key={idx} className="border-bottom-light">
                                                <td className="px-4 py-4">
                                                    <div className="fw-bold">{fb.user_name || 'Anonymous'}</div>
                                                    <small className="text-secondary">{fb.createdAt?.split('T')[0] || fb.date}</small>
                                                </td>
                                                <td className="py-4">
                                                    <span className={`badge rounded-pill px-3 py-2 ${fb.rating === 'Loved it!' ? 'bg-success-subtle text-success' : fb.rating === "It's Okay" ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}`}>
                                                        {fb.rating}
                                                    </span>
                                                </td>
                                                <td className="py-4 fw-medium text-dark-blue">{fb.category}</td>
                                                <td className="py-4 text-secondary small" style={{ maxWidth: '300px' }}>{fb.comments}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-5 text-muted">No feedback records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Feedback;
