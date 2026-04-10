import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { idCardService } from '../../../services/idCardService';
import { useAuth } from '../../../context/AuthContext';
import IDCard from '../../../components/attendance/IDCard';

const IDCardView = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase();
    const isAdmin = role === 'admin' || role === 'superadmin';

    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal & Form State
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        employee_code: '',
        designation: '',
        department: '',
        blood_group: '',
        joining_date: '',
        emergency_contact: '',
        photo: '',
        company_name: '',
        company_logo: '',
        status: 'Active'
    });

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        setLoading(true);
        try {
            const response = await idCardService.getAllIDCards();
            // Handle both direct array and { data: [] } structures
            const data = Array.isArray(response) ? response : (response?.data || response?.cards || []);
            setCards(data);
        } catch (err) {
            console.error("Failed to load ID cards", err);
            setCards([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCards = Array.isArray(cards) ? cards.filter(card =>
        (card.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.employee_code || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // --- CRUD Operations (Admin Only) ---
    const handleAddNew = () => {
        setFormData({
            name: '',
            employee_code: '',
            designation: '',
            department: '',
            blood_group: '',
            joining_date: '',
            emergency_contact: '',
            photo: '',
            company_name: '',
            company_logo: '',
            status: 'Active'
        });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEdit = (card) => {
        setFormData(card);
        setCurrentId(card.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAdmin) return;

        try {
            if (isEditing) {
                await idCardService.updateIDCard(currentId, formData);
            } else {
                await idCardService.createIDCard(formData);
            }
            setShowModal(false);
            loadCards(); // Refresh
        } catch (err) {
            console.error("Failed to save ID card", err);
        }
    };

    const handleToggleStatus = async (card) => {
        if (!isAdmin) return;
        const newStatus = card.status === 'Inactive' ? 'Active' : 'Inactive';
        if (window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this ID card?`)) {
            try {
                await idCardService.updateIDCard(card.id, { ...card, status: newStatus });
                loadCards();
            } catch (err) {
                console.error("Failed to update status", err);
            }
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Use simulated file upload for demo (would be real file upload in prod)
    const handleLogoUpdate = async (id, newLogo) => {
        if (!isAdmin) return;
        try {
            await idCardService.updateIDCard(id, { company_logo: newLogo });
            loadCards();
        } catch (err) {
            console.error("Failed to update logo", err);
        }
    };

    const handleCompanyLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, company_logo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) return <div className="text-center p-5">Loading ID Cards...</div>;

    return (
        <div className="container-fluid p-0">
            {/* Header & Actions */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div className="input-group shadow-sm" style={{ maxWidth: '400px' }}>
                    <span className="input-group-text bg-white border-end-0"><FaSearch className="text-secondary" /></span>
                    <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="Search by Name or ID..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                {isAdmin && (
                    <button className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={handleAddNew}>
                        <FaPlus className="me-2" />
                        Create ID Card
                    </button>
                )}
            </div>

            {/* Cards Grid */}
            <div className="row g-4">
                {filteredCards.length > 0 ? (
                    filteredCards.map(card => (
                        <div key={card.id} className="col-auto d-flex flex-column align-items-center mb-5">
                            <div className="position-relative">
                                {/* The Component */}
                                <IDCard
                                    employee={card}
                                    canEditLogo={isAdmin}
                                    onLogoUpdate={handleLogoUpdate}
                                />

                                {/* Admin Actions Overlay */}
                                {isAdmin && (
                                    <div className="position-absolute top-0 end-0 mt-2 me-2 d-flex gap-2">
                                        <button
                                            className="btn btn-light btn-sm rounded-circle shadow-sm text-primary"
                                            onClick={(e) => { e.stopPropagation(); handleEdit(card); }}
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className={`btn btn-light btn-sm rounded-circle shadow-sm ${card.status === 'Inactive' ? 'text-success' : 'text-danger'}`}
                                            onClick={(e) => { e.stopPropagation(); handleToggleStatus(card); }}
                                            title={card.status === 'Inactive' ? "Activate" : "Deactivate"}
                                        >
                                            {card.status === 'Inactive' ? <FaCheckCircle /> : <FaTimesCircle />}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5 text-muted">
                        No ID cards found. {isAdmin && "Create one to get started!"}
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg rounded-4">
                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title fw-bold">{isEditing ? 'Edit ID Card' : 'Create New ID Card'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        {/* Left Col: Photo */}
                                        <div className="col-md-4 text-center">
                                            <div className="bg-light rounded p-3 border mb-2 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                                                {formData.photo ? (
                                                    <img src={formData.photo} alt="Preview" className="w-100 h-100 object-fit-contain" />
                                                ) : (
                                                    <span className="text-muted">No Photo</span>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label small text-muted d-block text-start">Profile Photo</label>
                                                <input type="file" className="form-control form-control-sm" onChange={handlePhotoUpload} accept="image/*" />
                                            </div>
                                            {formData.company_logo && (
                                                <div className="mt-3 text-start">
                                                    <label className="form-label small text-muted">Company Logo Preview</label>
                                                    <div className="bg-white rounded p-2 border d-flex align-items-center justify-content-center" style={{ height: '60px' }}>
                                                        <img src={formData.company_logo} alt="Company Logo" className="h-100 object-fit-contain" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Col: Fields */}
                                        <div className="col-md-8">
                                            <div className="row g-2">
                                                <div className="col-md-6">
                                                    <label className="form-label small text-muted">Full Name</label>
                                                    <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small text-muted">Employee Code</label>
                                                    <input type="text" className="form-control" value={formData.employee_code} onChange={e => setFormData({ ...formData, employee_code: e.target.value })} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small text-muted">Company Name</label>
                                                    <input type="text" className="form-control" value={formData.company_name} onChange={e => setFormData({ ...formData, company_name: e.target.value })} placeholder="Future Invo" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small text-muted">Company Logo</label>
                                                    <input type="file" className="form-control" onChange={handleCompanyLogoUpload} accept="image/*" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small text-muted">Designation</label>
                                                    <input type="text" className="form-control" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small text-muted">Department</label>
                                                    <input type="text" className="form-control" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small text-muted">Blood Group</label>
                                                    <select className="form-select" value={formData.blood_group} onChange={e => setFormData({ ...formData, blood_group: e.target.value })}>
                                                        <option value="">Select...</option>
                                                        <option value="A+">A+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B-">B-</option>
                                                        <option value="O+">O+</option>
                                                        <option value="O-">O-</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="AB-">AB-</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small text-muted">Joining Date</label>
                                                    <input type="date" className="form-control" value={formData.joining_date} onChange={e => setFormData({ ...formData, joining_date: e.target.value })} />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label small text-muted">Emergency Contact</label>
                                                    <input type="tel" className="form-control" value={formData.emergency_contact} onChange={e => setFormData({ ...formData, emergency_contact: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top-0">
                                    <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary px-4">Save Card</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IDCardView;
