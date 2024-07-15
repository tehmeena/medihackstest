import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library (needed for creating custom icons)
import 'leaflet/dist/leaflet.css';
//import './Map.css';

// Import your custom icon images
import hospitalIcon from './hospital-icon.png';
import clinicIcon from './hospital-icon.png';
import gymIcon from './gym-icon.png';
import shelterIcon from './shelter-icon.png';
import calendarIcon from './calendar-icon.png'; // Custom icon for Pilates event

const Map = () => {
    // Coordinates for 10027 (New York)
    const center = [40.811550, -73.953300];

    // Sample locations for hospitals, clinics, gyms, and shelters
    const locations = [
        { name: 'Hospital 1 at W 126th St', position: [40.810, -73.950], icon: hospitalIcon },
        { name: 'Hospital at W 117th St', position: [40.805, -73.955], icon: hospitalIcon },
        { name: 'Clinic at W 123rd St', position: [40.808, -73.952], icon: clinicIcon },
        { name: 'Clinic at Amsterdam Ave', position: [40.812, -73.958], icon: clinicIcon },
        { name: 'Gym at W 134th St', position: [40.815, -73.945], icon: gymIcon },
        { name: 'Gym at W 141st St', position: [40.818, -73.940], icon: gymIcon },
        { name: 'Shelter 1 at W 116 St', position: [40.808, -73.960], icon: shelterIcon },
        { name: 'Shelter Broadway and 116 St', position: [40.805, -73.965], icon: shelterIcon },
        { name: 'Pilates Studio on W 123rd St', position: [40.809, -73.954], icon: calendarIcon, description: 'Pilates for Moms on January 1, 2025 at 1PM. Add to calendar?' },
        { name: 'CPR Clinic at W 127th St', position: [40.811, -73.950], icon: calendarIcon, description: 'CPR for adults and infants on January 2, 2025 at 8AM. Add to calendar?' }
    ];

    // Helper function to return appropriate marker icon
    const getMarkerIcon = (iconUrl) => {
        return new L.Icon({
            iconUrl: iconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    };

    return (
        <div className="map-container">
            <MapContainer center={center} zoom={14} style={{ width: '100%', height: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    maxZoom={18}
                />
                {locations.map((location, index) => (
                    <Marker key={index} position={location.position} icon={getMarkerIcon(location.icon)}>
                        <Popup>{location.name}<br />{location.description}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
