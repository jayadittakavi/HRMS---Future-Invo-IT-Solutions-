import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
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
            <Route path="/" element={<Home />} />
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
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
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
            <Route path="*" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
