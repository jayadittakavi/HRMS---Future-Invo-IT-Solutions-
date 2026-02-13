import React, { useState } from 'react';
import { MdAdd, MdCardTravel } from 'react-icons/md';

const TravelExpenses = () => {
    const [expenses, setExpenses] = useState([
        { id: 1, type: 'Flight', desc: 'Conference Trip', amount: '$450.00', status: 'Pending', date: '2025-01-20' },
        { id: 2, type: 'Hotel', desc: 'Conference Trip - Nights', amount: '$300.00', status: 'Approved', date: '2025-01-21' },
    ]);

    return (
        <div className="container p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-bold text-dark mb-0">Travel Expenses</h2>
                <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                    <MdAdd /> New Expense
                </button>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card bg-primary text-white border-0 shadow-lg rounded-4 p-4 position-relative overflow-hidden h-100">
                        <div className="position-absolute end-0 top-0 p-3 opacity-10">
                            <MdCardTravel size={100} />
                        </div>
                        <h6 className="mb-2 text-white-50">Total Expenses (YTD)</h6>
                        <h2 className="display-6 fw-bold mb-0 text-white">$1,250.00</h2>
                    </div>
                </div>
            </div>

            <h5 className="fw-bold mb-3 text-dark">Recent Requests</h5>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <ul className="list-group list-group-flush">
                    {expenses.map(expense => (
                        <li key={expense.id} className="list-group-item p-4 border-bottom-0 d-flex justify-content-between align-items-center bg-transparent">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-light p-3 rounded-circle text-primary">
                                    <MdCardTravel size={24} />
                                </div>
                                <div>
                                    <h6 className="mb-1 text-dark fw-bold">{expense.desc}</h6>
                                    <small className="text-secondary">{expense.type} • {expense.date}</small>
                                </div>
                            </div>
                            <div className="text-end">
                                <h6 className={`fw-bold mb-1 ${expense.status === 'Approved' ? 'text-success' : 'text-dark'}`}>{expense.amount}</h6>
                                <span className={`badge rounded-pill ${expense.status === 'Approved' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                    {expense.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TravelExpenses;
