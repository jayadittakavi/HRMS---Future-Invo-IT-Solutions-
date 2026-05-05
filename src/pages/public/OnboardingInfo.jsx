import React from 'react';
import { FaUserCheck, FaBookOpen, FaTasks, FaBullhorn } from 'react-icons/fa';
import ModuleInfoPage from './ModuleInfoPage';

const features = [
    { icon: <FaUserCheck />, title: "Pre-boarding",       desc: "Engage candidates before they join." },
    { icon: <FaBookOpen />,  title: "Digital Handbook",   desc: "Share company policies and culture instantly." },
    { icon: <FaTasks />,     title: "Task Checklists",    desc: "Assign setup tasks to IT, HR, and Managers." },
    { icon: <FaBullhorn />,  title: "Team Announcements", desc: "Introduce new members to the whole team." },
];

const OnboardingInfo = () => (
    <ModuleInfoPage
        title="Seamless Onboarding"
        subtitle="Welcome your new hires with a digital-first experience."
        description="Ensure a standardised and engaging process for every new employee. Automate paperwork, task assignments, and orientation so new hires feel at home from day one."
        features={features}
        heroIcon={<FaUserCheck />}
    />
);

export default OnboardingInfo;
