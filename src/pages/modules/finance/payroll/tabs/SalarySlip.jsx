import React, { useState, useEffect } from 'react';
import { useSearch } from '../../../../../context/SearchContext';
import {
    MdFormatListBulleted,
    MdSave,
    MdRefresh,
    MdMoreHoriz,
    MdAdd,
    MdFilterList,
    MdClose,
    MdDescription,
    MdComputer,
    MdKeyboardArrowDown
} from 'react-icons/md';

const SalarySlip = ({ onBack }) => {
    const [filters, setFilters] = useState({
        id: '',
        employee: '',
        employeeName: '',
        company: '',
        department: '',
        branch: '',
        salaryStructure: ''
    });
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [search, setSearch] = useState(globalSearchTerm);

    useEffect(() => {
        setSearch(globalSearchTerm);
    }, [globalSearchTerm]);

    return (
        <div className="salary-slip-view container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header / Breadcrumb Area */}
            <div className="d-flex align-items-center justify-content-between mb-3 px-1">
                <div className="d-flex align-items-center gap-2 text-dark">
                    <MdComputer size={20} className="text-secondary" />
                    <span className="text-secondary small">/</span>
                    <span className="text-secondary small cursor-pointer" onClick={onBack}>Payroll</span>
                    <span className="text-secondary small">/</span>
                    <span className="fw-bold small">Salary Slip</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <div className="btn-group dropdown">
                        <button className="btn btn-light btn-sm bg-white border d-flex align-items-center gap-2 rounded-2 px-3 py-1 text-secondary">
                            <MdFormatListBulleted /> List View <MdKeyboardArrowDown />
                        </button>
                    </div>
                    <div className="btn-group dropdown">
                        <button className="btn btn-light btn-sm bg-white border d-flex align-items-center gap-2 rounded-2 px-3 py-1 text-secondary">
                            Saved Filters <MdKeyboardArrowDown />
                        </button>
                    </div>
                    <button className="btn btn-light btn-sm bg-white border p-1 rounded-2 text-secondary">
                        <MdRefresh size={20} />
                    </button>
                    <button className="btn btn-light btn-sm bg-white border p-1 rounded-2 text-secondary">
                        <MdMoreHoriz size={20} />
                    </button>
                    <button className="btn btn-dark btn-sm d-flex align-items-center gap-2 rounded-2 px-3 py-1 fw-bold border-0" style={{ background: '#111' }}>
                        <MdAdd size={18} /> Add Salary Slip
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar-container bg-white border rounded-3 p-2 mb-4">
                <div className="d-flex align-items-center flex-wrap gap-2">
                    <div className="filter-item-group d-flex align-items-center gap-1 bg-light px-2 py-1 rounded-2 border" style={{ minWidth: '200px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-transparent p-0"
                            placeholder="Global Search (Name/ID)"
                            value={search}
                            onChange={e => {
                                const val = e.target.value;
                                setSearch(val);
                                setGlobalSearchTerm(val);
                            }}
                        />
                        <span className="text-muted small">≈</span>
                    </div>

                    <div className="filter-item d-flex align-items-center bg-light px-2 py-1 rounded-2 border" style={{ minWidth: '130px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-transparent p-0"
                            placeholder="Employee"
                        />
                    </div>

                    <div className="filter-item-group d-flex align-items-center gap-1 bg-light px-2 py-1 rounded-2 border" style={{ minWidth: '130px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-transparent p-0"
                            placeholder="Employee Na"
                        />
                        <span className="text-muted small">≈</span>
                    </div>

                    <div className="filter-item d-flex align-items-center bg-light px-2 py-1 rounded-2 border" style={{ minWidth: '130px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-transparent p-0"
                            placeholder="Company"
                        />
                    </div>

                    <div className="ms-auto d-flex align-items-center gap-2">
                        <div className="btn btn-light btn-sm bg-white border rounded-2 d-flex align-items-center gap-2 text-secondary px-3">
                            <MdFilterList /> Filter <MdClose />
                        </div>
                        <div className="btn btn-light btn-sm bg-white border rounded-2 d-flex align-items-center gap-2 text-secondary px-3">
                            <MdFilterList className="rotate-90" /> Created On <MdKeyboardArrowDown />
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2 mt-2">
                    <div className="filter-item d-flex align-items-center bg-light px-2 py-1 rounded-2 border" style={{ minWidth: '130px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-transparent p-0"
                            placeholder="Department"
                        />
                    </div>
                    <div className="filter-item d-flex align-items-center bg-light px-2 py-1 rounded-2 border" style={{ minWidth: '130px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-transparent p-0"
                            placeholder="Branch"
                        />
                    </div>
                    <div className="filter-item d-flex align-items-center bg-light px-2 py-1 rounded-2 border" style={{ minWidth: '130px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-transparent p-0"
                            placeholder="Salary Structure"
                        />
                    </div>
                </div>
            </div>

            {/* Empty State */}
            <div className="empty-state-container d-flex flex-column align-items-center justify-content-center py-5 mt-5">
                <div className="mb-4 text-muted opacity-25">
                    <MdDescription size={80} />
                </div>
                <p className="text-secondary fw-medium mb-3">You haven't created a Salary Slip yet</p>
                <button className="btn btn-light bg-white border rounded-2 px-4 shadow-sm fw-bold text-dark">
                    Create your first Salary Slip
                </button>
            </div>

            <style>{`
                .salary-slip-view {
                    background: transparent;
                }
                .cursor-pointer { cursor: pointer; }
                .text-secondary { color: #64748b !important; }
                .bg-light { background-color: #f1f5f9 !important; }
                .rotate-90 { transform: rotate(90deg); }
                .rotate-270 { transform: rotate(270deg); }
                
                /* Filter input focus shadow removal */
                .form-control:focus {
                    box-shadow: none !important;
                }
                
                .animate__fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default SalarySlip;
