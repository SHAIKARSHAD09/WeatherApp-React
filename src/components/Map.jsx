import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../index.css";

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to change the map center
function ChangeView({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}

function Map({ searchPosition }) {
  // Default position for the map
  const initialPosition = [51.505, -0.09];
  const [position, setPosition] = useState(initialPosition);

  // Update the position if `searchPosition` changes
  if (searchPosition && searchPosition !== position) {
    setPosition(searchPosition);
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Current location: {position[0].toFixed(2)}, {position[1].toFixed(2)}
          </Popup>
        </Marker>
        <ChangeView position={position} />
      </MapContainer>
    </div>
  );
}

export default Map;
