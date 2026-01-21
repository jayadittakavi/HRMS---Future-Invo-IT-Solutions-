import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaRocket } from 'react-icons/fa';

const HeroSection = () => {
    // Custom gradient styles based on the description
    const gradientStyle = {
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #e9d5ff 100%)', // Deep Blue -> Violet -> Lavender
        borderRadius: '30px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '600px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)' // Soft shadow
    };

    const glassNavbarStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50px',
        padding: '10px 20px',
        border: '1px solid rgba(255,255,255,0.2)'
    };

    // Abstract circle styles for the right side
    const circleStyle = {
        position: 'absolute',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.1)',
        right: '-10%',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)'
    };

    return (
        <div className="container py-5">
            <div className="p-4 p-md-5 text-white" style={gradientStyle}>

                {/* Navbar inside the container */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center gap-2">
                        {/* Placeholder Logo */}
                        <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px' }}>
                            <FaRocket size={14} />
                        </div>
                        <span className="fw-bold h5 mb-0" style={{ letterSpacing: '-0.5px' }}>Senses<sup className="small" style={{ fontSize: '0.6em' }}>®</sup> Incorporations</span>
                    </div>

                    {/* Centered Menu */}
                    <div className="d-none d-md-flex gap-4">
                        <Link to="/" className="text-white text-decoration-none small opacity-75 hover-opacity-100">Home</Link>
                        <Link to="/about" className="text-white text-decoration-none small opacity-75 hover-opacity-100">About Us</Link>
                        <Link to="/contact" className="text-white text-decoration-none small opacity-75 hover-opacity-100">FAQ</Link>
                    </div>

                    {/* Right Actions */}
                    <div className="d-flex align-items-center gap-3">
                        <span className="small d-none d-lg-block opacity-75">Have A Question?</span>
                        <Link to="/contact" className="btn btn-light rounded-pill px-4 py-2 fs-7 fw-bold small text-primary">Book A Call</Link>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
                    <div className="col-lg-6 pt-5">
                        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <div className="rounded-circle bg-white" style={{ width: '6px', height: '6px' }}></div>
                            <span className="small fw-medium" style={{ fontSize: '0.8rem' }}>Beta Version is Live!</span>
                        </div>

                        <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: 1.1, letterSpacing: '-1px' }}>
                            Automate Smarter.<br />
                            Work <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: '400' }}>Faster</span>,
                        </h1>

                        <p className="lead mb-5 opacity-75 fw-light" style={{ maxWidth: '450px' }}>
                            Say goodbye to repetitive tasks. Our AI-driven platform streamlines your workflows so your team can focus on what really matters.
                        </p>

                        <div className="d-flex gap-3">
                            <Link to="/signup" className="btn btn-white text-primary bg-white rounded-pill px-4 py-3 fw-bold shadow-sm d-flex align-items-center gap-2">
                                See It in Action
                            </Link>
                            <Link to="/login" className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold d-flex align-items-center gap-2" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
                                Demo <FaPlay size={10} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Abstract Visuals (Right Side) */}
                <div style={{ ...circleStyle, width: '600px', height: '600px' }}></div>
                <div style={{ ...circleStyle, width: '500px', height: '500px', border: '1px solid rgba(255,255,255,0.05)' }}></div>
                <div style={{ ...circleStyle, width: '400px', height: '400px' }}></div>
                <div style={{ ...circleStyle, width: '800px', height: '800px', opacity: 0.3 }}></div>

            </div>
        </div>
    );
};

export default HeroSection;
