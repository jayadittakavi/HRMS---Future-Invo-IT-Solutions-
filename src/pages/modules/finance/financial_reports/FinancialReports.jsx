import React, { useState, useEffect } from "react";
import { financialData } from "./mockData";
import Filters from "./components/Filters";
import ReportTable from "./components/ReportTable";
import ExportButtons from "./components/ExportButtons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "./FinancialReports.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const FinancialReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    company: "",
    branch: "",
    department: "",
  });

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      let filteredData = financialData;

      if (filters.company) {
        filteredData = filteredData.filter((item) => item.company === filters.company);
      }
      if (filters.branch) {
        filteredData = filteredData.filter((item) => item.branch === filters.branch);
      }
      if (filters.department) {
        filteredData = filteredData.filter((item) => item.department === filters.department);
      }
      if (filters.dateFrom) {
        filteredData = filteredData.filter((item) => new Date(item.date) >= new Date(filters.dateFrom));
      }
      if (filters.dateTo) {
        filteredData = filteredData.filter((item) => new Date(item.date) <= new Date(filters.dateTo));
      }

      setData(filteredData);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportSuccess = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const totalSalary = data.reduce((sum, item) => sum + item.salary, 0);
  const totalDeductions = data.reduce((sum, item) => sum + item.deductions, 0);
  const totalNetPay = data.reduce((sum, item) => sum + item.netPay, 0);

  // Chart Data
  const departmentData = data.reduce((acc, item) => {
    acc[item.department] = (acc[item.department] || 0) + item.salary;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        data: Object.values(departmentData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  const barData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Net Pay',
        data: data.map(item => item.netPay),
        backgroundColor: '#36A2EB',
      }
    ]
  };

  return (
    <DashboardLayout title="Financial Reports">
      <div className="financial-reports-page">
        <div className="page-header">
        <h1>Financial Reports</h1>
        <ExportButtons data={data} onSuccess={handleExportSuccess} />
      </div>

      {message && <div className="success-message">{message}</div>}

      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <div className="summary-cards">
        <div className="card">
          <h3>Total Salary Paid</h3>
          <p className="amount">${totalSalary.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total Employees</h3>
          <p className="amount">{data.length}</p>
        </div>
        <div className="card">
          <h3>Total Deductions</h3>
          <p className="amount">${totalDeductions.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Net Payroll</h3>
          <p className="amount">${totalNetPay.toLocaleString()}</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h4>Salary Distribution by Department</h4>
          {data.length > 0 ? <Pie data={pieData} /> : <p>No data</p>}
        </div>
        <div className="chart-container">
          <h4>Net Pay by Employee</h4>
          {data.length > 0 ? <Bar data={barData} /> : <p>No data</p>}
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <ReportTable data={data} />
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default FinancialReports;
