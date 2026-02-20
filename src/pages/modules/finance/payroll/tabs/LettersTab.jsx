import React from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';

const LettersTab = () => {
    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Payroll Letters</h5>
                <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                    <FaEnvelopeOpenText size={12} /> Issue New Letter
                </button>
            </div>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center p-4">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-block mb-3">
                                <FaEnvelopeOpenText size={24} />
                            </div>
                            <h6 className="fw-bold">Increment Letter</h6>
                            <p className="text-muted small">Generate salary increment letters for employees.</p>
                            <button className="btn btn-outline-primary btn-sm w-100">Generate</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center p-4">
                            <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-block mb-3">
                                <FaEnvelopeOpenText size={24} />
                            </div>
                            <h6 className="fw-bold">Promotion Letter</h6>
                            <p className="text-muted small">Generate promotion and role change letters.</p>
                            <button className="btn btn-outline-success btn-sm w-100">Generate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LettersTab;
