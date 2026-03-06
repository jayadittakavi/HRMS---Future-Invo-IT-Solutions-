import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAuth } from '../../../../context/AuthContext';
import { attendanceService } from '../../../attendance/service/service';

/* ── Role color mapping ──────────────────────────────────── */
const ROLE_META = {
    superadmin: { label: 'Super Admin', color: '#7c3aed', bg: '#f5f3ff', gradient: 'linear-gradient(135deg,#7c3aed,#4c1d95)' },
    admin: { label: 'Admin', color: '#2563eb', bg: '#eff6ff', gradient: 'linear-gradient(135deg,#2563eb,#1e40af)' },
    hr: { label: 'HR Manager', color: '#0891b2', bg: '#ecfeff', gradient: 'linear-gradient(135deg,#0891b2,#0e7490)' },
    manager: { label: 'Manager', color: '#059669', bg: '#ecfdf5', gradient: 'linear-gradient(135deg,#059669,#047857)' },
    employee: { label: 'Employee', color: '#d97706', bg: '#fffbeb', gradient: 'linear-gradient(135deg,#d97706,#b45309)' },
    accountant: { label: 'Accountant', color: '#dc2626', bg: '#fff1f2', gradient: 'linear-gradient(135deg,#dc2626,#b91c1c)' },
};
const getRoleMeta = (role) => ROLE_META[role?.toLowerCase()] || ROLE_META.employee;

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
            if (!user?.email) { setFetchingData(false); return; }
            try {
                const response = await attendanceService.getAllEmployees();
                const employees = Array.isArray(response) ? response : (response.data || response.employees || []);
                const matched = employees.find(emp =>
                    emp.email?.toLowerCase() === user.email.toLowerCase() ||
                    emp.user?.toLowerCase() === user.username?.toLowerCase()
                );
                if (matched) {
                    setEmployeeData(matched);
                    setEditForm(f => ({
                        ...f,
                        name: matched.name || user.name || '',
                        phone: matched.phone || ''
                    }));
                }
            } catch (err) {
                console.error('Profile fetch error:', err);
            } finally {
                setFetchingData(false);
            }
        };
        fetchProfileData();
    }, [user]);

    const handleSave = () => {
        updateProfile({ name: editForm.name, profilePic: pendingPic || undefined });
        setPendingPic(null);
        setIsEditing(false);
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
        name: editForm.name || employeeData?.name || user?.name || '—',
        email: employeeData?.email || user?.email || '—',
        phone: editForm.phone || employeeData?.phone || '',
        role: employeeData?.type || user?.role || 'employee',
        desig: employeeData?.desig || employeeData?.type || user?.role || '—',
        dept: employeeData?.dept || 'N/A',
        empId: employeeData?.employee_id || employeeData?.id || user?.id || 'N/A',
        manager: employeeData?.manager || 'N/A',
        joinDate: employeeData?.joiningDate || 'N/A',
        branch: employeeData?.branch || employeeData?.city || 'N/A',
        status: employeeData?.status || 'Active',
        profilePic: pendingPic || user?.profilePic || null,
        address: editForm.address || employeeData?.address || '',
        bio: editForm.bio || '',
        emergContact: editForm.emergencyContact || '',
        username: user?.username || '—',
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

            {/* ── Cover Banner ── */}
            <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 0, position: 'relative' }}>
                <div style={{ height: 130, background: meta.gradient, position: 'relative' }}>
                    {/* Decorative circles */}
                    <div style={{ position: 'absolute', right: -30, top: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ position: 'absolute', right: 80, bottom: -60, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', left: 30, top: 20, color: 'rgba(255,255,255,0.15)', fontSize: '4rem' }}>✦</div>
                </div>

                {/* ── Profile Card (floating over cover) ── */}
                <div className="card border-0 shadow-sm" style={{ borderRadius: '0 0 20px 20px', borderTop: `4px solid ${meta.color}` }}>
                    <div className="card-body" style={{ padding: '0 28px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: -52, flexWrap: 'wrap' }}>
                            {/* Avatar */}
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <div
                                    style={{
                                        width: 104, height: 104, borderRadius: '50%',
                                        border: `4px solid #fff`, overflow: 'hidden',
                                        background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: `0 4px 20px ${meta.color}30`,
                                        cursor: isEditing ? 'pointer' : 'default',
                                        position: 'relative',
                                    }}
                                    onClick={() => isEditing && document.getElementById('profile-pic-upload').click()}
                                >
                                    {D.profilePic ? (
                                        <img src={D.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '2rem', fontWeight: 800, color: meta.color }}>{initials}</span>
                                    )}
                                    {isEditing && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, color: '#fff' }}>
                                            <IcoCamera />
                                            <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>CHANGE</span>
                                        </div>
                                    )}
                                </div>
                                {/* Online indicator */}
                                <div style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderRadius: '50%', background: '#16a34a', border: '2px solid #fff' }} />
                                <input type="file" id="profile-pic-upload" className="d-none" accept="image/*" onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) { const r = new FileReader(); r.onloadend = () => setPendingPic(r.result); r.readAsDataURL(file); }
                                }} />
                            </div>

                            {/* Name / Badge */}
                            <div style={{ flex: 1, paddingTop: 56, minWidth: 160 }}>
                                {isEditing ? (
                                    <input
                                        style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', border: 'none', borderBottom: `2px solid ${meta.color}`, outline: 'none', background: 'transparent', width: '100%', marginBottom: 4, padding: '2px 4px' }}
                                        value={editForm.name}
                                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                                        placeholder="Full name"
                                    />
                                ) : (
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: 0 }}>{D.name}</h2>
                                )}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>{D.desig}</span>
                                    <span style={{ background: meta.bg, color: meta.color, borderRadius: 20, padding: '2px 12px', fontSize: '0.71rem', fontWeight: 800 }}>
                                        {meta.label}
                                    </span>
                                    <span style={{ background: D.status === 'Active' ? '#dcfce7' : '#fee2e2', color: D.status === 'Active' ? '#16a34a' : '#dc2626', borderRadius: 20, padding: '2px 10px', fontSize: '0.71rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: D.status === 'Active' ? '#16a34a' : '#dc2626', display: 'inline-block' }} />{D.status}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: 3 }}>@{D.username} · {D.email}</div>
                            </div>

                            {/* Action buttons */}
                            <div style={{ display: 'flex', gap: 8, paddingTop: 60, flexShrink: 0 }}>
                                {isEditing ? (
                                    <>
                                        <button onClick={handleSave} style={{ borderRadius: 10, padding: '8px 20px', fontSize: '0.82rem', fontWeight: 700, background: '#16a34a', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <IcoCheck /> Save Changes
                                        </button>
                                        <button onClick={handleCancel} style={{ borderRadius: 10, padding: '8px 18px', fontSize: '0.82rem', fontWeight: 600, background: '#f1f5f9', border: 'none', color: '#374151', cursor: 'pointer' }}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleSubscribe}
                                            style={{
                                                borderRadius: 10, padding: '8px 20px', fontSize: '0.82rem', fontWeight: 700,
                                                background: '#fff', border: `1.5px solid ${meta.color}`, color: meta.color,
                                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={e => e.currentTarget.style.background = `${meta.color}10`}
                                            onMouseOut={e => e.currentTarget.style.background = '#fff'}
                                        >
                                            <IcoBell /> Subscribe
                                        </button>
                                        <button onClick={() => setIsEditing(true)} style={{ borderRadius: 10, padding: '8px 20px', fontSize: '0.82rem', fontWeight: 700, background: meta.gradient, border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 4px 12px ${meta.color}40` }}>
                                            <IcoEdit /> Edit Profile
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ── Quick Stats Row ── */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginTop: 24, borderTop: '1px solid #f0f4ff', paddingTop: 20 }}>
                            {stats.map((s, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.68rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
                                    {s.isStatus ? (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#dcfce7', color: '#16a34a', borderRadius: 20, padding: '3px 12px', fontSize: '0.78rem', fontWeight: 700 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} />{s.value}
                                        </div>
                                    ) : (
                                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: s.value !== 'N/A' ? '#111827' : '#9ca3af' }}>{s.value}</div>
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
