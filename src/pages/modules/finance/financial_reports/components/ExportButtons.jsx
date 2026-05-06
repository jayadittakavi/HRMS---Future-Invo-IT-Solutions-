import React from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";

const ExportButtons = ({ data, onSuccess }) => {
  const exportData = data.map((item) => ({
    "Employee Name": item.name,
    "Employee ID": item.empId,
    Department: item.department,
    Salary: item.salary,
    Deductions: item.deductions,
    "Net Pay": item.netPay,
    "Payment Status": item.status,
  }));

  const handleExportCSV = () => {
    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "financial_report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onSuccess) onSuccess("CSV Export Successful");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Report");
    XLSX.writeFile(workbook, "financial_report.xlsx");
    if (onSuccess) onSuccess("Excel Export Successful");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Financial Report", 14, 15);
    doc.autoTable({
      head: [
        [
          "Employee Name",
          "Employee ID",
          "Department",
          "Salary",
          "Deductions",
          "Net Pay",
          "Payment Status",
        ],
      ],
      body: data.map((item) => [
        item.name,
        item.empId,
        item.department,
        item.salary,
        item.deductions,
        item.netPay,
        item.status,
      ]),
      startY: 20,
    });
    doc.save("financial_report.pdf");
    if (onSuccess) onSuccess("PDF Export Successful");
  };

  return (
    <div className="export-buttons-container">
      <button onClick={handleExportCSV} className="export-btn csv-btn">
        <FaFileCsv /> CSV
      </button>
      <button onClick={handleExportExcel} className="export-btn excel-btn">
        <FaFileExcel /> Excel
      </button>
      <button onClick={handleExportPDF} className="export-btn pdf-btn">
        <FaFilePdf /> PDF
      </button>
    </div>
  );
};

export default ExportButtons;
