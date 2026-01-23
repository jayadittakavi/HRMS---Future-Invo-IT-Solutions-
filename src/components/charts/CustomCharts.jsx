import React from 'react';

/**
 * Enhanced Bar Chart
 * @param {Array} data - Array of objects { label, value, color }
 * @param {string} height - Height of the chart container
 */
export const SimpleBarChart = ({ data = [], height = '250px' }) => {
    const maxValue = Math.max(...data.map(d => d.value || 0)) || 100;

    return (
        <div style={{ height, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '15px', padding: '20px 10px' }}>
            {data.map((item, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>

                    {/* Tooltip-like value on hover could be added here, for now static value on top if space permits or simple bars */}
                    <div
                        className="chart-bar-visual"
                        style={{
                            width: '40%',
                            minWidth: '12px',
                            maxWidth: '50px',
                            height: `${(item.value / maxValue) * 100}%`,
                            background: item.color ? `linear-gradient(180deg, ${item.color} 0%, ${item.color}90 100%)` : 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                            borderRadius: '50px', // Fully rounded bars for modern look
                            transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        title={`${item.label}: ${item.value}`}
                    ></div>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

/**
 * Enhanced Donut Chart
 * @param {Array} segments - Array of objects { value, color, label }
 * @param {string} size - Diameter of the donut
 * @param {string} centerText - Text to display in the center
 */
export const SimpleDonutChart = ({ segments = [], size = '180px', centerText = '' }) => {
    const total = segments.reduce((sum, seg) => sum + (seg.value || 0), 0);

    let currentDeg = 0;
    const gradientParts = segments.map(seg => {
        const deg = (seg.value / total) * 360;
        const color = seg.color || '#ccc';
        const str = `${color} ${currentDeg}deg ${currentDeg + deg}deg`;
        currentDeg += deg;
        return str;
    }).join(', ');

    return (
        <div style={{ position: 'relative', width: size, height: size, margin: '0 auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
            {/* Donut Circle */}
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `conic-gradient(${gradientParts})`,
                position: 'absolute',
                top: 0,
                left: 0,
                transition: 'all 0.3s ease'
            }}></div>

            {/* Scale effect on hover via CSS in parent if needed, simplistic here */}

            {/* Center Hole */}
            <div style={{
                width: '75%', // Thinner ring
                height: '75%',
                backgroundColor: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
            }}>
                {centerText && <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#334155' }}>{centerText}</span>}
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '2px' }}>TOTAL</span>
            </div>
        </div>
    );
};

/**
 * Enhanced Line Chart (Bezier Curve approximation via CSS clip-path or simple SVG spline)
 * @param {Array} data - Array of values
 * @param {string} color - Line color
 * @param {string} height - Chart height
 */
export const SimpleLineChart = ({ data = [], color = '#3b82f6', height = '200px' }) => {
    const max = Math.max(...data) || 100;
    const width = 500; // Higher resolution viewBox

    // Simple spline or polyline
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = 200 - ((val / max) * 180); // Leave some padding
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ width: '100%', height, overflow: 'hidden', position: 'relative' }}>
            {/* Background Grid Lines */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '20px', zIndex: 0 }}>
                {[1, 2, 3, 4].map(i => <div key={i} style={{ borderBottom: '1px dashed #e2e8f0', width: '100%', height: '1px' }}></div>)}
            </div>

            <svg viewBox={`0 0 ${width} 220`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor={color} floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Area Fill */}
                <polygon
                    points={`0,220 ${points} ${width},220`}
                    fill="url(#chartGradient)"
                    stroke="none"
                />

                {/* Stroke Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                />

                {/* Dots */}
                {data.map((val, i) => {
                    const x = (i / (data.length - 1)) * width;
                    const y = 200 - ((val / max) * 180);
                    return (
                        <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke={color} strokeWidth="2" />
                    );
                })}
            </svg>
        </div>
    );
};

export const SimpleAreaChart = SimpleLineChart; // Alias for now
