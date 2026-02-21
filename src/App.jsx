import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SettingsDrawer from "./pages/settings/SettingsDrawer";
import NotificationDrawer from "./pages/common/NotificationDrawer"; // Added
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext"; // Added
import ProtectedRoute from "./components/ProtectedRoute";

/* Public Pages */
import Welcome from "./pages/public/welcome/Welcome";
import Home from "./pages/public/home/Index";
import Features from "./pages/public/Features";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Assets from "./pages/public/Assets";
import AttendanceInfo from "./pages/public/AttendanceInfo";
import EmployeesInfo from "./pages/public/EmployeesInfo";
import LeavesInfo from "./pages/public/LeavesInfo";
import OnboardingInfo from "./pages/public/OnboardingInfo";
import PayrollInfo from "./pages/public/PayrollInfo";
import Docs from "./pages/public/Docs";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";

/* Auth Pages */
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import SignupOtp from "./pages/auth/signup/otp/SignupOtp";
import Otp from "./pages/auth/otp/Otp";
import ResetOtp from "./pages/auth/otp/ResetOtp";
import ForgotPassword from "./pages/auth/forgetpassword/Forgetpassword";
import ResetPassword from "./pages/auth/resetpassword/ResetPassword";

/* Dashboard Layout & Manager */
import DashboardManager from "./pages/dashboards/DashboardManager";
import DashboardLayout from "./components/layout/DashboardLayout";
import MySpace from "./pages/dashboards/components/MySpace";
import MyTeam from "./pages/dashboards/components/MyTeam";

/* Audit Logs */
import SuperAdminAuditLogs from "./pages/superadmin/AuditLogs";
import AdminAuditLogs from "./pages/admin/AuditLogs";

/* Individual Dashboards */
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';
import HRDashboard from './pages/dashboards/HRDashboard';
import EmployeeDashboard from './pages/dashboards/EmployeeDashboard';
import AccountantDashboard from './pages/dashboards/AccountantDashboard';
import NewUserDashboard from './pages/dashboards/NewUserDashboard';

/* Module Pages */
/* Core */
import Companies from "./pages/modules/core/companies/Companies";
import Branches from "./pages/modules/core/branches/Branches";
import Departments from "./pages/modules/core/departments/Departments";
import SetupOrganization from "./pages/modules/core/setup_organization/SetupOrganization";
import UserManagement from "./pages/modules/core/user_management/UserManagement";

/* HR */
import Employees from "./pages/modules/hr/employees/Employees";
import AddMember from "./pages/modules/hr/employees/AddMember";
import CreateUsername from "./pages/modules/hr/employees/CreateUsername";
import WFHRequests from "./pages/modules/hr/wfh/WFHRequests";
import Attendance from "./pages/attendance/Attendance";
import LeaveManagement from "./pages/modules/hr/leave_management/LeaveManagement";
import Profile from "./pages/modules/hr/profile/Profile";
import MyDocuments from "./pages/modules/hr/documents/MyDocuments";
import MyPerformance from "./pages/modules/hr/performance/MyPerformance";
import Recruitment from "./pages/modules/hr/recruitment/Recruitment";
import Training from "./pages/modules/hr/training/Training";
import PerformanceReviews from "./pages/modules/hr/performance/PerformanceReviews";
import Documents from "./pages/modules/hr/documents/Documents";

import Onboarding from "./pages/modules/hr/onboarding/Onboarding";

/* Administration */
import Delegation from "./pages/modules/administration/delegation/Delegation";
import Visitor from "./pages/modules/administration/visitor/Visitor";
import DeskBooking from "./pages/modules/administration/desk/DeskBooking";

/* Finance */
import Payroll from "./pages/modules/finance/payroll/Payroll";
import Loans from "./pages/modules/finance/loans/Loans";
import TravelExpenses from "./pages/modules/finance/travel_expenses/TravelExpenses";
import PayGrade from "./pages/modules/finance/pay_grade/PayGrade";
import Calendar from "./pages/modules/operations/calendar/Calendar";

import DailyTask from "./pages/modules/operations/daily_task/DailyTask";

import ChangePassword from "./pages/settings/ChangePassword";
import PlaceholderPage from "./pages/public/PlaceholderPage";
import NotificationsPage from "./pages/common/NotificationsPage"; // Added
import WhatsAppChat from "./components/common/WhatsAppChat";

function AppContent() {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/employee-directory') ||
    location.pathname.startsWith('/attendance') ||
    location.pathname.startsWith('/leave-requests') ||
    location.pathname.startsWith('/payroll') ||
    location.pathname.startsWith('/profile');

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/feature/attendance" element={<AttendanceInfo />} />
        <Route path="/employees" element={<EmployeesInfo />} />
        <Route path="/leaves" element={<LeavesInfo />} />
        <Route path="/feature/onboarding" element={<OnboardingInfo />} />
        <Route path="/payroll" element={<PayrollInfo />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-otp" element={<SignupOtp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset-otp" element={<ResetOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/setup-organization" element={<SetupOrganization />} />
        <Route path="/calendar" element={<Calendar />} />

        {/* Dashboard Routes - Nested under DashboardLayout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardManager />} />

          {/* Shared Views */}
          <Route path="my-space" element={<MySpace />} />
          <Route path="my-team" element={<MyTeam />} />

          {/* Role Specific Dashboards */}
          <Route path="super-admin" element={<ProtectedRoute requiredRoles={['superadmin']}><SuperAdminDashboard /></ProtectedRoute>} />
          <Route path="admin" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="manager" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'manager']}><ManagerDashboard /></ProtectedRoute>} />
          <Route path="hr" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'manager', 'hr']}><HRDashboard /></ProtectedRoute>} />
          <Route path="employee" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'manager', 'hr', 'employee']}><EmployeeDashboard /></ProtectedRoute>} />
          <Route path="accountant" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'accountant']}><AccountantDashboard /></ProtectedRoute>} />
          <Route path="new-user" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'hr', 'newuser']}><NewUserDashboard /></ProtectedRoute>} />
        </Route>

        <Route
          path="/attendance"
          element={
            <ProtectedRoute requiredRoles={['superadmin', 'admin', 'hr', 'manager', 'employee']}>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route path="/daily-task" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><DailyTask /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><PlaceholderPage title="Tasks" /></ProtectedRoute>} />
        <Route path="/loans" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Loans /></ProtectedRoute>} />
        <Route path="/travel-expenses" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><TravelExpenses /></ProtectedRoute>} />
        <Route path="/leave-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><LeaveManagement /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute requiredRoles={['superadmin']}><UserManagement /></ProtectedRoute>} />

        {/* Administration - Delegation, Visitor, Desk */}
        <Route path="/delegation" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'manager', 'hr']}><Delegation /></ProtectedRoute>} />
        <Route path="/visitors" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'hr']}><Visitor /></ProtectedRoute>} />
        <Route path="/desk-booking" element={<ProtectedRoute><DeskBooking /></ProtectedRoute>} />

        {/* Audit Logs */}
        <Route path="/super-admin/audit-logs" element={<ProtectedRoute requiredRoles={['superadmin']}><SuperAdminAuditLogs /></ProtectedRoute>} />
        <Route path="/admin/audit-logs" element={<ProtectedRoute requiredRoles={['admin', 'superadmin']}><AdminAuditLogs /></ProtectedRoute>} />

        {/* Additional Dashboard Routes */}
        <Route path="/companies" element={<ProtectedRoute requiredRoles={['superadmin']}><Companies /></ProtectedRoute>} />
        <Route path="/branches" element={<ProtectedRoute requiredRoles={['superadmin']}><Branches /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'accountant']}><PlaceholderPage title="Reports" /></ProtectedRoute>} />

        {/* HR Routes */}
        <Route path="/employee-directory" element={<ProtectedRoute requiredRoles={['superadmin', 'hr', 'admin']}><Employees /></ProtectedRoute>} />
        <Route path="/add-member" element={<ProtectedRoute requiredRoles={['superadmin', 'hr', 'admin']}><AddMember /></ProtectedRoute>} />
        <Route path="/create-username" element={<ProtectedRoute requiredRoles={['superadmin', 'hr', 'admin']}><CreateUsername /></ProtectedRoute>} />
        <Route path="/wfh-requests" element={<ProtectedRoute requiredRoles={['superadmin', 'hr', 'admin', 'manager']}><WFHRequests /></ProtectedRoute>} />
        <Route path="/recruitment" element={<ProtectedRoute requiredRoles={['hr']}><Recruitment /></ProtectedRoute>} />
        <Route path="/training" element={<ProtectedRoute requiredRoles={['hr']}><Training /></ProtectedRoute>} />
        <Route path="/performance-reviews" element={<ProtectedRoute requiredRoles={['hr']}><PerformanceReviews /></ProtectedRoute>} />
        <Route path="/documents" element={<ProtectedRoute requiredRoles={['hr']}><Documents /></ProtectedRoute>} />
        <Route path="/leave-requests" element={<ProtectedRoute requiredRoles={['hr', 'manager']}><LeaveManagement /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute requiredRoles={['superadmin', 'hr']}><Onboarding /></ProtectedRoute>} />

        {/* Manager Routes */}
        <Route path="/team-members" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Team Members" /></ProtectedRoute>} />
        <Route path="/team-attendance" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Team Attendance" /></ProtectedRoute>} />
        <Route path="/leave-approvals" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Leave Approvals" /></ProtectedRoute>} />
        <Route path="/performance-feedback" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Performance Feedback" /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Goals & Targets" /></ProtectedRoute>} />
        <Route path="/my-team" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="My Team" /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Projects" /></ProtectedRoute>} />
        <Route path="/performance" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Performance" /></ProtectedRoute>} />
        <Route path="/team-reports" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Team Reports" /></ProtectedRoute>} />

        {/* Accountant Routes */}
        <Route path="/payroll-processing" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Payroll Processing" /></ProtectedRoute>} />
        <Route path="/salary-structure" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Salary Structure" /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/payroll-dashboard" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'hr', 'manager']}><Payroll /></ProtectedRoute>} />
        <Route path="/payslips" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'accountant']}><Payroll /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Invoices" /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Expenses" /></ProtectedRoute>} />
        <Route path="/pay-grades" element={<ProtectedRoute requiredRoles={['superadmin', 'accountant']}><PayGrade /></ProtectedRoute>} />
        <Route path="/tax-deductions" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Tax & Deductions" /></ProtectedRoute>} />
        <Route path="/financial-reports" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Financial Reports" /></ProtectedRoute>} />

        {/* Employee Personal Routes */}
        <Route path="/my-leaves" element={<ProtectedRoute><LeaveManagement personal={true} /></ProtectedRoute>} />
        <Route path="/my-attendance" element={<ProtectedRoute><Attendance personal={true} /></ProtectedRoute>} />
        <Route path="/my-payslips" element={<ProtectedRoute><Payroll personal={true} /></ProtectedRoute>} />
        <Route path="/my-documents" element={<ProtectedRoute><MyDocuments /></ProtectedRoute>} />
        <Route path="/my-performance" element={<ProtectedRoute><MyPerformance /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/designations" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><PlaceholderPage title="Designations" /></ProtectedRoute>} />
        <Route path="/payroll-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Payroll /></ProtectedRoute>} />
        <Route path="/performance-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><PlaceholderPage title="Performance Management" /></ProtectedRoute>} />

        {/* New User Routes */}
        <Route path="/welcome" element={<ProtectedRoute requiredRoles={['newuser']}><NewUserDashboard /></ProtectedRoute>} />
        <Route path="/complete-profile" element={<ProtectedRoute requiredRoles={['newuser']}><PlaceholderPage title="Complete Profile" /></ProtectedRoute>} />
        <Route path="/upload-documents" element={<ProtectedRoute requiredRoles={['newuser']}><PlaceholderPage title="Upload Documents" /></ProtectedRoute>} />
        <Route path="/policies" element={<ProtectedRoute requiredRoles={['newuser']}><PlaceholderPage title="View Policies" /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute requiredRoles={['newuser']}><PlaceholderPage title="Help & Support" /></ProtectedRoute>} />

        <Route path="*" element={<Login />} />
      </Routes>
      <SettingsDrawer />
      <NotificationDrawer />
      {!isDashboardPage && <WhatsAppChat />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
