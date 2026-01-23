import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const BranchMap = () => {
    // Mock Data (matches Branches.jsx)
    const branches = [
        { id: 1, name: 'Bangalore Main Branch', company: 'TrickuWeb Technologies', address: 'Tech Park, Bangalore', lat: 12.97, lng: 77.59 },
        { id: 2, name: 'Hyderabad Main Branch', company: 'InnovateSoft Solutions', address: 'HITEC City, Hyderabad', lat: 17.38, lng: 78.48 },
        { id: 3, name: 'Pune Main Branch', company: 'TechForward India', address: 'Hinjewadi, Pune', lat: 18.59, lng: 73.72 },
    ];

    // Center map on India (approx)
    const center = [20.5937, 78.9629];

    return (
        <div className="dashboard-card p-0 overflow-hidden" style={{ height: '400px' }}>
            <div className="p-3 border-bottom border-light">
                <h6 className="dashboard-card-title mb-0">Branch Locations</h6>
            </div>
            <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {branches.map((branch) => (
                    <Marker key={branch.id} position={[branch.lat, branch.lng]}>
                        <Popup>
                            <div className="fw-bold">{branch.name}</div>
                            <div className="small text-secondary">{branch.company}</div>
                            <div className="small text-muted">{branch.address}</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default BranchMap;
