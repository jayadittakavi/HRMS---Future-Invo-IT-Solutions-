import React from 'react';

/**
 * Simple Bar Chart using Flexbox
 * @param {Array} data - Array of objects { label, value, color }
 * @param {string} height - Height of the chart container
 */
export const SimpleBarChart = ({ data = [], height = '200px' }) => {
    // Find max value to normalize heights
    const maxValue = Math.max(...data.map(d => d.value || 0)) || 100;

    return (
        <div style={{ height, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px', paddingTop: '20px' }}>
            {data.map((item, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '40px',
                            height: `${(item.value / maxValue) * 100}%`,
                            backgroundColor: item.color || '#3b82f6',
                            borderRadius: '4px 4px 0 0',
                            transition: 'height 0.5s ease',
                            position: 'relative'
                        }}
                        title={`${item.label}: ${item.value}`}
                    >
                        {/* Optional tooltip styling could go here */}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '5px', textAlign: 'center' }}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

/**
 * Simple Donut Chart using CSS Conic Gradient
 * @param {Array} segments - Array of objects { value, color, label }
 * @param {string} size - Diameter of the donut
 * @param {string} centerText - Text to display in the center
 */
export const SimpleDonutChart = ({ segments = [], size = '150px', centerText = '' }) => {
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
        <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
            {/* Donut Circle */}
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `conic-gradient(${gradientParts})`,
                position: 'absolute',
                top: 0,
                left: 0
            }}></div>

            {/* Center Hole */}
            <div style={{
                width: '70%',
                height: '70%',
                backgroundColor: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#374151',
                flexDirection: 'column'
            }}>
                {centerText && <span>{centerText}</span>}
            </div>
        </div>
    );
};

/**
 * Simple Line Chart using SVG
 * @param {Array} data - Array of values [10, 20, 15, ...]
 * @param {string} color - Line color
 * @param {string} height - Chart height
 */
export const SimpleLineChart = ({ data = [], color = '#3b82f6', height = '100px' }) => {
    const max = Math.max(...data) || 100;
    const min = 0;
    const width = 100; // viewBox width

    // Generate points
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = 100 - ((val / max) * 100); // Invert Y because SVG 0 is top
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height, overflow: 'visible' }}>
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            {/* Area fill (optional, transparent opacity) */}
            <polygon
                points={`0,100 ${points} 100,100`}
                fill={color}
                fillOpacity="0.1"
            />
        </svg>
    );
};

/**
 * Simple Area Chart with Gradient
 * @param {Array} data - Array of objects { label, value } or just values
 * @param {string} color - Main color
 * @param {string} height - Height of container
 */
export const SimpleAreaChart = ({ data = [], color = '#3b82f6', height = '200px' }) => {
    // Normalize data
    const values = data.map(d => (typeof d === 'object' ? d.value : d));
    const labels = data.map(d => (typeof d === 'object' ? d.label : ''));

    const max = Math.max(...values) || 100;
    const width = 100;

    // Generate points
    const points = values.map((val, i) => {
        const x = (i / (values.length - 1)) * width;
        const y = 100 - ((val / max) * 100);
        return `${x},${y}`;
    }).join(' ');

    const id = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div style={{ height, width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                    <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area */}
                <polygon
                    points={`0,100 ${points} 100,100`}
                    fill={`url(#${id})`}
                />

                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />

                {/* Data Points */}
                {values.map((val, i) => {
                    const x = (i / (values.length - 1)) * width;
                    const y = 100 - ((val / max) * 100);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="1.5"
                            fill="#fff"
                            stroke={color}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    );
                })}
            </svg>

            {/* X-Axis Labels */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '5px',
                fontSize: '0.75rem',
                color: '#6b7280'
            }}>
                {labels.map((label, i) => (
                    <span key={i}>{label}</span>
                ))}
            </div>
        </div>
    );
};
