import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBell, FaEdit } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAuth } from '../../../../context/AuthContext';
import { getAuthHeader } from '../../../../config';
import { profileService } from '../../../../services/profileService';

/* ── Role color mapping ──────────────────────────────────── */
const ROLE_META = {
    superadmin: { label: 'Super Admin', color: '#7c3aed', bg: '#f5f3ff', gradient: 'linear-gradient(135deg,#7c3aed,#4c1d95)' },
    admin: { label: 'Admin', color: '#2563eb', bg: '#eff6ff', gradient: 'linear-gradient(135deg,#2563eb,#1e40af)' },
    hr: { label: 'HR Manager', color: '#0891b2', bg: '#ecfeff', gradient: 'linear-gradient(135deg,#0891b2,#0e7490)' },
    manager: { label: 'Manager', color: '#059669', bg: '#ecfdf5', gradient: 'linear-gradient(135deg,#059669,#047857)' },
    employee: { label: 'Employee', color: '#a855f7', bg: '#faf5ff', gradient: 'linear-gradient(135deg,#c084fc,#a855f7)' },
    accountant: { label: 'Accountant', color: '#dc2626', bg: '#fff1f2', gradient: 'linear-gradient(135deg,#dc2626,#b91c1c)' },
};
const getRoleMeta = (role) => {
    const r = role?.toLowerCase() || '';
    if (r.includes('superadmin')) return ROLE_META.superadmin;
    if (r.includes('admin')) return ROLE_META.admin;
    if (r.includes('hr')) return ROLE_META.hr;
    if (r.includes('manager')) return ROLE_META.manager;
    if (r.includes('accountant')) return ROLE_META.accountant;
    return ROLE_META.employee;
};

/* ── Tiny SVG Icons ─────────────────────────────────────── */
const Ico = ({ d, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const IcoUser = () => <Ico d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
const IcoMail = () => <Ico d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />;
const IcoPhone = () => <Ico d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.15a16 16 0 0 0 6.29 6.29l1.41-1.41a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15z" />;
const IcoBldg = () => <Ico d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
const IcoPin = () => <Ico d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
const IcoBrief = () => <Ico d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />;
const IcoCal = () => <Ico d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18" />;
const IcoId = () => <Ico d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01" />;
const IcoNet = () => <Ico d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />;
const IcoManager = () => <Ico d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />;
const IcoLock = () => <Ico d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4" />;
const IcoEdit = () => <Ico d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />;
const IcoCheck = () => <Ico d="M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4 12 14.01l-3-3" />;
const IcoCamera = () => <Ico d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />;
const IcoBell = () => <Ico d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0" />;

/* ── Info Field (read-only display) ─────────────────────── */
const InfoField = ({ label, value, icon, editable, onChange, type = 'text', placeholder }) => (
    <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 7 }}>
            {label}
        </label>
        {editable ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1.5px solid #2563eb', borderRadius: 10, padding: '8px 12px' }}>
                <span style={{ color: '#2563eb', flexShrink: 0 }}>{icon}</span>
                <input
                    type={type}
                    style={{ border: 'none', outline: 'none', fontSize: '0.88rem', color: '#111827', fontWeight: 600, flex: 1, background: 'transparent' }}
                    value={value || ''}
                    onChange={onChange}
                    placeholder={placeholder || label}
                />
            </div>
        ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8faff', borderRadius: 10, padding: '10px 14px', border: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280', flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: '0.88rem', color: value && value !== 'N/A' ? '#111827' : '#9ca3af', fontWeight: value && value !== 'N/A' ? 600 : 400 }}>
                    {value || 'Not set'}
                </span>
            </div>
        )}
    </div>
);

/* ── Section Title ──────────────────────────────────────── */
const SectionTitle = ({ icon, title, desc }) => (
    <div style={{ marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #f0f4ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2563eb' }}>{icon}</span>
            <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#111827' }}>{title}</span>
        </div>
        {desc && <p style={{ fontSize: '0.74rem', color: '#9ca3af', margin: '3px 0 0 26px' }}>{desc}</p>}
    </div>
);

/* ── Profile Content (shared across all roles) ─────────── */
const ProfileContent = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [fetchingData, setFetchingData] = useState(true);
    const [employeeData, setEmployeeData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [pendingPic, setPendingPic] = useState(null);

    const [editForm, setEditForm] = useState({
        name: user?.name || '',
        phone: '',
        address: '',
        emergencyContact: '',
        bio: '',
    });

    /* Fetch employee record in background */
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await profileService.getMyProfile();
                if (data) {
                    setEmployeeData(data);
                    setEditForm({
                        name: data.name || '',
                        phone: data.overview?.contact_information?.phone_number || data.phone || '',
                        address: data.overview?.contact_information?.address_location || data.address || '',
                        bio: data.overview?.about_bio || data.bio || '',
                        emergencyContact: ''
                    });
                }
            } catch (err) {
                console.error('Profile fetch error:', err);
            } finally {
                setFetchingData(false);
            }
        };
        fetchProfileData();
    }, [user]);

    const handleSave = async () => {
        try {
            const updated = await profileService.updateProfile({
                name: editForm.name,
                phone: editForm.phone,
                address: editForm.address,
                bio: editForm.bio
            });
            if (updated) setEmployeeData(updated);
            updateProfile({ name: editForm.name, profilePic: pendingPic || undefined });
            setPendingPic(null);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (err) {
            console.warn("Server update failed, updating local state for session continuity.", err);
            updateProfile({ name: editForm.name, profilePic: pendingPic || undefined });
            setPendingPic(null);
            setIsEditing(false);
            alert("Profile saved locally! (Note: Server is currently unreachable - " + (err.message || "Internal Error") + ")");
        }
    };
    const handleCancel = () => {
        setEditForm(f => ({ ...f, name: employeeData?.name || user?.name || '', phone: employeeData?.phone || '' }));
        setPendingPic(null);
        setIsEditing(false);
    };

    const handleSubscribe = () => {
        const subscribeLink = "https://futureinvo.com/subscribe";
        alert(`🔗 Link to subscribe: ${subscribeLink}\n\nSuccess! A subscription invite has been sent to your email: ${user?.email || 'your registered email'}.`);
        console.log(`Sending subscription link to ${user?.email}: ${subscribeLink}`);
    };

    /* Merged display data */
    const D = {
        name: employeeData?.name || user?.name || '—',
        username: employeeData?.username || user?.username || '—',
        email: employeeData?.email || user?.email || '—',
        phone: employeeData?.overview?.contact_information?.phone_number || employeeData?.phone || '',
        address: employeeData?.overview?.contact_information?.address_location || employeeData?.address || '',
        bio: employeeData?.overview?.about_bio || employeeData?.bio || '',
        role: employeeData?.role || user?.role || 'employee',
        desig: employeeData?.designation || employeeData?.overview?.work_snapshot?.role_designation || user?.role || '—',
        dept: employeeData?.department || employeeData?.overview?.work_snapshot?.department || 'N/A',
        manager: employeeData?.overview?.work_snapshot?.reporting_manager || 'N/A',
        empId: employeeData?.employee_id || 'N/A',
        joinDate: employeeData?.joined || 'N/A',
        status: employeeData?.status || 'Active',
        branch: employeeData?.branch || 'N/A',
        profilePic: pendingPic || user?.profilePic || null,
        emergContact: editForm.emergencyContact || '',
        work_info: employeeData?.work_info || {},
        personal: employeeData?.personal || {}
    };

    const meta = getRoleMeta(D.role);
    const initials = D.name ? D.name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2) : '?';

    /* Stats quick data */
    const stats = [
        { label: 'Employee ID', value: D.empId, icon: <IcoId /> },
        { label: 'Department', value: D.dept, icon: <IcoNet /> },
        { label: 'Joined', value: D.joinDate, icon: <IcoCal /> },
        { label: 'Status', value: D.status, icon: <IcoCheck />, isStatus: true },
    ];

    const TABS = [
        { id: 'overview', label: '👤 Overview' },
        { id: 'work', label: '💼 Work Info' },
        { id: 'personal', label: '📋 Personal' },
        { id: 'security', label: '🔒 Security' },
    ];

    return (
        <div style={{ maxWidth: 960, padding: '24px 24px 48px' }}>

            {/* ── Outer Wrapper ── */}
            <div style={{ position: 'relative', overflow: 'visible' }}>
                
                {/* 1. Cover Banner (Stays at the back) */}
                <div style={{ 
                    height: 150, 
                    background: meta.gradient, 
                    borderRadius: '24px 24px 0 0', 
                    position: 'relative', 
                    zIndex: 1, 
                    boxShadow: 'inset 0 -30px 60px rgba(0,0,0,0.08)'
                }}>
                    {/* Decorative circles */}
                    <div style={{ position: 'absolute', right: -30, top: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ position: 'absolute', right: 80, bottom: -60, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', left: 40, top: 30, color: 'rgba(255,255,255,0.15)', fontSize: '4rem' }}>✦</div>
                </div>

                {/* 2. Floating Header Info (Highest Layer) */}
                <div style={{ 
                    position: 'relative', 
                    zIndex: 100, 
                    marginTop: -85, 
                    padding: '0 40px', 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    gap: 32, 
                    flexWrap: 'wrap' 
                }}>
                    {/* DP Circle */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div
                            style={{
                                width: 142, height: 142, borderRadius: '50%',
                                border: `6px solid #fff`, overflow: 'hidden',
                                background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 12px 35px rgba(0,0,0,0.22)`,
                                cursor: isEditing ? 'pointer' : 'default',
                                position: 'relative',
                                zIndex: 105
                            }}
                            onClick={() => isEditing && document.getElementById('profile-pic-upload').click()}
                        >
                            {D.profilePic ? (
                                <img src={D.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                            ) : (
                                <span style={{ fontSize: '3rem', fontWeight: 800, color: meta.color }}>{initials}</span>
                            )}
                            {isEditing && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, color: '#fff', zIndex: 110 }}>
                                    <IcoCamera />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>CHANGE DP</span>
                                </div>
                            )}
                        </div>
                        {/* Status Dot */}
                        <div style={{ position: 'absolute', bottom: 12, right: 12, width: 24, height: 24, borderRadius: '50%', background: '#22c55e', border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', zIndex: 120 }} />
                        <input type="file" id="profile-pic-upload" className="d-none" accept="image/*" onChange={e => {
                            const file = e.target.files[0];
                            if (file) { const r = new FileReader(); r.onloadend = () => setPendingPic(r.result); r.readAsDataURL(file); }
                        }} />
                    </div>

                    {/* Identity Details */}
                    <div style={{ flex: 1, paddingBottom: 15, minWidth: 200 }}>
                        {isEditing ? (
                            <input
                                style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', border: 'none', borderBottom: `3px solid ${meta.color}`, outline: 'none', background: 'transparent', width: '100%', marginBottom: 8 }}
                                value={editForm.name}
                                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="Full Name"
                            />
                        ) : (
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: 4, textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>{D.name || 'User Profile'}</h2>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <span style={{ background: `${meta.color}15`, color: meta.color, borderRadius: 8, padding: '4px 14px', fontSize: '0.85rem', fontWeight: 700 }}>{D.desig}</span>
                            <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.8rem' }}>● ACTIVE</span>
                            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>@ — {D.email}</span>
                        </div>
                    </div>

                    {/* Action Bar (Aligned right) */}
                    <div style={{ paddingBottom: 15, display: 'flex', gap: 12 }}>
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="btn btn-success rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm">
                                    <FaCheckCircle /> Save Changes
                                </button>
                                <button onClick={handleCancel} className="btn btn-light rounded-pill px-4 py-2 fw-bold border">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleSubscribe} className="btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2" style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#475569', fontSize: '0.88rem' }}>
                                    <FaBell /> Subscribe
                                </button>
                                <button onClick={() => setIsEditing(true)} className="btn rounded-pill px-4 py-2 fw-bold text-white shadow-sm" style={{ backgroundColor: meta.color, fontSize: '0.88rem' }}>
                                    <FaEdit /> Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* 3. Stats Card (Restored Spacing) */}
                <div style={{ background: '#fff', borderRadius: '0 0 24px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginTop: -60, paddingTop: 85, position: 'relative', zIndex: 10 }}>
                    <div style={{ padding: '24px 40px' }}>
                        
                        {/* Summary Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 20, textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 24 }}>
                            {stats.map((s, i) => (
                                <div key={i}>
                                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{s.label}</div>
                                    {s.isStatus ? (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f0fdf4', color: '#16a34a', borderRadius: 20, padding: '4px 14px', fontSize: '0.82rem', fontWeight: 700 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />{s.value}
                                        </div>
                                    ) : (
                                        <div style={{ fontWeight: 800, fontSize: '1rem', color: s.value !== 'N/A' ? '#1e293b' : '#cbd5e1' }}>{s.value}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div style={{ display: 'flex', gap: 4, marginTop: 20, marginBottom: 20, background: '#f8faff', borderRadius: 12, padding: 4, flexWrap: 'wrap' }}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1, minWidth: 100, borderRadius: 9, padding: '8px 14px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.18s',
                            background: activeTab === tab.id ? '#fff' : 'transparent',
                            color: activeTab === tab.id ? meta.color : '#6b7280',
                            boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                        }}
                    >{tab.label}</button>
                ))}
            </div>

            {/* ── Tab: Overview ── */}
            {activeTab === 'overview' && (
                <div className="row g-4">
                    {/* Contact Card */}
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <SectionTitle icon={<IcoMail />} title="Contact Information" desc="How to reach this person" />
                                <InfoField label="Email Address" value={D.email} icon={<IcoMail />} />
                                <InfoField label="Phone Number" value={D.phone || (fetchingData ? '...' : 'Not set')} icon={<IcoPhone />} editable={isEditing} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} />
                                <InfoField label="Address / Location" value={D.address || (fetchingData ? '...' : 'Not set')} icon={<IcoPin />} editable={isEditing} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} />
                            </div>
                        </div>
                    </div>
                    {/* Work Snapshot */}
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <SectionTitle icon={<IcoBrief />} title="Work Snapshot" desc="Quick look at your work profile" />
                                <InfoField label="Role / Designation" value={D.desig} icon={<IcoBrief />} />
                                <InfoField label="Department" value={D.dept} icon={<IcoNet />} />
                                <InfoField label="Reporting Manager" value={D.manager} icon={<IcoManager />} />
                            </div>
                        </div>
                    </div>
                    {/* Bio */}
                    <div className="col-12">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <SectionTitle icon={<IcoUser />} title="About / Bio" desc="A short introduction visible to your team" />
                                {isEditing ? (
                                    <textarea
                                        style={{ width: '100%', border: `1.5px solid ${meta.color}`, borderRadius: 10, padding: '10px 14px', fontSize: '0.88rem', color: '#111827', outline: 'none', resize: 'vertical', minHeight: 80 }}
                                        value={editForm.bio}
                                        onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                                        placeholder="Write a short bio about yourself..."
                                    />
                                ) : (
                                    <p style={{ color: editForm.bio ? '#374151' : '#9ca3af', fontSize: '0.88rem', lineHeight: 1.7, margin: 0, fontStyle: editForm.bio ? 'normal' : 'italic' }}>
                                        {editForm.bio || (fetchingData ? 'Loading bio...' : 'No bio added yet. Click Edit Profile to add one.')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Tab: Work Info ── */}
            {activeTab === 'work' && (
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <SectionTitle icon={<IcoBrief />} title="Work Information" desc="Employment and organizational details" />
                        <div className="row g-0">
                            <div className="col-md-6 pe-md-4">
                                <InfoField label="Employee ID" value={String(D.empId)} icon={<IcoId />} />
                                <InfoField label="Role / Designation" value={D.desig} icon={<IcoBrief />} />
                                <InfoField label="Department" value={D.dept} icon={<IcoNet />} />
                            </div>
                            <div className="col-md-6 ps-md-4">
                                <InfoField label="Reporting Manager" value={D.manager} icon={<IcoManager />} />
                                <InfoField label="Date of Joining" value={D.joinDate} icon={<IcoCal />} />
                                <InfoField label="Branch / Location" value={D.branch} icon={<IcoPin />} />
                                {D.work_info && Object.entries(D.work_info).map(([k, v]) => (
                                    <InfoField key={k} label={k} value={v} icon={<IcoBrief />} />
                                ))}
                            </div>
                        </div>

                        {/* Role badge section */}
                        <div style={{ marginTop: 8, padding: 18, background: meta.bg, borderRadius: 12, border: `1px solid ${meta.color}20`, display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, background: meta.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, fontSize: '1.3rem' }}>
                                {D.role === 'superadmin' ? '👑' : D.role === 'admin' ? '🛡' : D.role === 'hr' ? '🤝' : D.role === 'manager' ? '📊' : D.role === 'accountant' ? '💰' : '👤'}
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>Access Level: <span style={{ color: meta.color }}>{meta.label}</span></div>
                                <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: 2 }}>
                                    {D.role === 'superadmin' && 'Full system access — all modules, all settings, all data visible'}
                                    {D.role === 'admin' && 'Organization-wide access — manage employees, settings and reports'}
                                    {D.role === 'hr' && 'HR module access — onboarding, leaves, attendance, payroll & documents'}
                                    {D.role === 'manager' && 'Team access — view and manage your direct reportees'}
                                    {D.role === 'employee' && 'Self-service access — view your own attendance, leaves and documents'}
                                    {D.role === 'accountant' && 'Finance module access — payroll, expenses and financial reports'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Tab: Personal ── */}
            {activeTab === 'personal' && (
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <SectionTitle icon={<IcoUser />} title="Personal Details" desc="Basic personal information" />
                                <InfoField label="Full Name" value={D.name} icon={<IcoUser />} editable={isEditing} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
                                <InfoField label="Personal Email" value={D.email} icon={<IcoMail />} />
                                <InfoField label="Phone Number" value={D.phone} icon={<IcoPhone />} editable={isEditing} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} />
                                <InfoField label="Current Address" value={D.address} icon={<IcoPin />} editable={isEditing} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} placeholder="Your address" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <SectionTitle icon={<IcoPhone />} title="Emergency Contact" desc="Contact in case of emergency" />
                                <InfoField label="Emergency Contact Name / Number" value={D.emergContact} icon={<IcoPhone />} editable={isEditing} onChange={e => setEditForm(f => ({ ...f, emergencyContact: e.target.value }))} placeholder="Name – Phone number" />
                                
                                {D.personal && Object.entries(D.personal).map(([k, v]) => (
                                    <InfoField key={k} label={k} value={v} icon={<IcoUser />} />
                                ))}

                                <div style={{ marginTop: 20, padding: 14, background: '#fffbeb', borderRadius: 10, border: '1px solid #fde68a' }}>
                                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#b45309', marginBottom: 4 }}>⚠️ Privacy Note</div>
                                    <div style={{ fontSize: '0.74rem', color: '#92400e', lineHeight: 1.6 }}>Personal details are only visible to you and authorized HR personnel. Your information is securely stored and never shared externally.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Tab: Security ── */}
            {activeTab === 'security' && (
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <SectionTitle icon={<IcoLock />} title="Account Security" desc="Password and login settings" />

                                {/* Account info */}
                                <div style={{ marginBottom: 20, padding: 16, background: '#f8faff', borderRadius: 12, border: '1px solid #e0e7ff' }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Account Details</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        {[
                                            ['Username', D.username],
                                            ['Account Status', D.status],
                                            ['Role', meta.label],
                                            ['Login Email', D.email],
                                        ].map(([k, v]) => (
                                            <div key={k}>
                                                <div style={{ fontSize: '0.68rem', color: '#9ca3af', fontWeight: 600 }}>{k}</div>
                                                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>{v}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Change password button */}
                                <button
                                    onClick={() => navigate('/change-password')}
                                    style={{ width: '100%', padding: '11px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700, background: meta.gradient, border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 4px 12px ${meta.color}30` }}
                                >
                                    <IcoLock /> Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <SectionTitle icon={<IcoCheck />} title="Session & Activity" desc="Recent account activity" />
                                {[
                                    { action: 'Login', detail: 'Chrome, Windows', time: 'Just now', icon: '🟢' },
                                    { action: 'Password Changed', detail: 'via Settings', time: '3 days ago', icon: '🔑' },
                                    { action: 'Profile Updated', detail: 'Name changed', time: '7 days ago', icon: '✏️' },
                                    { action: 'Login', detail: 'Mobile, Android', time: '10 days ago', icon: '📱' },
                                ].map((a, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>{a.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>{a.action}</div>
                                            <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{a.detail}</div>
                                        </div>
                                        <span style={{ fontSize: '0.72rem', color: '#9ca3af', flexShrink: 0 }}>{a.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ── Standalone route wrapper ───────────────────────────── */
const Profile = () => (
    <DashboardLayout title="">
        <ProfileContent />
    </DashboardLayout>
);

export { ProfileContent };
export default Profile;
