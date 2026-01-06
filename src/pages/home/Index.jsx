import "./Home.css";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>
            Simplify Hiring,
            <span className="highlight"> Payroll & Employee Management</span>
            Platform
          </h1>

          <p className="subtitle">
            Track attendance, manage leaves, process payroll,
            streamline recruitment, and stay compliant —
            all automatically from a single dashboard.
          </p>

          <div className="hero-buttons">
            <button className="btn big primary">Start 14-day Free Trial</button>
            <button className="btn big secondary">Schedule a Demo</button>
          </div>

          <div className="benefits">
            <span>✔ No Credit Card Required</span>
            <span>✔ No Commitment</span>
          </div>

          <section className="stats-section">
            <div className="stat-card">
              <h2>10K+</h2>
              <p>Companies</p>
            </div>
            <div className="stat-card">
              <h2>1.5M+</h2>
              <p>Employees</p>
            </div>
            <div className="stat-card">
              <h2>150+</h2>
              <p>Features</p>
            </div>
            <div className="stat-card">
              <h2>100+</h2>
              <p>Cities</p>
            </div>
          </section>
        </div>

        <div className="hero-image">
          <img src="/images/dashboard.png" alt="HRMS Dashboard" />
        </div>
      </section>
    </>
  );
}
