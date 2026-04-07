import React, { useState, useEffect } from 'react';
import { FaIdCard } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { idCardService } from '../../../services/idCardService';
import IDCard from '../../../components/attendance/IDCard';
import { attendanceService } from '../../../services/attendanceService';

const MyAttendanceList = () => {
    const { user } = useAuth();
    const [showIdCard, setShowIdCard] = useState(false);
    const [myIdCard, setMyIdCard] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const data = await attendanceService.getMyAttendance();
            setAttendanceData(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    useEffect(() => {
        if (showIdCard && !myIdCard && user) {
            // Fetch ID card for current user
            idCardService.getAllIDCards().then(cards => {
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
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                        <span className="text-muted">Fetching your attendance records...</span>
                                    </td>
                                </tr>
                            ) : attendanceData.length > 0 ? (
                                attendanceData.map(row => (
                                    <tr key={row.id}>
                                        <td className={`py-4 ps-4 fw-bold ${getStatusStyle(row.status || 'Present')}`}>{row.status || 'Present'}</td>
                                        <td className="py-4 text-secondary">{row.loggedTime || row.total_hours || '0.00'}</td>
                                        <td className="py-4 text-secondary">{row.loginAt || row.check_in || '--:--'}</td>
                                        <td className="py-4 text-secondary">{row.logoutAt || row.check_out || '--:--'}</td>
                                        <td className="py-4 pe-4 text-secondary">{row.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        No attendance records found for this period.
                                    </td>
                                </tr>
                            )}
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
