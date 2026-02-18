import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import OverallStats from './OverallStats';
import ManagerOverallStats from './ManagerOverallStats';
import HROverallStats from './HROverallStats';

const MyTeam = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase();

    if (role === 'superadmin' || role === 'admin') {
        return <OverallStats />;
    }
    if (role === 'hr') {
        return <HROverallStats />;
    }
    if (role === 'manager') {
        return <ManagerOverallStats />;
    }

    return <div className="p-4 text-center">Your role does not have a Team View.</div>;
};

export default MyTeam;
