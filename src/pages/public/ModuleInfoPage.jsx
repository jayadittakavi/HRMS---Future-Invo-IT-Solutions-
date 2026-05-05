/**
 * ModuleInfoPage — Shared layout for all public module info pages
 * (Assets, Attendance, Employee, Leave, Onboarding, Payroll)
 *
 * Uses the HRMS global color palette:
 *   --cp-purple-main : #534789   (primary)
 *   --cp-purple-dark : #434777   (dark)
 *   --cp-deep-navy   : #405580   (navy)
 *   --cp-sky-blue    : #65B1C9   (accent)
 *   --cp-cyan-teal   : #87DDDD   (highlight)
 */
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './ModuleInfoPage.css';

const ModuleInfoPage = ({
  title,
  subtitle,
  description,
  features = [],
  heroIcon,
  ctaLabel = 'Get Started Free',
  ctaLink  = '/signup',
}) => {
  return (
    <div className="mip-wrapper">
      <Navbar />

      <main className="mip-main">
        {/* ── Hero Banner ───────────────────────────────────────── */}
        <section className="mip-hero">
          <div className="mip-hero-bg-circles">
            <div className="mip-circle mip-c1" />
            <div className="mip-circle mip-c2" />
            <div className="mip-circle mip-c3" />
          </div>
          <div className="container text-center position-relative">
            {heroIcon && (
              <div className="mip-hero-icon">{heroIcon}</div>
            )}
            <h1 className="mip-hero-title">{title}</h1>
            <p className="mip-hero-subtitle">{subtitle}</p>
            <a href={ctaLink} className="mip-cta-btn">
              {ctaLabel} →
            </a>
          </div>
        </section>

        {/* ── Description ──────────────────────────────────────── */}
        <section className="mip-desc-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <p className="mip-description">{description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature Cards ────────────────────────────────────── */}
        <section className="mip-features-section">
          <div className="container">
            <div className="row g-4 justify-content-center">
              {features.map((f, i) => (
                <div className="col-sm-6 col-lg-3" key={i}>
                  <div className="mip-feature-card">
                    <div className="mip-feature-icon">{f.icon}</div>
                    <h5 className="mip-feature-title">{f.title}</h5>
                    <p className="mip-feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA Strip ─────────────────────────────────── */}
        <section className="mip-bottom-cta">
          <div className="container text-center">
            <h2 className="mip-cta-heading">Ready to streamline your HR operations?</h2>
            <p className="mip-cta-sub">Join thousands of companies using WorkSphere to manage their workforce efficiently.</p>
            <a href={ctaLink} className="mip-cta-btn mip-cta-btn--lg">
              Start Free Trial →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ModuleInfoPage;
