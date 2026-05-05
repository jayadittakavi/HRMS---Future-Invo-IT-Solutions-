import React from 'react';
import { FaUserPlus, FaFileContract, FaUserTie, FaAddressCard } from 'react-icons/fa';
import ModuleInfoPage from './ModuleInfoPage';

const features = [
    { icon: <FaUserTie />,      title: "Detailed Profiles",     desc: "Store comprehensive employee data, from contact info to skills." },
    { icon: <FaFileContract />, title: "Contract Management",   desc: "Manage employment contracts, renewals, and terminations." },
    { icon: <FaAddressCard />,  title: "Digital ID Cards",      desc: "Generate and manage digital identification cards." },
    { icon: <FaUserPlus />,     title: "Recruitment Pipeline",  desc: "Track applicants and streamline the hiring process." },
];

const EmployeesInfo = () => (
    <ModuleInfoPage
        title="Employee Directory"
        subtitle="Centralised database for all employee records."
        description="Manage employee profiles, contracts, benefits, and personal details securely. Access key information anytime, anywhere — from any device across your organisation."
        features={features}
        heroIcon={<FaUserTie />}
    />
);

export default EmployeesInfo;
