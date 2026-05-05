import React from 'react';
import { FaFingerprint, FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import ModuleInfoPage from './ModuleInfoPage';

const features = [
    { icon: <FaFingerprint />,   title: "Biometric Integration", desc: "Seamlessly integrate with biometric devices for punch-in." },
    { icon: <FaMapMarkerAlt />,  title: "Geo-Fencing",           desc: "Restrict attendance marking to designated office zones." },
    { icon: <FaClock />,         title: "Overtime Tracking",     desc: "Automatically calculate and approve overtime hours." },
    { icon: <FaCalendarAlt />,   title: "Work Schedules",        desc: "Manage shifts, holidays, and weekly offs effortlessly." },
];

const AttendanceInfo = () => (
    <ModuleInfoPage
        title="Attendance System"
        subtitle="Real-time attendance tracking for a productive workforce."
        description="Ensure smooth operations with biometric integration, geo-fencing, and manual overrides. Simplify attendance reporting and payroll accuracy across all locations."
        features={features}
        heroIcon={<FaFingerprint />}
    />
);

export default AttendanceInfo;
