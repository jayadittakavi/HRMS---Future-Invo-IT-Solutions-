import React from 'react';
import { FaCalendarTimes, FaPlane, FaHospitalUser, FaBabyCarriage } from 'react-icons/fa';
import ModuleInfoPage from './ModuleInfoPage';

const features = [
    { icon: <FaCalendarTimes />,  title: "Leave Policies",      desc: "Define custom leave policies for different roles." },
    { icon: <FaPlane />,          title: "Vacation Planning",   desc: "Plan and approve long-term leaves efficiently." },
    { icon: <FaHospitalUser />,   title: "Sick Leaves",         desc: "Manage medical leaves with document uploads." },
    { icon: <FaBabyCarriage />,   title: "Maternity/Paternity", desc: "Handle special leave types with ease." },
];

const LeavesInfo = () => (
    <ModuleInfoPage
        title="Leave Management"
        subtitle="Automated leave tracking and approval workflows."
        description="Simplify the leave application process. Employees can request leaves, check balances, and managers can approve or reject with a single click — no paperwork needed."
        features={features}
        heroIcon={<FaCalendarTimes />}
    />
);

export default LeavesInfo;
