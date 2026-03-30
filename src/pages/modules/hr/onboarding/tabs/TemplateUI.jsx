import React, { useState, useEffect } from 'react';
import { onboardingService } from '../service';



const CAT_COLORS = {
    Recruitment: { bg: '#dbeafe', color: '#1d4ed8' },
    Onboarding: { bg: '#dcfce7', color: '#15803d' },
    Exit: { bg: '#fee2e2', color: '#dc2626' },
    Performance: { bg: '#fef3c7', color: '#b45309' },
    General: { bg: '#f3f4f6', color: '#4b5563' },
};

const EMPTY_FORM = { name: '', category: 'Recruitment', websiteResource: '', blogPost: '', content: '' };

const TemplateUI = () => {
    const [templates, setTemplates] = useState([]);
    const [stats, setStats] = useState({ total_templates: 0, active: 0, draft: 0, total_usage: 0 });
    const [categories, setCategories] = useState(['Recruitment', 'Onboarding', 'Performance', 'Exit', 'General']);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('All');
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, tData, cData] = await Promise.all([
                onboardingService.getTemplateStats(),
                onboardingService.getTemplates(),
                onboardingService.getTemplateCategories()
            ]);
            setStats(sData);
            setTemplates(tData);
            setCategories(cData);
        } catch (err) {
            console.error("Failed to fetch templates data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openAdd = () => { setForm(EMPTY_FORM); setEditingId(null); setShowModal(true); };
    const openEdit = (t) => { 
        setForm({
            name: t.name,
            category: t.category,
            websiteResource: t.websiteResource || '',
            blogPost: t.blogPost || '',
            content: t.content || ''
        }); 
        setEditingId(t.id); 
        setShowModal(true); 
    };

    const handleDelete = async (id) => { 
        if (window.confirm('Delete this template?')) {
            try {
                await onboardingService.deleteTemplate(id);
                fetchData();
            } catch (err) {
                alert("Error deleting template");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await onboardingService.updateTemplate(editingId, form);
            } else {
                await onboardingService.addTemplate(form);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert("Error saving template: " + err.message);
        }
    };

    const filtered = templates.filter(t =>
        (filterCat === 'All' || t.category === filterCat) &&
        (t.name || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Stats */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Templates', value: stats.total || stats.total_templates || templates.length, icon: '📄', color: '#2563eb', bg: '#eff6ff' },
                    { label: 'Active', value: stats.active ?? templates.filter(t => t.status === 'Active').length, icon: '✅', color: '#16a34a', bg: '#dcfce7' },
                    { label: 'Draft', value: stats.draft ?? templates.filter(t => t.status === 'Draft').length, icon: '📝', color: '#d97706', bg: '#fef3c7' },
                    { label: 'Total Usage', value: stats.total_usage || templates.reduce((s,t) => s + (t.usageCount || 0), 0), icon: '📊', color: '#7c3aed', bg: '#f5f3ff' },
                ].map((s, i) => (
                    <div key={i} className="col-md-3 col-6">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-3 d-flex align-items-center gap-3">
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{s.icon}</div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Card */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2" style={{ background: '#f8faff' }}>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                        <div style={{ position: 'relative' }}>
                            <input
                                style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: '5px 12px 5px 32px', fontSize: '0.8rem', outline: 'none', width: 200 }}
                                placeholder="Search templates…"
                                value={search} onChange={e => setSearch(e.target.value)}
                            />
                            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#9ca3af' }}>🔍</span>
                        </div>
                        <select style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: '5px 10px', fontSize: '0.8rem', color: '#374151' }} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                            <option value="All">All Categories</option>
                            {categories.map((c, idx) => (
                                <option key={idx} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={openAdd} style={{ background: '#1e3a8a', color: '#fff', borderRadius: 10, border: 'none', padding: '7px 18px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                        + Add Template
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.81rem' }}>
                        <thead>
                            <tr style={{ background: '#f8faff', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th className="border-0 py-3 px-4">Template Name</th>
                                <th className="border-0 py-3">Category</th>
                                <th className="border-0 py-3">Last Modified</th>
                                <th className="border-0 py-3">Status</th>
                                <th className="border-0 py-3">Usage</th>
                                <th className="border-0 py-3">Resources</th>
                                <th className="border-0 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-5 text-muted" style={{ fontSize: '0.85rem' }}>No templates found</td></tr>
                            ) : filtered.map(t => {
                                const cat = CAT_COLORS[t.category] || CAT_COLORS.General;
                                return (
                                    <tr key={t.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>📄</div>
                                                <div style={{ fontWeight: 700, color: '#111827' }}>{t.name}</div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span style={{ background: cat.bg, color: cat.color, borderRadius: 20, padding: '2px 10px', fontSize: '0.71rem', fontWeight: 700 }}>{t.category}</span>
                                        </td>
                                        <td className="py-3" style={{ color: '#6b7280' }}>{t.lastModified}</td>
                                        <td className="py-3">
                                            <span style={{ background: t.status === 'Active' ? '#dcfce7' : '#fef3c7', color: t.status === 'Active' ? '#16a34a' : '#b45309', borderRadius: 20, padding: '2px 10px', fontSize: '0.71rem', fontWeight: 700 }}>{t.status}</span>
                                        </td>
                                        <td className="py-3">
                                            <span style={{ background: '#eff6ff', color: '#2563eb', borderRadius: 20, padding: '2px 10px', fontSize: '0.71rem', fontWeight: 700 }}>{t.usageCount}×</span>
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex gap-1 flex-wrap">
                                                {t.websiteResource && (
                                                    <a href={t.websiteResource} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#2563eb', background: '#dbeafe', borderRadius: 6, padding: '2px 8px', textDecoration: 'none' }}>🌐 Resource</a>
                                                )}
                                                {t.blogPost && (
                                                    <span title={t.blogPost} style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0891b2', background: '#e0f2fe', borderRadius: 6, padding: '2px 8px', cursor: 'pointer' }}>📰 Blog</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex gap-2">
                                                <button title="Preview" style={{ width: 28, height: 28, borderRadius: 7, border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', cursor: 'pointer', fontSize: '0.75rem' }}>👁</button>
                                                <button title="Edit" onClick={() => openEdit(t)} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', cursor: 'pointer', fontSize: '0.75rem' }}>✏️</button>
                                                <button title="Delete" onClick={() => handleDelete(t.id)} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', cursor: 'pointer', fontSize: '0.75rem' }}>🗑</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: 20 }}>
                            <div style={{ height: 4, background: '#2563eb', borderRadius: '20px 20px 0 0' }} />
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>{editingId ? '✏️ Edit Template' : '➕ Add New Template'}</h5>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Fill in the details and click save</div>
                                </div>
                                <button className="btn-close" onClick={() => setShowModal(false)} />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body px-4 pt-2 pb-2">
                                    <div className="row g-3">
                                        <div className="col-md-8">
                                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Template Name *</label>
                                            <input required className="form-control form-control-sm rounded-3" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Offer Letter Template" />
                                        </div>
                                        <div className="col-md-4">
                                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Category *</label>
                                            <select className="form-select form-select-sm rounded-3" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                                {categories.map((c, i) => (
                                                    <option key={i} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>🌐 Website Resource URL</label>
                                            <input type="url" className="form-control form-control-sm rounded-3" value={form.websiteResource} onChange={e => setForm({ ...form, websiteResource: e.target.value })} placeholder="https://example.com/resource" />
                                        </div>
                                        <div className="col-md-6">
                                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>📰 Blog Post Title/Link</label>
                                            <input className="form-control form-control-sm rounded-3" value={form.blogPost} onChange={e => setForm({ ...form, blogPost: e.target.value })} placeholder="e.g. How to write offer letters" />
                                        </div>
                                        <div className="col-12">
                                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Template Content *</label>
                                            <textarea required className="form-control form-control-sm rounded-3" rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Enter letter template content..." />
                                            <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: 4 }}>Tip: Use {'{{employee_name}}'}, {'{{date}}'}, {'{{designation}}'} as dynamic variables</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                    <button type="button" onClick={() => setShowModal(false)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Cancel</button>
                                    <button type="submit" style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#2563eb', border: 'none', color: '#fff', fontWeight: 700 }}>{editingId ? 'Update Template' : 'Add Template'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateUI;
