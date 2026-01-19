import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Home from "./pages/home/Index";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
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

/* Dashboard Manager (Role Based) */
import DashboardManager from "./dashboards/DashboardManager";

import Profile from "./pages/profile/Profile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
          <Route path="/leaves" element={<ProtectedRoute><PlaceholderPage title="Leave Management" /></ProtectedRoute>} />
          <Route path="/payroll" element={<ProtectedRoute><PlaceholderPage title="Payroll" /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
          <Route path="/assets" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
          <Route path="/asset-categories" element={<ProtectedRoute><AssetCategories /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><PlaceholderPage title="User Management" /></ProtectedRoute>} />

          {/* Additional Dashboard Routes */}
          <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
          <Route path="/branches" element={<ProtectedRoute><Branches /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><PlaceholderPage title="Reports" /></ProtectedRoute>} />
          <Route path="/recruitment" element={<ProtectedRoute><PlaceholderPage title="Recruitment" /></ProtectedRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute><PlaceholderPage title="Onboarding" /></ProtectedRoute>} />
          <Route path="/my-team" element={<ProtectedRoute><PlaceholderPage title="My Team" /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><PlaceholderPage title="Projects" /></ProtectedRoute>} />
          <Route path="/leave-requests" element={<ProtectedRoute><PlaceholderPage title="Leave Requests" /></ProtectedRoute>} />
          <Route path="/performance" element={<ProtectedRoute><PlaceholderPage title="Performance" /></ProtectedRoute>} />
          <Route path="/invoices" element={<ProtectedRoute><PlaceholderPage title="Invoices" /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><PlaceholderPage title="Expenses" /></ProtectedRoute>} />
          <Route path="/my-leaves" element={<ProtectedRoute><PlaceholderPage title="My Leaves" /></ProtectedRoute>} />
          <Route path="/my-attendance" element={<ProtectedRoute><PlaceholderPage title="My Attendance" /></ProtectedRoute>} />
          <Route path="/my-payslips" element={<ProtectedRoute><PlaceholderPage title="My Payslips" /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
