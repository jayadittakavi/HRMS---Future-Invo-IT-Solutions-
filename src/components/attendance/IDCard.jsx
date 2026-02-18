import React, { useState } from 'react';
import { FaBuilding, FaUserCircle, FaTint, FaCalendarAlt, FaPhoneAlt, FaIdBadge } from 'react-icons/fa';
import fisLogo from '../../assets/images/fislogo1.png';

const IDCard = ({ employee }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    if (!employee) return null;

    const frontStyle = {
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        borderRadius: '16px',
        width: '320px',
        height: '450px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        overflow: 'hidden'
    };

    const backStyle = {
        background: '#ffffff',
        color: '#333',
        borderRadius: '16px',
        width: '320px',
        height: '450px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        border: '1px solid #e0e0e0'
    };

    // Placeholder QR Code (could be real if generated)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${employee.employee_code}`;

    return (
        <div
            className="id-card-container position-relative"
            style={{ perspective: '1000px', width: '320px', height: '450px', cursor: 'pointer' }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className="id-card-inner position-relative w-100 h-100"
                style={{
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'none'
                }}>

                {/* --- FRONT SIDE --- */}
                <div className="id-card-front position-absolute w-100 h-100"
                    style={{ backfaceVisibility: 'hidden', ...frontStyle }}>

                    {/* Decorative Header Pattern */}
                    <div className="position-absolute top-0 start-0 w-100 h-25 bg-white opacity-10"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}></div>

                    {/* Logo Area */}
                    <div className="mb-4 mt-2 bg-white rounded-pill px-3 py-1 shadow-sm d-flex align-items-center gap-2">
                        <img src={fisLogo} alt="Logo" style={{ height: '30px' }} />
                        <span className="fw-bold text-dark small text-uppercase spacing-1">Future Invo</span>
                    </div>

                    {/* Photo */}
                    <div className="rounded-circle border-4 border-white shadow mb-3 position-relative overflow-hidden"
                        style={{ width: '130px', height: '130px', background: '#f8f9fa' }}>
                        {employee.photo ? (
                            <img src={employee.photo} alt={employee.name} className="w-100 h-100 object-fit-cover" />
                        ) : (
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center text-secondary">
                                <FaUserCircle size={80} />
                            </div>
                        )}
                    </div>

                    {/* Name & ID */}
                    <h4 className="fw-bold mb-1 text-center text-truncate w-100 px-2">{employee.name}</h4>
                    <span className="badge bg-white text-primary mb-3 bg-opacity-90 px-3 py-1 shadow-sm">
                        {employee.employee_code}
                    </span>

                    {/* Details */}
                    <div className="mt-auto w-100 text-center pb-4">
                        <div className="mb-2">
                            <small className="text-white-50 text-uppercase d-block mb-1" style={{ fontSize: '0.7rem' }}>Designation</small>
                            <span className="fw-bold d-block">{employee.designation || 'N/A'}</span>
                        </div>
                        <div>
                            <small className="text-white-50 text-uppercase d-block mb-1" style={{ fontSize: '0.7rem' }}>Department</small>
                            <span className="fw-bold d-block">{employee.department || 'N/A'}</span>
                        </div>
                    </div>

                    <small className="position-absolute bottom-0 mb-3 text-white-50" style={{ fontSize: '0.7rem' }}>Tap/Click to flip</small>
                </div>

                {/* --- BACK SIDE --- */}
                <div className="id-card-back position-absolute w-100 h-100 bg-white"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', ...backStyle }}>

                    <div className="w-100 text-center border-bottom pb-3 mb-4">
                        <h6 className="fw-bold text-uppercase text-secondary m-0">Employee Details</h6>
                    </div>

                    <div className="w-100 px-3">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-light p-2 rounded-circle me-3 text-danger"><FaTint /></div>
                            <div>
                                <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Blood Group</small>
                                <span className="fw-bold text-dark">{employee.blood_group || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-light p-2 rounded-circle me-3 text-primary"><FaCalendarAlt /></div>
                            <div>
                                <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Date of Joining</small>
                                <span className="fw-bold text-dark">{employee.joining_date || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-light p-2 rounded-circle me-3 text-success"><FaPhoneAlt /></div>
                            <div>
                                <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Emergency Contact</small>
                                <span className="fw-bold text-dark">{employee.emergency_contact || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto mb-4 text-center">
                        <div className="bg-white p-2 rounded shadow-sm border d-inline-block">
                            <img src={qrCodeUrl} alt="QR" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <p className="small text-muted mt-2 mb-0">Scan for verification</p>
                    </div>

                    <div className="w-100 text-center border-top pt-2">
                        <small className="text-muted" style={{ fontSize: '0.65rem' }}>
                            Future Invo IT Solutions<br />
                            Property of the company. If found, please return.
                        </small>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IDCard;
