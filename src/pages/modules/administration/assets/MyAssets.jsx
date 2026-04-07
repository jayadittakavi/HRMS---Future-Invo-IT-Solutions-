import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { assetService } from '../../../../services/assetService';
import { FaLaptop, FaMobileAlt, FaDesktop, FaInfoCircle, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa';

const MyAssets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAssets = async () => {
        setLoading(true);
        try {
            const data = await assetService.getMyAssets();
            setAssets(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Asset fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const getAssetIcon = (type) => {
        const t = type?.toLowerCase() || '';
        if (t.includes('laptop')) return <FaLaptop />;
        if (t.includes('phone') || t.includes('mobile')) return <FaMobileAlt />;
        return <FaDesktop />;
    };

    return (
        <DashboardLayout title="My Assigned Assets">
            <div className="p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="mb-4">
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Equipments & Assets</h4>
                    <p className="text-secondary small">Inventory of company hardware currently assigned to you for professional use.</p>
                </div>

                {loading ? (
                    <div className="d-flex justify-content-center py-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : assets.length > 0 ? (
                    <div className="row g-4">
                        {assets.map((asset) => (
                            <div key={asset.id} className="col-md-6 col-lg-4">
                                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" 
                                     style={{ transition: 'transform 0.2s', cursor: 'default' }}
                                     onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                     onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-4">
                                            <div className="p-3 rounded-4 bg-primary bg-opacity-10 text-primary fs-4">
                                                {getAssetIcon(asset.asset_type || asset.category)}
                                            </div>
                                            <span className="badge bg-success bg-opacity-10 text-success border border-success fw-bold px-3 py-2 rounded-pill" style={{ fontSize: '0.7rem' }}>
                                                {asset.status || 'Active'}
                                            </span>
                                        </div>
                                        
                                        <h5 className="fw-bold mb-2" style={{ color: '#0f172a' }}>{asset.asset_name || asset.name}</h5>
                                        <p className="text-muted small mb-4">{asset.serial_number || asset.model || 'Unknown Model'}</p>
                                        
                                        <div className="d-flex flex-column gap-3">
                                            <div className="d-flex align-items-center gap-2 text-secondary small">
                                                <FaCalendarAlt className="opacity-50" />
                                                <span>Assigned on: <strong>{asset.allocation_date || asset.created_at || 'Jan 01, 2024'}</strong></span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 text-secondary small">
                                                <FaShieldAlt className="opacity-50" />
                                                <span>Warranty: <strong>{asset.warranty_status || 'Up to Date'}</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-light border-0 py-3 px-4 d-flex align-items-center gap-2 text-primary small fw-bold">
                                        <FaInfoCircle />
                                        <span>Click for hardware specs</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
                        <div className="display-4 text-muted mb-3 opacity-25">📦</div>
                        <h6 className="fw-bold text-dark">No Assets Assigned</h6>
                        <p className="text-secondary small mb-0 px-4">You currently don't have any company equipment assigned to your account.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyAssets;
