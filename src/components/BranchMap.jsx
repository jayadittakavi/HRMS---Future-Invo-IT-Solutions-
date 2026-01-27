import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Red Point Icon
const redPointIcon = new L.DivIcon({
    className: 'custom-red-point',
    html: '<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -6]
});

const BranchMap = ({ branches = [] }) => {
    // Center map on India (approx)
    const center = [20.5937, 78.9629];

    return (
        <div className="dashboard-card p-0 overflow-hidden" style={{ height: '400px' }}>
            <div className="p-3 border-bottom border-light">
                <h6 className="dashboard-card-title mb-0">Branch Locations Map</h6>
            </div>
            <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {branches.map((branch) => {
                    // Start parsing lat/lng safely
                    let lat, lng;
                    if (typeof branch.location === 'string') {
                        const parts = branch.location.split(',').map(s => parseFloat(s.trim()));
                        if (parts.length === 2) {
                            [lat, lng] = parts;
                        }
                    } else if (branch.lat && branch.lng) {
                        lat = branch.lat;
                        lng = branch.lng;
                    }

                    if (!lat || !lng) return null;

                    return (
                        <Marker key={branch.id} position={[lat, lng]} icon={redPointIcon}>
                            <Popup>
                                <div className="text-center">
                                    <div className="fw-bold text-dark">{branch.name}</div>
                                    <div className="small text-primary fw-bold">{branch.company}</div>
                                    <div className="small text-muted mt-1">{branch.address}</div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default BranchMap;
