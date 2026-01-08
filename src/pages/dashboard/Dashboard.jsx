import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboardstyle.css';
import logo from '../../assets/images/fislogo1.png';
import {
  FaTachometerAlt,
  FaBuilding,
  FaCodeBranch,
  FaSitemap,
  FaLaptop,
  FaUsers,
  FaUserCog,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaClipboardList,
  FaExclamationTriangle,
  FaBriefcase,
  FaLayerGroup,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCalendarCheck,
  FaArrowRight,
  FaClock
} from 'react-icons/fa';

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
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Companies', icon: <FaBuilding />, path: '/companies' },
    { name: 'Branches', icon: <FaCodeBranch />, path: '/branches' },
    { name: 'Departments', icon: <FaSitemap />, path: '/departments' },
    { name: 'Assets', icon: <FaLaptop />, path: '/assets' },
    { name: 'Asset Categories', icon: <FaLayerGroup />, path: '/asset-categories' },
    { name: 'Pay Grade', icon: <FaMoneyBillWave />, path: '/pay-grade' },
    { name: 'Financial Year', icon: <FaCalendarAlt />, path: '/financial-year' },
    { name: 'Leave Management', icon: <FaCalendarCheck />, path: '/leave-management' },
    { name: 'Attendance', icon: <FaClock />, path: '/attendance' },
    { name: 'Employees', icon: <FaUsers />, path: '/employees' },
    { name: 'User Management', icon: <FaUserCog />, path: '/users', role: ['superadmin', 'admin'] },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <img src={logo} alt="HRMS" className="sidebar-logo" />
          <div className="header-text">
            <span className="brand-name">HRMS</span>
            <span className="brand-sub">Future Invo IT Solutions</span>
          </div>
        </div>

        <div style={{ padding: '0 1rem', marginBottom: '1rem', color: '#fff', fontSize: '0.85rem' }}>
          <p>Role : Super Admin</p>
          <h4 style={{ marginTop: '10px', fontWeight: 'bold' }}>Navigation</h4>
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
            <span className="icon"><FaSignOutAlt /></span>
            <span className="label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Header */}
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left-links">
            <a href="#">Home</a>
            <a href="#">My Space</a>
            <a href="#">Features</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>

          <div className="header-right">
            <a href="/login" className="header-link">Login</a>
            <a href="/signup" className="header-link">Signup</a>
          </div>
        </header>

        {/* Dashboard View */}
        <div className="dashboard-grid">
          <div className="welcome-banner-simple">
            <h2>Welcome Meera Krishnan!</h2>
            <div className="status-badge">
              <span>Process Pay Run for May 2024</span>
              <span className="badge-approved">APPROVED</span>
            </div>
          </div>

          {/* Row 1 */}
          <div className="stats-row three-col">
            <div className="d-card stat-box">
              <h4>Employees Net Pay</h4>
              <p className="stat-value big">₹17,25,23,654.00</p>
              <p className="stat-sub">Pay Date: <strong>31 May 2024</strong></p>
            </div>
            <div className="d-card stat-box">
              <h4>No. of Employees</h4>
              <p className="stat-value big">1308</p>
              <button className="view-details-btn">View Details</button>
            </div>
            <div className="d-card stat-box">
              <h4>To Do Tasks</h4>
              <ul className="todo-list">
                <li>136 Reimbursements</li>
                <li>96 Investments</li>
                <li>55 Salary Revisions</li>
              </ul>
            </div>
          </div>

          {/* Row 2 */}
          <div className="stats-row three-col">
            <div className="d-card stat-box">
              <h4>Deduction Summary</h4>
              <div className="summary-list">
                <p>EPF: ₹39,73,913</p>
                <p>ESI: ₹89,010</p>
                <p>TDS: ₹1,15,89,089</p>
              </div>
            </div>
            <div className="d-card stat-box">
              <h4>Employee Summary</h4>
              <p className="stat-value big">1308</p>
              <p className="stat-sub">Active Employees</p>
            </div>
            <div className="d-card stat-box">
              <h4>Payment Updates</h4>
              <ul className="check-list">
                <li>✓ Salary Processed</li>
                <li>✓ Tax Calculated</li>
                <li>✓ Payslips Generated</li>
              </ul>
            </div>
          </div>

          {/* Row 3 - Charts */}
          <div className="content-row">
            <div className="d-card chart-card">
              <h3>Payroll Cost Summary (This Year)</h3>
              <div className="chart-bars">
                {/* Mock Bars */}
                <div className="bar-group"><div className="bar b1"></div><span>Net Pay</span></div>
                <div className="bar-group"><div className="bar b2"></div><span>Taxes</span></div>
                <div className="bar-group"><div className="bar b3"></div><span>Statutories</span></div>
                <div className="bar-group"><div className="bar b4"></div><span>Deductions</span></div>
              </div>
            </div>

            <div className="d-card calendar-card">
              <div className="calendar-header">
                <h4>January 2026</h4>
                <div className="cal-nav">
                  <button>Prev</button>
                  <button>Next</button>
                </div>
              </div>
              <div className="calendar-grid">
                <span className="day-name">Sun</span><span className="day-name">Mon</span><span className="day-name">Tue</span><span className="day-name">Wed</span><span className="day-name">Thu</span><span className="day-name">Fri</span><span className="day-name">Sat</span>
                <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
                <span>5</span><span>6</span><span>7</span><span className="active-day">8</span><span>9</span><span>10</span><span>11</span>
                <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
                <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span></span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
