import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield, FiUsers, FiEdit2, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';
import { MdOutlineSecurity } from 'react-icons/md';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { accessControlService } from '../../core/user_management/service';

const RolesList = () => {
    const navigate = useNavigate();

    const [rolesData, setRolesData] = React.useState([]);
    const [membersData, setMembersData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [roles, users] = await Promise.all([
                    accessControlService.getRoles(),
                    accessControlService.getUsers()
                ]);
                
                // Map backend roles to UI format
                const mappedRoles = (roles || []).map(role => ({
                    id: role.id,
                    name: role.name,
                    description: role.description || "System assigned role with specific permissions.",
                    userCount: role.userCount || 0,
                    modulesCount: Object.keys(role.permissions || {}).length,
                    totalModules: 8,
                    dotColor: role.name === 'Super Admin' ? '#f59e0b' : '#3b82f6',
                    members: `${role.userCount || 0} Members`
                }));
                setRolesData(mappedRoles);

                // Map users to members format
                const mappedMembers = (users || []).map(user => ({
                    id: user.id,
                    name: user.name || user.username || "Unknown",
                    email: user.email || "N/A",
                    role: user.role || "Employee",
                    status: user.status || "Active",
                    joined: user.created_at || user.createdAt || "Recently"
                }));
                setMembersData(mappedMembers);

            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const navigateToAddMember = () => navigate('/add-member');

    const stats = [
        { icon: <MdOutlineSecurity size={18} />, label: `${rolesData.length} Roles Defined` },
        { icon: <FiUsers size={18} />, label: `${rolesData.reduce((acc, r) => acc + (r.userCount || 0), 0)} Users Assigned` },
        { icon: <FiShield size={18} />, label: "8 Modules Protected" }
    ];
    return (
        <DashboardLayout title="">
            <div className="container-fluid p-0 roles-list-page" style={{ backgroundColor: '#e2e8f0', minHeight: '100vh', padding: '24px 32px' }}>
                <div style={{ backgroundColor: '#e2e8f0', padding: '24px 32px' }}>
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex gap-3">
                            {stats.map((stat, idx) => (
                                <div 
                                    key={idx} 
                                    className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-sm border"
                                    style={{ borderColor: '#cbd5e1' }}
                                >
                                    <span className="text-secondary d-flex">{stat.icon}</span>
                                    <span className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-primary rounded-pill px-4" onClick={navigateToAddMember}>
                            <FiPlus className="me-2" /> Add New Member
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="card border-0 rounded-4 shadow-sm overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle mb-0 custom-roles-table">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <th className="py-3 px-4 text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ROLE NAME</th>
                                        <th className="py-3 px-2 text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>DESCRIPTION</th>
                                        <th className="py-3 px-2 text-center text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>USERS</th>
                                        <th className="py-3 px-2 text-center text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>MODULES</th>
                                        <th className="py-3 px-4 text-center text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                                    ) : rolesData.length === 0 ? (
                                        <tr><td colSpan="5" className="text-center py-5 text-muted">No roles found.</td></tr>
                                    ) : rolesData.map((role, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }} className="role-row">
                                            <td className="py-3 px-4">
                                                <div className="d-flex align-items-start gap-3">
                                                    <div className="mt-2 rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: role.dotColor, flexShrink: 0 }}></div>
                                                    <div>
                                                        <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{role.name}</div>
                                                        <div className="text-secondary" style={{ fontSize: '0.8rem' }}>{role.members}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-secondary" style={{ fontSize: '0.85rem', maxWidth: '400px' }}>
                                                {role.description}
                                            </td>
                                            <td className="py-3 px-2 text-center">
                                                <div className="d-inline-flex align-items-center gap-1 bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-pill" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                                                    <FiUsers size={12} /> {role.userCount}
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-center">
                                                <div className="d-inline-flex align-items-center bg-info bg-opacity-10 text-info px-2 py-1 rounded-pill" style={{ fontSize: '0.75rem', fontWeight: '600', color: '#0ea5e9' }}>
                                                    {role.modulesCount} / {role.totalModules}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <div className="d-flex justify-content-center align-items-center gap-3">
                                                    <button className="btn btn-link text-secondary text-decoration-none d-flex align-items-center gap-1 p-0 fw-bold" style={{ fontSize: '0.8rem' }}>
                                                        <FiEdit2 size={14} /> Edit
                                                    </button>
                                                    {role.name !== 'Super Admin' && (
                                                        <button className="btn btn-link text-danger p-0 d-flex align-items-center">
                                                            <FiTrash2 size={16} style={{ color: '#ef4444' }} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Bottom Cards (Decoration matching the screenshot's cut-off view) */}
                    <div className="d-flex gap-3 mt-4 overflow-hidden" style={{ height: '40px', opacity: 0.5 }}>
                        <div className="card border-primary border-top-0 border-end-0 border-bottom-0 shadow-sm rounded-top-3 flex-grow-1" style={{ borderLeftWidth: '4px' }}></div>
                        <div className="card border-info border-top-0 border-end-0 border-bottom-0 shadow-sm rounded-top-3 flex-grow-1" style={{ borderLeftWidth: '4px' }}></div>
                        <div className="card border-warning border-top-0 border-end-0 border-bottom-0 shadow-sm rounded-top-3 flex-grow-1" style={{ borderLeftWidth: '4px' }}></div>
                    </div>

                    {/* Invited Members Section */}
                    <div className="mt-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold text-dark d-flex align-items-center gap-2 mb-0">
                                <FiUsers className="text-primary" /> Invited Members List
                            </h5>
                        </div>

                        <div className="card border-0 rounded-4 shadow-sm overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                            <div className="table-responsive">
                                <table className="table table-borderless align-middle mb-0">
                                    <thead style={{ backgroundColor: '#f8fafc' }}>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <th className="py-3 px-4 text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>NAME & EMAIL</th>
                                            <th className="py-3 px-2 text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ROLE</th>
                                            <th className="py-3 px-2 text-center text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>STATUS</th>
                                            <th className="py-3 px-2 text-center text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>JOINED</th>
                                            <th className="py-3 px-4 text-center text-secondary fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                                        ) : membersData.length === 0 ? (
                                            <tr><td colSpan="5" className="text-center py-5 text-muted">No members invited yet.</td></tr>
                                        ) : membersData.map((member, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }} className="user-row">
                                                <td className="py-3 px-4">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                                                            style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', fontSize: '0.8rem' }}>
                                                            {member.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>{member.name}</div>
                                                            <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{member.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="badge bg-light text-dark border fw-normal px-2 py-1 rounded" style={{ fontSize: '0.75rem' }}>
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-center">
                                                    <span className={`badge rounded-pill px-2 py-1 ${member.status === 'Active' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`} style={{ fontSize: '0.7rem' }}>
                                                        {member.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-center text-secondary small">
                                                    {new Date(member.joined).toLocaleDateString() === 'Invalid Date' ? member.joined : new Date(member.joined).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <button className="btn btn-link text-secondary p-0 me-3"><FiEdit2 size={14} /></button>
                                                    <button className="btn btn-link text-danger p-0"><FiTrash2 size={14} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .roles-list-page th {
                    text-transform: uppercase;
                }
                .role-row:hover {
                    background-color: #f1f5f9;
                }
                /* Disable page bg from main content layout */
                .page-content {
                    background-color: #e2e8f0 !important;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default RolesList;
