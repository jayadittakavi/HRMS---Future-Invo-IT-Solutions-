import React from "react";

const ReportTable = ({ data }) => {
  if (data.length === 0) {
    return <div className="empty-state">No records found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="report-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Deductions</th>
            <th>Net Pay</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.empId}</td>
              <td>{item.department}</td>
              <td>${item.salary.toLocaleString()}</td>
              <td>${item.deductions.toLocaleString()}</td>
              <td>${item.netPay.toLocaleString()}</td>
              <td>
                <span
                  className={`status-badge ${
                    item.status.toLowerCase() === "paid" ? "paid" : "pending"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
