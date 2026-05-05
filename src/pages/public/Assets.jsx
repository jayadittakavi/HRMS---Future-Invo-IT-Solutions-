import React from 'react';
import { FaLaptop, FaDesktop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import ModuleInfoPage from './ModuleInfoPage';

const features = [
    { icon: <FaLaptop />,    title: "Laptop Tracking",    desc: "Monitor laptop assignments and specifications." },
    { icon: <FaDesktop />,   title: "Desktop Management", desc: "Manage office desktops and peripherals." },
    { icon: <FaTabletAlt />, title: "Mobile Devices",     desc: "Track tablets and smartphones distributed to staff." },
    { icon: <FaMobileAlt />, title: "Software Licenses",  desc: "Manage software subscriptions and keys." },
];

const Assets = () => (
    <ModuleInfoPage
        title="Asset Management"
        subtitle="Track and manage your company's physical assets efficiently."
        description="Keep track of laptops, monitors, software licenses, and other equipment assigned to employees. Ensure accountability and streamline asset allocation across your entire organisation."
        features={features}
        heroIcon={<FaLaptop />}
    />
);

export default Assets;
