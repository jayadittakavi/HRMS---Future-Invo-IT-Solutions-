import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import TeamDashboard from './TeamDashboard';

const MyTeam = () => {
    const { user } = useAuth();
    return <TeamDashboard role={user?.role?.toLowerCase()} />;
};

export default MyTeam;
