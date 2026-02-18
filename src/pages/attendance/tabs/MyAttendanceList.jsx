import React, { useState, useEffect } from 'react';
import { FaIdCard } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { idCardService } from '../../../services/idCardService';
import IDCard from '../../../components/attendance/IDCard';

const MyAttendanceList = () => {
    const { user } = useAuth();
    const [showIdCard, setShowIdCard] = useState(false);
    const [myIdCard, setMyIdCard] = useState(null);

    // Mock Attendance Data (Keep existing mock or fetch real if available)
    const attendanceData = [
        { id: 1, status: 'Present', loggedTime: '8.95', loginAt: '10:21', logoutAt: '20:18', date: '27-09-2025' },
        { id: 2, status: 'Present', loggedTime: '7.67', loginAt: '10:23', logoutAt: '19:03', date: '27-09-2025' },
        { id: 3, status: 'Present', loggedTime: '9.13', loginAt: '09:11', logoutAt: '19:19', date: '27-09-2025' },
        { id: 4, status: 'Present', loggedTime: '7.43', loginAt: '10:05', logoutAt: '18:31', date: '27-09-2025' },
        { id: 5, status: 'Present', loggedTime: '9.82', loginAt: '09:37', logoutAt: '20:26', date: '27-09-2025' },
        { id: 6, status: 'Half Day', loggedTime: '5.87', loginAt: '12:20', logoutAt: '18:12', date: '27-09-2025' },
        { id: 7, status: 'Present', loggedTime: '8.73', loginAt: '10:30', logoutAt: '20:14', date: '27-09-2025' },
    ];

    useEffect(() => {
        if (showIdCard && !myIdCard && user) {
            // Fetch ID card for current user
            // using a mock ID match since real user.id might not match mock service IDs
            // For demo, we'll Try to find one by role or just pick the first one roughly matching
            idCardService.getAllIDCards().then(cards => {
                // Try to find exact match or fallback to a demo card based on role
                const card = cards.find(c => c.user_id === user.id) ||
                    cards.find(c => c.role === user.role) ||
                    cards[0];
                setMyIdCard(card);
            });
        }
    }, [showIdCard, user, myIdCard]);

    const getStatusStyle = (status) => {
        if (status === 'Present') return 'text-success';
        if (status === 'Absent') return 'text-danger';
        if (status === 'Half Day') return 'text-warning';
        return 'text-secondary';
    };

    return (
        <div className="container-fluid p-0 bg-light min-vh-100 position-relative">
            {/* Header Actions */}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-outline-primary rounded-pill btn-sm d-flex align-items-center gap-2"
                    onClick={() => setShowIdCard(true)}
                >
                    <FaIdCard />
                    View My ID Card
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-white border-bottom">
                            <tr>
                                <th className="py-3 ps-4 text-dark fw-bold small">Attendance</th>
                                <th className="py-3 text-dark fw-bold small">Logged Time</th>
                                <th className="py-3 text-dark fw-bold small">Login At</th>
                                <th className="py-3 text-dark fw-bold small">Logout At</th>
                                <th className="py-3 pe-4 text-dark fw-bold small">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map(row => (
                                <tr key={row.id}>
                                    <td className={`py-4 ps-4 fw-bold ${getStatusStyle(row.status)}`}>{row.status}</td>
                                    <td className="py-4 text-secondary">{row.loggedTime}</td>
                                    <td className="py-4 text-secondary">{row.loginAt}</td>
                                    <td className="py-4 text-secondary">{row.logoutAt}</td>
                                    <td className="py-4 pe-4 text-secondary">{row.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Static Mock) */}
                <div className="d-flex justify-content-end align-items-center p-3 border-top text-secondary small">
                    <span className="me-3">Rows per page: 10</span>
                    <span>1-7 of 7</span>
                    <div className="btn-group ms-3">
                        <button className="btn btn-sm btn-link text-secondary text-decoration-none" disabled>&lt;</button>
                        <button className="btn btn-sm btn-link text-secondary text-decoration-none" disabled>&gt;</button>
                    </div>
                </div>
            </div>

            {/* ID Card Modal */}
            {showIdCard && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1055 }} onClick={() => setShowIdCard(false)}>
                    <div className="modal-dialog modal-dialog-centered d-flex justify-content-center">
                        <div className="position-relative" onClick={e => e.stopPropagation()}>
                            {/* Close Button styling matching the dark overlay */}
                            <button
                                className="btn btn-close btn-close-white position-absolute top-0 end-0 m-3"
                                style={{ zIndex: 10, filter: 'invert(1)' }}
                                onClick={() => setShowIdCard(false)}
                            ></button>

                            {myIdCard ? (
                                <IDCard employee={myIdCard} />
                            ) : (
                                <div className="text-white">Loading ID Card...</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default MyAttendanceList;
