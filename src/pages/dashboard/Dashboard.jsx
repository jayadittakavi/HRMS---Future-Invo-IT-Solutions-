import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboardstyle.css';
import logo from '../../assets/images/fislogo1.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ role: 'guest', email: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }

    // Responsive sidebar
    const handleResize = () => {
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Companies', icon: '🏢', path: '/companies' },
    { name: 'Branches', icon: '🌴', path: '/branches' },
    { name: 'Departments', icon: '👥', path: '/departments' },
    { name: 'Assets', icon: '💻', path: '/assets' },
    { name: 'Employees', icon: '👷', path: '/employees' },
    { name: 'User Management', icon: '⚙️', path: '/users', role: ['superadmin', 'admin'] },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <img src={logo} alt="HRMS" className="sidebar-logo" />
          <span className="brand-name">Future Invo</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => {
              // Simple role check: if item has role prop, user.role must be in it
              if (item.role && !item.role.includes(user.role)) return null;

              return (
                <li key={item.name} className={item.name === 'Dashboard' ? 'active' : ''}>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <span className="icon">{item.icon}</span>
                    <span className="label">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="icon">🚪</span>
            <span className="label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Header */}
        <header className="dashboard-header">
          <button
            className="menu-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>

          <div className="header-right">
            <div className="notification-bell">
              🔔 <span className="badge">3</span>
            </div>
            <div className="user-profile">
              <div className="avatar">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <p className="user-name">User</p>
                <p className="user-role">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard View */}
        <div className="dashboard-grid">
          <div className="welcome-banner">
            <h2>Welcome back, {user.role}!</h2>
            <p>Here's what's happening with your workforce today.</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-row">
            <div className="d-card stat">
              <div className="stat-icon p-blue">👥</div>
              <div>
                <h4>Total Employees</h4>
                <p className="stat-value">1,234</p>
              </div>
            </div>
            <div className="d-card stat">
              <div className="stat-icon p-green">📝</div>
              <div>
                <h4>Attendance</h4>
                <p className="stat-value">95%</p>
              </div>
            </div>
            <div className="d-card stat">
              <div className="stat-icon p-orange">⚠️</div>
              <div>
                <h4>Leave Requests</h4>
                <p className="stat-value">12</p>
              </div>
            </div>
            <div className="d-card stat">
              <div className="stat-icon p-purple">💼</div>
              <div>
                <h4>Open Jobs</h4>
                <p className="stat-value">5</p>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="content-row">
            <div className="d-card recent-activity">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                <li>
                  <span className="dot blue"></span>
                  <div>
                    <p><strong>New Employee:</strong> Sarah Jones joined Engineering</p>
                    <span className="time">2 hours ago</span>
                  </div>
                </li>
                <li>
                  <span className="dot green"></span>
                  <div>
                    <p><strong>Policy Update:</strong> Leave policy updated</p>
                    <span className="time">Yesterday</span>
                  </div>
                </li>
                <li>
                  <span className="dot orange"></span>
                  <div>
                    <p><strong>Asset Assigned:</strong> MacBook Pro to Mike Ross</p>
                    <span className="time">2 days ago</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="d-card department-stats">
              <h3>Department Distribution</h3>
              <div className="chart-placeholder">
                <div className="bar" style={{ height: '60%' }} tooltip="Engineering"></div>
                <div className="bar" style={{ height: '80%' }} tooltip="Sales"></div>
                <div className="bar" style={{ height: '40%' }} tooltip="HR"></div>
                <div className="bar" style={{ height: '50%' }} tooltip="Marketing"></div>
              </div>
              <div className="chart-labels">
                <span>Eng</span>
                <span>Sales</span>
                <span>HR</span>
                <span>Mkt</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
