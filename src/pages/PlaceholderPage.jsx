import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const PlaceholderPage = ({ title }) => {
    return (
        <DashboardLayout title={title}>
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
                <h2>{title} - Coming Soon</h2>
                <p style={{ color: '#64748b' }}>This feature is currently under development.</p>
            </div>
        </DashboardLayout>
    );
};

export default PlaceholderPage;
