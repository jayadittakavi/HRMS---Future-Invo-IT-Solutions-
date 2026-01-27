import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingsDrawer from "./pages/settings/SettingsDrawer";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
/* Pages */
import Welcome from "./pages/welcome/Welcome";
import Home from "./pages/home/Index";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import SignupOtp from "./pages/signup/otp/SignupOtp";
import Otp from "./pages/otp/Otp";
import ResetOtp from "./pages/otp/ResetOtp";
import ForgotPassword from "./pages/forgetpassword/Forgetpassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import Attendance from "./pages/attendance/Attendance";
import PlaceholderPage from "./pages/PlaceholderPage";
import Companies from "./pages/companies/Companies";
import Branches from "./pages/branches/Branches";
import Departments from "./pages/departments/Departments";
import Assets from "./pages/assets/Assets";
import AssetCategories from "./pages/assets/AssetCategories";
import Employees from "./pages/employees/Employees";

import Calendar from "./pages/calendar/Calendar";
import SetupOrganization from "./pages/setup_organization/SetupOrganization";

/* Dashboard Manager (Redirector) */
import DashboardManager from "./dashboards/DashboardManager";

/* Individual Dashboards */
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import HRDashboard from './dashboards/HRDashboard';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import AccountantDashboard from './dashboards/AccountantDashboard';
import NewUserDashboard from './dashboards/NewUserDashboard';

import Profile from "./pages/profile/Profile";
import UserManagement from "./pages/user_management/UserManagement";

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

            <Route path="/employees" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'hr']}><Employees /></ProtectedRoute>} />
            <Route path="/leaves" element={<ProtectedRoute requiredRoles={['superadmin', 'admin', 'hr']}><PlaceholderPage title="Leave Management" /></ProtectedRoute>} />
            <Route path="/payroll" element={<ProtectedRoute requiredRoles={['accountant', 'superadmin']}><PlaceholderPage title="Payroll" /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute requiredRoles={['superadmin']}><Departments /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Assets /></ProtectedRoute>} />
            <Route path="/asset-categories" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><AssetCategories /></ProtectedRoute>} />
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
            <Route path="/my-leaves" element={<ProtectedRoute><PlaceholderPage title="My Leaves" /></ProtectedRoute>} />
            <Route path="/my-attendance" element={<ProtectedRoute><PlaceholderPage title="My Attendance" /></ProtectedRoute>} />
            <Route path="/my-payslips" element={<ProtectedRoute><PlaceholderPage title="My Payslips" /></ProtectedRoute>} />

            {/* Fallback */}
            {/* Admin Routes */}
            <Route path="/designations" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><PlaceholderPage title="Designations" /></ProtectedRoute>} />
            <Route path="/attendance-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><Attendance /></ProtectedRoute>} />
            <Route path="/payroll-management" element={<ProtectedRoute requiredRoles={['superadmin', 'admin']}><PlaceholderPage title="Payroll Management" /></ProtectedRoute>} />
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

            {/* Employee Routes */}
            <Route path="/my-documents" element={<ProtectedRoute requiredRoles={['employee']}><PlaceholderPage title="My Documents" /></ProtectedRoute>} />
            <Route path="/change-password" element={<ProtectedRoute><PlaceholderPage title="Change Password" /></ProtectedRoute>} />

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
