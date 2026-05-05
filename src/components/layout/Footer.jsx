import React from 'react';
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaWhatsapp, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

/* ── Palette from screenshot ──────────────────────────────────────────────────
   Background   : #1e2530  (dark charcoal navy)
   Heading      : #5ec9c0  (teal / cyan-blue)
   Link default : #8fa3b1  (muted slate grey)
   Link hover   : #ffffff  (white)
   Divider      : #2d3748  (subtle separator)
   Bottom text  : #6b7d8d  (dim grey)
─────────────────────────────────────────────────────────────────────────────*/

const PALETTE = {
  bg:         '#1e2530',
  heading:    '#5ec9c0',
  link:       '#8fa3b1',
  linkHover:  '#ffffff',
  divider:    '#2d3748',
  dimText:    '#6b7d8d',
  brand:      '#ffffff',
};

const footerStyle = {
  background:  PALETTE.bg,
  color:       PALETTE.link,
  borderTop:  `1px solid ${PALETTE.divider}`,
  padding:    '3rem 0 1.5rem',
};

const headingStyle = {
  color:        PALETTE.heading,
  fontWeight:   700,
  fontSize:     '0.95rem',
  letterSpacing:'0.08em',
  textTransform:'uppercase',
  marginBottom: '1.25rem',
};

const linkStyle = {
  color:          PALETTE.link,
  textDecoration: 'none',
  fontSize:       '0.88rem',
  transition:     'color 0.2s',
  display:        'block',
  marginBottom:   '0.6rem',
};

const LinkItem = ({ to, href, children }) => {
  const handleHover   = e => (e.target.style.color = PALETTE.linkHover);
  const handleUnhover = e => (e.target.style.color = PALETTE.link);

  if (to) {
    return (
      <Link
        to={to}
        style={linkStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href || '#!'}
      style={linkStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnhover}
    >
      {children}
    </a>
  );
};

const socialBtnStyle = {
  background:     'transparent',
  border:         `1px solid ${PALETTE.divider}`,
  color:          PALETTE.link,
  borderRadius:   '50%',
  width:          '34px',
  height:         '34px',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  cursor:         'pointer',
  transition:     'all 0.2s',
  fontSize:       '0.85rem',
};

const SocialBtn = ({ icon, href }) => (
  <a
    href={href || '#!'}
    style={socialBtnStyle}
    onMouseEnter={e => {
      e.currentTarget.style.color   = PALETTE.linkHover;
      e.currentTarget.style.borderColor = PALETTE.heading;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color   = PALETTE.link;
      e.currentTarget.style.borderColor = PALETTE.divider;
    }}
  >
    {icon}
  </a>
);

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div className="container px-4">
        <div className="row g-5 mb-5">

          {/* Column 1: Quick Links */}
          <div className="col-lg-3 col-6">
            <h5 style={headingStyle}>Quick Links</h5>
            <LinkItem to="/">Home</LinkItem>
            <LinkItem to="/docs">Documentation</LinkItem>
            <LinkItem to="/features">Features</LinkItem>
            <LinkItem href="#!">Blog</LinkItem>
            <LinkItem href="#!">Sitemap</LinkItem>
          </div>

          {/* Column 2: Discover */}
          <div className="col-lg-3 col-6">
            <h5 style={headingStyle}>Discover WorkSphere</h5>
            <LinkItem to="/about">What is WorkSphere?</LinkItem>
            <LinkItem to="/about">Success Stories</LinkItem>
            <LinkItem to="/features">Compare Competitors</LinkItem>
            <LinkItem to="/contact">Client Locations</LinkItem>
            <LinkItem to="/contact">Support</LinkItem>
          </div>

          {/* Column 3: Features */}
          <div className="col-lg-3 col-6">
            <h5 style={headingStyle}>Features</h5>
            <LinkItem to="/assets">Assets</LinkItem>
            <LinkItem to="/feature/attendance">Attendance</LinkItem>
            <LinkItem to="/employees">Employee</LinkItem>
            <LinkItem to="/leaves">Leave</LinkItem>
            <LinkItem to="/feature/onboarding">Onboarding</LinkItem>
            <LinkItem to="/payroll">Payroll</LinkItem>
          </div>

          {/* Column 4: Source, Legal & App */}
          <div className="col-lg-3 col-6">
            <h5 style={headingStyle}>Source</h5>
            <LinkItem href="#!">GitHub</LinkItem>

            <h5 style={{ ...headingStyle, marginTop: '1.5rem' }}>Legal</h5>
            <LinkItem to="/privacy-policy">Privacy Policy</LinkItem>

            {/* App Buttons */}
            <div className="d-flex flex-column gap-2 mt-4">
              <button
                className="d-flex align-items-center gap-2"
                style={{
                  background:    'transparent',
                  border:        `1px solid ${PALETTE.divider}`,
                  color:         PALETTE.link,
                  borderRadius:  '8px',
                  padding:       '6px 14px',
                  fontSize:      '0.82rem',
                  cursor:        'pointer',
                  width:         '145px',
                  transition:    'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color       = PALETTE.linkHover;
                  e.currentTarget.style.borderColor = PALETTE.heading;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color       = PALETTE.link;
                  e.currentTarget.style.borderColor = PALETTE.divider;
                }}
              >
                <FaGooglePlay /> Google Play
              </button>
              <button
                className="d-flex align-items-center gap-2"
                style={{
                  background:    'transparent',
                  border:        `1px solid ${PALETTE.divider}`,
                  color:         PALETTE.link,
                  borderRadius:  '8px',
                  padding:       '6px 14px',
                  fontSize:      '0.82rem',
                  cursor:        'pointer',
                  width:         '145px',
                  transition:    'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color       = PALETTE.linkHover;
                  e.currentTarget.style.borderColor = PALETTE.heading;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color       = PALETTE.link;
                  e.currentTarget.style.borderColor = PALETTE.divider;
                }}
              >
                <FaWhatsapp /> WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: PALETTE.divider, opacity: 0.5, margin: '0 0 1.25rem' }} />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 pb-2">
          <p style={{ color: PALETTE.dimText, fontSize: '0.82rem', margin: 0 }}>
            © 2026 WorkSphere HRMS. All rights reserved.
          </p>

          <span style={{ color: PALETTE.brand, fontWeight: 700, fontSize: '1rem' }}>
            ⚡ WorkSphere
          </span>

          <div className="d-flex gap-2">
            <SocialBtn icon={<FaFacebookF />} />
            <SocialBtn icon={<FaTwitter />} />
            <SocialBtn icon={<FaLinkedinIn />} />
            <SocialBtn icon={<FaGithub />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
