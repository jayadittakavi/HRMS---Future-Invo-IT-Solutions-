import OverallStats from './components/OverallStats';
import MySpace from './components/MySpace';

// ... (keep existing imports)

const SuperAdminDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');
    const [dashboardType, setDashboardType] = useState('overall'); // 'overall' or 'myspace'

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    // ... (keep calendar logic if needed, but remove old chart data if unused)

    // Calendar Generation Helper (retained for now if needed, else can remove)
    const renderCalendarDays = () => {
        // ... (keep existing logic)
        const days = [];
        const startingEmpty = 4;
        const totalDays = 31;
        for (let i = 0; i < startingEmpty; i++) days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        for (let i = 1; i <= totalDays; i++) {
            const isActive = i === 17;
            days.push(<div key={i} className={`calendar-day ${isActive ? 'active' : ''}`}>{i}</div>);
        }
        return days;
    };

    return (
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome & Dashboard Toggle */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 className="h4 fw-bold text-main mb-1">Welcome {user?.name || 'Super Admin'}!</h2>
                                <p className="text-secondary small mb-0">Here's what's happening today.</p>
                            </div>
                            <div className="bg-light p-1 rounded-pill d-flex border">
                                <button
                                    className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'overall' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                    onClick={() => setDashboardType('overall')}
                                >
                                    Organization Overview
                                </button>
                                <button
                                    className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'myspace' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                    onClick={() => setDashboardType('myspace')}
                                >
                                    My Space
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        {dashboardType === 'overall' ? <OverallStats /> : <MySpace role="Super Admin" />}
                    </>
                )}

                {activeView === 'companies' && <CompaniesContent />}
                {activeView === 'employees' && <EmployeesContent />}
                {activeView === 'payroll' && <PayrollContent />}
                {activeView === 'financial-year' && <FinancialYearContent />}
                {activeView === 'leave-management' && <LeaveManagementContent />}
                {activeView === 'users' && <UserManagementContent />}
                {activeView === 'attendance' && <AttendanceContent />}
                {activeView === 'pay-grade' && <PayGradeContent />}
                {activeView === 'profile' && <ProfileContent />}
                {activeView === 'audit-logs' && <AuditLogs role="superadmin" />}
            </div>
        </DashboardLayout >
    );
};

export default SuperAdminDashboard;
