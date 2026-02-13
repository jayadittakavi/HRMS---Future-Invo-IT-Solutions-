import OverallStats from './components/OverallStats';
import MySpace from './components/MySpace';

// ... (keep existing imports)

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');
    const [dashboardType, setDashboardType] = useState('overall'); // 'overall' or 'myspace'

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    // ... (keep unused data if you want, or better, remove them to clean up)

    return (
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome & Dashboard Toggle */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 className="h4 fw-bold text-main mb-1">Welcome {user?.name || 'Admin'}!</h2>
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
                        {dashboardType === 'overall' ? <OverallStats /> : <MySpace role="Admin" />}
                    </>
                )}


                {activeView === 'daily-task' && <DailyTaskContent />}
                {activeView === 'loans' && <LoansContent />}
                {activeView === 'travel-expenses' && <TravelExpensesContent />}
                {activeView === 'attendance' && <AttendanceContent />}
                {activeView === 'companies' && <CompaniesContent />}
                {activeView === 'branches' && <BranchesContent />}
                {activeView === 'departments' && <DepartmentsContent />}
                {activeView === 'assets' && <AssetsContent />}
                {activeView === 'asset-categories' && <AssetCategoriesContent />}
                {activeView === 'employees' && <EmployeesContent />}
                {activeView === 'payroll' && <PayrollContent />}
                {activeView === 'financial-year' && <FinancialYearContent />}
                {activeView === 'leave-management' && <LeaveManagementContent />}
                {activeView === 'users' && <UserManagementContent />}
                {activeView === 'pay-grade' && <PayGradeContent />}
                {activeView === 'profile' && <ProfileContent />}
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
