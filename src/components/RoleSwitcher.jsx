import React from 'react';
import { useAuth } from '../context/AuthContext';

const RoleSwitcher = () => {
    const { user, changeRole } = useAuth();

    const roles = [
        'superadmin',
        'admin',
        'manager',
        'hr',
        'accountant',
        'employee'
    ];

    if (!user) return null;

    return (
        <div className="dropdown d-inline-block me-3">
            <button
                className="btn btn-outline-primary btn-sm dropdown-toggle rounded-pill"
                type="button"
                id="roleSwitcherDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Switch Role: <strong className="text-uppercase">{user.role}</strong>
            </button>
            <ul className="dropdown-menu shadow border-0" aria-labelledby="roleSwitcherDropdown">
                <li><h6 className="dropdown-header">Select Role</h6></li>
                {roles.map(role => (
                    <li key={role}>
                        <button
                            className={`dropdown-item ${user.role === role ? 'active' : ''}`}
                            onClick={() => changeRole(role)}
                        >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleSwitcher;
