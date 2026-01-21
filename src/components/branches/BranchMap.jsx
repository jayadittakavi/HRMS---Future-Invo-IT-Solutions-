import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const BranchMap = ({ branches }) => {
    // Default center (India) if no branches
    const defaultCenter = [20.5937, 78.9629];
    const zoom = 5;

    return (
        <div className="dashboard-card mb-4" style={{ height: '400px', overflow: 'hidden' }}>
            <h6 className="dashboard-card-title mb-3">Branch Locations</h6>
            <MapContainer
                center={defaultCenter}
                zoom={zoom}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', borderRadius: '0.5rem', zIndex: 1 }}
            >
                {/* White/Light Theme using CartoDB Positron */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {branches.map((branch) => {
                    const [lat, lng] = branch.location.split(',').map(coord => parseFloat(coord.trim()));
                    if (isNaN(lat) || isNaN(lng)) return null;

                    return (
                        <Marker key={branch.id} position={[lat, lng]}>
                            <Popup>
                                <div className="text-center">
                                    <h6 className="fw-bold mb-1">{branch.name}</h6>
                                    <p className="small mb-0 text-muted">{branch.address}</p>
                                    <span className="badge bg-primary mt-1">{branch.company}</span>
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
