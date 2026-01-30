import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingsDrawer from "./pages/settings/SettingsDrawer";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* Public Pages */
import Welcome from "./pages/public/welcome/Welcome";
import Home from "./pages/public/home/Index";
import Features from "./pages/public/Features";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";

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
import Attendance from "./pages/modules/hr/attendance/Attendance";
import LeaveManagement from "./pages/modules/hr/leave_management/LeaveManagement";
import Profile from "./pages/modules/hr/profile/Profile";
import MyDocuments from "./pages/modules/hr/documents/MyDocuments";
import MyPerformance from "./pages/modules/hr/performance/MyPerformance";

/* Finance */
import Payroll from "./pages/modules/finance/payroll/Payroll";
import Loans from "./pages/modules/finance/loans/Loans";
import TravelExpenses from "./pages/modules/finance/travel_expenses/TravelExpenses";
import Calendar from "./pages/modules/operations/calendar/Calendar";
import Assets from "./pages/modules/operations/assets/Assets";

import DailyTask from "./pages/modules/operations/daily_task/DailyTask";

import ChangePassword from "./pages/settings/ChangePassword";
import PlaceholderPage from "./pages/public/PlaceholderPage";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup-otp" element={<SignupOtp />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset-otp" element={<ResetOtp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/setup-organization" element={<SetupOrganization />} />
            <Route path="/calendar" element={<Calendar />} />

            {/* Dashboard Redirector */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardManager />
                </ProtectedRoute>
              }
            />

            {/* Role-Specific Dashboard Routes */}
            <Route
              path="/dashboard/super-admin"
              element={
                <ProtectedRoute requiredRoles={['superadmin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute requiredRoles={['superadmin', 'admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/manager"
              element={
                <ProtectedRoute requiredRoles={['superadmin', 'admin', 'manager']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/hr"
              element={
                <ProtectedRoute requiredRoles={['superadmin', 'admin', 'manager', 'hr']}>
                  <HRDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/employee"
              element={
                <ProtectedRoute requiredRoles={['superadmin', 'admin', 'manager', 'hr', 'employee']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/accountant"
              element={
                <ProtectedRoute requiredRoles={['superadmin', 'admin', 'accountant']}>
                  <AccountantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/new-user"
              element={
                <ProtectedRoute requiredRoles={['superadmin', 'admin', 'hr', 'newuser']}>
                  <NewUserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/attendance"
              element={
                <ProtectedRoute requiredRoles={['hr']}>
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route path="/attendance-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'hr', 'manager', 'accountant']}><Attendance /></ProtectedRoute>} />
            import DailyTask from "./pages/daily_task/DailyTask";
            import Loans from "./pages/loans/Loans";
            import TravelExpenses from "./pages/travel_expenses/TravelExpenses";

            // ... (in the routes section)

            <Route path="/daily-task" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><DailyTask /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><PlaceholderPage title="Tasks" /></ProtectedRoute>} />
            <Route path="/loans" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Loans /></ProtectedRoute>} />
            <Route path="/travel-expenses" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><TravelExpenses /></ProtectedRoute>} />
            <Route path="/payslips" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Payroll /></ProtectedRoute>} />

            <Route path="/leave-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><LeaveManagement /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Assets /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Assets /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute requiredRoles={['superadmin']}><UserManagement /></ProtectedRoute>} />

            {/* Additional Dashboard Routes */}

            <Route path="/companies" element={<ProtectedRoute requiredRoles={['superadmin']}><Companies /></ProtectedRoute>} />
            <Route path="/branches" element={<ProtectedRoute requiredRoles={['superadmin']}><Branches /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'accountant']}><PlaceholderPage title="Reports" /></ProtectedRoute>} />
            <Route path="/recruitment" element={<ProtectedRoute requiredRoles={['hr']}><PlaceholderPage title="Recruitment" /></ProtectedRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute requiredRoles={['hr']}><PlaceholderPage title="Onboarding" /></ProtectedRoute>} />
            <Route path="/my-team" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="My Team" /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Projects" /></ProtectedRoute>} />
            <Route path="/leave-requests" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Leave Requests" /></ProtectedRoute>} />
            <Route path="/performance" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Performance" /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Invoices" /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Expenses" /></ProtectedRoute>} />

            {/* Employee Personal Routes */}
            <Route path="/my-leaves" element={<ProtectedRoute><LeaveManagement personal={true} /></ProtectedRoute>} />
            <Route path="/my-attendance" element={<ProtectedRoute><Attendance personal={true} /></ProtectedRoute>} />
            <Route path="/my-payslips" element={<ProtectedRoute><Payroll personal={true} /></ProtectedRoute>} />
            <Route path="/my-documents" element={<ProtectedRoute><MyDocuments /></ProtectedRoute>} />
            <Route path="/my-performance" element={<ProtectedRoute><MyPerformance /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

            {/* Fallback */}
            {/* Admin Routes */}
            <Route path="/designations" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><PlaceholderPage title="Designations" /></ProtectedRoute>} />
            {/* <Route path="/attendance-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Attendance /></ProtectedRoute>} /> */}
            <Route path="/payroll-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Payroll /></ProtectedRoute>} />
            <Route path="/performance-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><PlaceholderPage title="Performance Management" /></ProtectedRoute>} />

            {/* HR Routes */}
            <Route path="/employee-directory" element={<ProtectedRoute requiredRoles={['hr', 'admin']}><Employees /></ProtectedRoute>} />
            <Route path="/training" element={<ProtectedRoute requiredRoles={['hr']}><PlaceholderPage title="Training" /></ProtectedRoute>} />
            <Route path="/performance-reviews" element={<ProtectedRoute requiredRoles={['hr']}><PlaceholderPage title="Performance Reviews" /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute requiredRoles={['hr']}><PlaceholderPage title="Documents" /></ProtectedRoute>} />
            <Route path="/hr-reports" element={<ProtectedRoute requiredRoles={['hr']}><PlaceholderPage title="HR Reports" /></ProtectedRoute>} />

            {/* Manager Routes */}
            <Route path="/team-members" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Team Members" /></ProtectedRoute>} />
            <Route path="/team-attendance" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Team Attendance" /></ProtectedRoute>} />
            <Route path="/leave-approvals" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Leave Approvals" /></ProtectedRoute>} />
            <Route path="/performance-feedback" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Performance Feedback" /></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Goals & Targets" /></ProtectedRoute>} />
            <Route path="/team-reports" element={<ProtectedRoute requiredRoles={['manager']}><PlaceholderPage title="Team Reports" /></ProtectedRoute>} />

            {/* Accountant Routes */}
            <Route path="/payroll-processing" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Payroll Processing" /></ProtectedRoute>} />
            <Route path="/salary-structure" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Salary Structure" /></ProtectedRoute>} />
            <Route path="/payslips" element={<ProtectedRoute requiredRoles={['accountant', 'employee']}><PlaceholderPage title="Payslips" /></ProtectedRoute>} />
            <Route path="/tax-deductions" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Tax & Deductions" /></ProtectedRoute>} />
            <Route path="/financial-reports" element={<ProtectedRoute requiredRoles={['accountant']}><PlaceholderPage title="Financial Reports" /></ProtectedRoute>} />

            {/* Employee Routes (Legacy/Duplicate clean up if needed) */}
            {/* Note: /my-documents is already defined above */}

            {/* New User Routes */}
            <Route path="/welcome" element={<ProtectedRoute requiredRoles={['newuser']}><NewUserDashboard /></ProtectedRoute>} />
            <Route path="/complete-profile" element={<ProtectedRoute requiredRoles={['newuser']}><PlaceholderPage title="Complete Profile" /></ProtectedRoute>} />
            <Route path="/upload-documents" element={<ProtectedRoute requiredRoles={['newuser']}><PlaceholderPage title="Upload Documents" /></ProtectedRoute>} />
            <Route path="/policies" element={<ProtectedRoute requiredRoles={['newuser']}><PlaceholderPage title="View Policies" /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute requiredRoles={['newuser']}><PlaceholderPage title="Help & Support" /></ProtectedRoute>} />

            <Route path="*" element={<Login />} />

          </Routes>
          <SettingsDrawer />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
