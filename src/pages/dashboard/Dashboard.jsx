import { useState } from "react";
import "../styles/dashboard.css";
import logo from "../assets/fislogo1.png";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const menus = [
    "Dashboard",
    "Companies",
    "Branches",
    "Departments",
    "Assets",
    "Employees",
    "User Management"
  ];

  return (
    <div className="dashboard-wrapper">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="logo" />
          <div className="title-box">
            <span className="name">HRMS</span>
            <span className="sub">Future Invo IT Solutions</span>
          </div>
        </div>

        <ul className="menu">
          {menus.map(menu => (
            <li
              key={menu}
              className={activePage === menu ? "active" : ""}
              onClick={() => setActivePage(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <b>{activePage}</b>
          <span>Role: Super Admin</span>
        </div>

        {/* CONTENT */}
        <div className="content">

          {activePage === "Dashboard" && (
            <>
              <h2>Welcome Meera Krishnan!</h2>
              <p>Process Pay Run for May 2024</p>

              <div className="cards">
                <div className="card">
                  <h3>Employees Net Pay</h3>
                  <p>₹17,25,23,654</p>
                </div>

                <div className="card">
                  <h3>No. of Employees</h3>
                  <p>1308</p>
                </div>

                <div className="card">
                  <h3>To Do Tasks</h3>
                  <p>136 Reimbursements</p>
                </div>
              </div>
            </>
          )}

          {activePage !== "Dashboard" && (
            <div className="card">
              <h2>{activePage}</h2>
              <p>UI will be implemented here</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
