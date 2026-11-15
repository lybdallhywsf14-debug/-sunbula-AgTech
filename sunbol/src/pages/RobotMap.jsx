import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./RobotMap.css";

function RobotMap() {
  // موقع تجريبي مؤقت، هنستبدله بإحداثيات GPS الحقيقية
  const robotPosition = [30.5877, 31.5020];

  return (
    <div className="robot-map-page">
      <div className="dashboard-header">
        <h1>Robot Location</h1>
        <p>Track SANBOL robot on the live map</p>
      </div>

      <div className="map-info">
        <span>Robot Status: Demo Location</span>
        <span>GPS: Not Connected</span>
      </div>

      <div className="map-container">
        <MapContainer
          center={robotPosition}
          zoom={15}
          scrollWheelZoom={true}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <CircleMarker
            center={robotPosition}
            radius={10}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#16a34a",
              fillOpacity: 1,
              weight: 3
            }}
          >
            <Popup>
              SANBOL Robot 🌱
              <br />
              Demo Location
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div>
    </div>
  );
}

export default RobotMap;