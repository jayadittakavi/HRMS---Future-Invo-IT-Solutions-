import React from 'react';

/**
 * Enhanced Bar Chart
 * @param {Array} data - Array of objects { label, value, color }
 * @param {string} height - Height of the chart container
 */
export const SimpleBarChart = ({ data = [], height = '250px' }) => {
    const maxValue = Math.max(...data.map(d => d.value || 0)) || 100;

    return (
        <div style={{ height, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '30px 5px 10px' }}>
            {data.map((item, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end', position: 'relative' }}>

                    {/* Top Label (Value or Percentage) */}
                    <div style={{
                        position: 'absolute',
                        bottom: `${(item.value / maxValue) * 100 + 5}%`,
                        fontSize: '0.65rem',
                        fontWeight: '800',
                        color: item.color || '#3b82f6',
                        whiteSpace: 'nowrap'
                    }}>
                        {item.topLabel || item.value}
                    </div>

                    <div
                        className="chart-bar-visual"
                        style={{
                            width: '45%',
                            minWidth: '10px',
                            maxWidth: '40px',
                            height: `${(item.value / maxValue) * 100}%`,
                            background: item.color ? `linear-gradient(180deg, ${item.color} 0%, ${item.color}90 100%)` : 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                            borderRadius: '12px 12px 4px 4px',
                            transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        title={`${item.label}: ${item.value}`}
                    ></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', gap: '2px' }}>
                        <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', textAlign: 'center' }}>{item.label}</span>
                        {item.subLabel && <span style={{ fontSize: '0.55rem', color: '#94a3b8', fontWeight: '600' }}>{item.subLabel}</span>}
                    </div>
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
                backgroundColor: 'var(--bg-card)',
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
                {centerText && <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>{centerText}</span>}
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>TOTAL</span>
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
                {[1, 2, 3, 4].map(i => <div key={i} style={{ borderBottom: '1px dashed var(--border-color)', width: '100%', height: '1px' }}></div>)}
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

                {/* Dots and Labels */}
                {data.map((val, i) => {
                    const x = (i / (data.length - 1)) * width;
                    const y = 200 - ((val / max) * 180);
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="5" fill="var(--bg-card)" stroke={color} strokeWidth="3" />
                            <text
                                x={x}
                                y={y - 12}
                                textAnchor="middle"
                                fontSize="14"
                                fontWeight="800"
                                fill={color}
                                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
                            >
                                {typeof val === 'number' ? `$${val}` : val}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export const SimpleAreaChart = SimpleLineChart; // Alias for now

/**
 * Modern Trend Chart with Bezier Curves
 */
export const ModernTrendChart = ({ data = [], color = '#6366f1', height = '200px' }) => {
    const max = Math.max(...data) || 100;
    const width = 500;
    const h = 220;

    // Convert data to points
    const points = data.map((val, i) => ({
        x: (i / (data.length - 1)) * width,
        y: h - 20 - ((val / max) * (h - 60))
    }));

    // Re-calculating in component to be safe
    const actualCurvePath = (() => {
        if (points.length < 2) return "";
        let path = `M ${points[0].x},${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const cp1x = (points[i].x + points[i + 1].x) / 2;
            path += ` C ${cp1x},${points[i].y} ${cp1x},${points[i + 1].y} ${points[points.length - 1].x === points[i + 1].x ? points[i + 1].x : cp1x},${points[i + 1].y}`;
        }
        // Actually a simpler way for SVG path
        return points.reduce((acc, p, i, a) => {
            if (i === 0) return `M ${p.x},${p.y}`;
            const prev = a[i - 1];
            const cp1x = (prev.x + p.x) / 2;
            return `${acc} C ${cp1x},${prev.y} ${cp1x},${p.y} ${p.x},${p.y}`;
        }, "");
    })();

    return (
        <div style={{ width: '100%', height, overflow: 'visible', position: 'relative' }}>
            <svg viewBox={`0 0 ${width} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                    <linearGradient id="modernGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area Fill */}
                <path
                    d={`${actualCurvePath} L ${width},${h} L 0,${h} Z`}
                    fill="url(#modernGradient)"
                />

                {/* Stroke Line */}
                <path
                    d={actualCurvePath}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Markers - Only show some for clarity */}
                {points.map((p, i) => (i % 2 === 0 || i === points.length - 1) && (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="4" fill="#ffffff" stroke={color} strokeWidth="2" />
                        <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>
                            {data[i]}$
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};
