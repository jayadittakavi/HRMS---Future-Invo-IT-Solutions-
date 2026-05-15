import React, { useEffect } from "react"; // Home Hub with modern animations
import "./Home.css";
import Navbar from "../../../components/layout/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import {
  FaArrowRight, FaUsers, FaCreditCard, FaClock,
  FaChartPie, FaBuilding, FaUserShield, FaRocket,
  FaLock, FaPalette, FaMicrochip, FaCheckCircle
} from "react-icons/fa";
import heroImg from "../../../assets/images/hrms_hero_illustration_1772780995397.png";
import inmobiLogo from "../../../assets/images/Inmobi_logo.png";
import razorpayLogo from "../../../assets/images/Razorpay_logo.png";
import spotifyLogo from "../../../assets/images/Spotify_logo.png";
import udaanLogo from "../../../assets/images/Udaan_logo.png";
import zohoLogo from "../../../assets/images/Zoho_logo.png";
import freshworksLogo from "../../../assets/images/Freshworks_logo.png";
import dunzoLogo from "../../../assets/images/Dunzo_logo.png";
import cleartaxLogo from "../../../assets/images/Cleartax_logo.png";
import chargebeeLogo from "../../../assets/images/Chargebee_logo.png";

const Home = () => {
  // Scroll Reveal Animation Hook
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", reveal);
    // Trigger once on mount
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div className="home-container">
      <Navbar isHome={true} />

      {/* HERO SECTION */}
      <section className="hero-section container">
        <div className="row align-items-center">
          <div className="col-lg-6 hero-content">
            <span className="section-tag text-start reveal">Intelligent Workforce Management</span>
            <h1 className="reveal">
              Empower Your Team with <br />
              <span className="gradient-text">WorkSphere HRMS</span>
            </h1>
            <p className="reveal">
              Modernize your HR processes with a fully automated, glass-styled ecosystem designed for growth. Manage payroll, performance, and presence from a single unified portal.
            </p>
            <div className="hero-buttons reveal">
              <Link to="/signup" className="btn-premium btn-indigo">
                Get Started <FaArrowRight fontSize="0.8rem" />
              </Link>
              <Link to="/contact" className="btn-premium btn-glass">
                Contact Sales
              </Link>
            </div>
          </div>
          <div className="col-lg-6 hero-image-wrapper reveal">
            <img src={heroImg} alt="HRMS Ecosystem" className="hero-main-img" />
          </div>
        </div>
      </section>
      
      {/* TRUSTED BY SECTION */}
      <section className="trusted-by reveal">
        <div className="container text-center">
          <h2 className="trusted-title mb-3">Trusted by <span className="purple-text">100+</span> companies worldwide</h2>
          <p className="trusted-subtitle mx-auto mb-5">
            Teams across fintech, SaaS, and enterprise trust our HRMS to manage their workforce, process payroll faster, and scale with confidence.
          </p>
          <div className="logos-marquee-wrapper mt-5">
            <div className="logos-marquee">
              {[
                { img: inmobiLogo, alt: "Inmobi" },
                { img: razorpayLogo, alt: "Razorpay" },
                { img: zohoLogo, alt: "Zoho" },
                { img: spotifyLogo, alt: "Spotify" },
                { img: udaanLogo, alt: "Udaan" },
                { img: freshworksLogo, alt: "Freshworks" },
                { img: dunzoLogo, alt: "Dunzo" },
                { img: cleartaxLogo, alt: "Cleartax" },
                { img: chargebeeLogo, alt: "Chargebee" },
                // Duplicate for seamless loop
                { img: inmobiLogo, alt: "Inmobi" },
                { img: razorpayLogo, alt: "Razorpay" },
                { img: zohoLogo, alt: "Zoho" },
                { img: spotifyLogo, alt: "Spotify" },
                { img: udaanLogo, alt: "Udaan" },
                { img: freshworksLogo, alt: "Freshworks" },
                { img: dunzoLogo, alt: "Dunzo" },
                { img: cleartaxLogo, alt: "Cleartax" },
                { img: chargebeeLogo, alt: "Chargebee" },
              ].map((logo, idx) => (
                <div key={idx} className="logo-marquee-item">
                  <img src={logo.img} alt={logo.alt} className="company-logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-section reveal">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Companies Joined</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime Guranteed</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <span className="stat-number">₹10Cr+</span>
                <span className="stat-label">Payroll Processed</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <span className="stat-number">4.9/5</span>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE VALUE SECTION */}
      <section className="why-hrms container">
        <span className="section-tag reveal">Next-Gen Capabilities</span>
        <h2 className="section-title reveal">Why Choose WorkSphere?</h2>
        <div className="row g-4">
          <div className="col-md-4 reveal">
            <div className="glass-card">
              <div className="icon-box"><FaUsers /></div>
              <h4>Unified Profiles</h4>
              <p>Centralized employee hub with complete lifecycle management and digital document storage.</p>
            </div>
          </div>
          <div className="col-md-4 reveal">
            <div className="glass-card">
              <div className="icon-box"><FaCreditCard /></div>
              <h4>Zero-Tax Payroll</h4>
              <p>Automate salary structures, tax computations, and compliance reports with one-click processing.</p>
            </div>
          </div>
          <div className="col-md-4 reveal">
            <div className="glass-card">
              <div className="icon-box"><FaClock /></div>
              <h4>Smart Presence</h4>
              <p>Biometric and geo-fenced attendance tracking with automated leave management workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="highlights-section container py-5">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-5 mb-lg-0 reveal">
            <span className="section-tag text-start">Enterprise Grade</span>
            <h2 className="text-start mb-4">A complete ecosystem for organizational growth</h2>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex gap-3 align-items-start">
                <div className="text-primary mt-1"><FaRocket size={20} /></div>
                <div>
                  <h6 className="fw-bold mb-1">Elite Scalability</h6>
                  <p className="text-muted small mb-0">Seamlessly scale from 10 to 10,000+ employees without performance drops.</p>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <div className="text-primary mt-1"><FaLock size={20} /></div>
                <div>
                  <h6 className="fw-bold mb-1">Fort Knox Security</h6>
                  <p className="text-muted small mb-0">Your sensitive HR data is protected with TLS 1.3 and advanced SQL encryption.</p>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <div className="text-primary mt-1"><FaPalette size={20} /></div>
                <div>
                  <h6 className="fw-bold mb-1">User-Centric Design</h6>
                  <p className="text-muted small mb-0">Intuitive glassmorphic interface that users love, requiring zero training hours.</p>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <div className="text-primary mt-1"><FaMicrochip size={20} /></div>
                <div>
                  <h6 className="fw-bold mb-1">AI Actionable Insights</h6>
                  <p className="text-muted small mb-0">Predict attrition rates and manage talent pipelines with data-driven analytics.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 reveal">
            <div className="row g-3">
              {[
                "Role-Based Dashboards", "Company & Branch Hierarchy",
                "Automation Workflows", "Audit & Security Logs",
                "Mobile Responsive UX", "REST API Extensibility"
              ].map((f, i) => (
                <div className="col-sm-6" key={i}>
                  <div className="glass-card p-4 d-flex align-items-center gap-3">
                    <FaCheckCircle className="text-indigo" />
                    <span className="fw-bold small">{f}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="pricing-section container">
        <div className="text-center mb-5 reveal">
          <span className="section-tag">Transparent Pricing</span>
          <h2 className="section-title">Plans built for your scale</h2>
        </div>
        <div className="row g-4 justify-content-center">
          {/* Starter Plan */}
          <div className="col-lg-4 col-md-6 reveal">
            <div className="pricing-card">
              <h4 className="text-indigo">Starter</h4>
              <div className="price">₹999 <span>/ month</span></div>
              <p className="small text-muted mb-4">For individuals getting started</p>
              <ul className="price-features">
                <li><FaCheckCircle /> Lead management</li>
                <li><FaCheckCircle /> Basic analytics</li>
                <li><FaCheckCircle /> Email support</li>
                <li><FaCheckCircle /> 2 team members</li>
                <li><FaCheckCircle /> Up to 1,000 contacts</li>
                <li><FaCheckCircle /> Basic pipeline management</li>
                <li><FaCheckCircle /> Standard support</li>
              </ul>
              <Link to="/signup" className="btn-premium btn-glass w-100 justify-content-center">
                Get Started
              </Link>
            </div>
          </div>

          {/* Growth Plan */}
          <div className="col-lg-4 col-md-6 reveal">
            <div className="pricing-card featured">
              <span className="popular-chip">Most Popular</span>
              <h4 className="text-indigo">Growth</h4>
              <div className="price">₹2,499 <span>/ month</span></div>
              <p className="small text-muted mb-4">Best for growing teams</p>
              <ul className="price-features">
                <li><FaCheckCircle /> Everything in Starter</li>
                <li><FaCheckCircle /> Team collaboration</li>
                <li><FaCheckCircle /> Up to 10,000 contacts</li>
                <li><FaCheckCircle /> Advanced pipeline & automation</li>
                <li><FaCheckCircle /> Email campaigns & tracking</li>
                <li><FaCheckCircle /> Custom reports & dashboards</li>
                <li><FaCheckCircle /> API access</li>
                <li><FaCheckCircle /> Priority support</li>
              </ul>
              <Link to="/signup" className="btn-premium btn-indigo w-100 justify-content-center">
                Get Started
              </Link>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="col-lg-4 col-md-6 reveal">
            <div className="pricing-card">
              <h4 className="text-indigo">Enterprise</h4>
              <div className="price">Custom</div>
              <p className="small text-muted mb-4">For large scale operations</p>
              <ul className="price-features">
                <li><FaCheckCircle /> Unlimited users</li>
                <li><FaCheckCircle /> Custom integrations</li>
                <li><FaCheckCircle /> Dedicated manager</li>
                <li><FaCheckCircle /> Advanced AI insights</li>
                <li><FaCheckCircle /> SSO & advanced security</li>
                <li><FaCheckCircle /> Dedicated success manager</li>
                <li><FaCheckCircle /> 24/7 premium support</li>
                <li><FaCheckCircle /> Custom training</li>
              </ul>
              <Link to="/contact" className="btn-premium btn-glass w-100 justify-content-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE SECTION */}
      <section className="newsletter-section container">
        <div className="newsletter-box reveal">
          <h2 className="mb-2">Stay Ahead of the Curve</h2>
          <p className="text-muted">Join 10,000+ HR professionals receiving our weekly talent management insights.</p>
          <div className="input-glass-group">
            <input type="email" placeholder="work-email@company.com" />
            <button className="btn-premium btn-indigo px-4 py-2">Join List</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
