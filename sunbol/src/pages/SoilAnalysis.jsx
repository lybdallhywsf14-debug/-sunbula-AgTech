import { useEffect, useState } from "react";

function SoilAnalysis() {
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensors");

        if (!response.ok) {
          throw new Error("Could not load sensor data");
        }

        const data = await response.json();
        setSoilData(data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSoilData();

    const interval = setInterval(fetchSoilData, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="soil-page">
        <div className="soil-loading">
          <span>🌱</span>
          <h2>Loading Soil Analysis...</h2>
          <p>Connecting to SANBOL sensors</p>
        </div>
      </div>
    );
  }

  if (error || !soilData) {
    return (
      <div className="soil-page">
        <div className="soil-error">
          <span>⚠️</span>
          <h2>Unable to Load Sensor Readings</h2>
          <p>{error || "No sensor data received yet."}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  const sensors = [
    {
      name: "pH Level",
      value: soilData.ph,
      unit: "",
      icon: "🧪",
      description: "Soil acidity level",
      color: "purple",
    },
    {
      name: "Nitrogen",
      value: soilData.nitrogen,
      unit: "mg/kg",
      icon: "🌱",
      description: "Nitrogen concentration",
      color: "green",
    },
    {
      name: "Phosphorus",
      value: soilData.phosphorus,
      unit: "mg/kg",
      icon: "🧫",
      description: "Phosphorus concentration",
      color: "blue",
    },
    {
      name: "Potassium",
      value: soilData.potassium,
      unit: "mg/kg",
      icon: "🍃",
      description: "Potassium concentration",
      color: "orange",
    },
    {
      name: "Moisture",
      value: soilData.moisture,
      unit: "%",
      icon: "💧",
      description: "Soil moisture level",
      color: "cyan",
    },
    {
      name: "Temperature",
      value: soilData.temperature,
      unit: "°C",
      icon: "🌡️",
      description: "Measured temperature",
      color: "red",
    },
  ];

  const formattedTime = soilData.updatedAt
    ? new Date(soilData.updatedAt).toLocaleTimeString()
    : "Not available";

  return (
    <div className="soil-page modern-soil-page">
      {/* HEADER */}
      <div className="soil-modern-header">
        <div>
          <span className="soil-eyebrow">SMART AGRICULTURE MONITORING</span>
          <h1>Soil Analysis</h1>
          <p>Monitor soil conditions and sensor readings in real time.</p>
        </div>

        <div className="soil-live-status">
          <span></span>
          Live Monitoring
        </div>
      </div>

      {/* SUMMARY */}
      <div className="soil-overview-banner">
        <div className="soil-overview-icon">🌿</div>
        <div>
          <h2>Soil Monitoring Overview</h2>
          <p>SANBOL is receiving sensor readings from the backend.</p>
        </div>
        <div className="soil-sensor-count">
          <strong>06</strong>
          <span>Sensor Readings</span>
        </div>
      </div>

      {/* SENSOR CARDS */}
      <div className="soil-section-heading">
        <div>
          <h2>Sensor Measurements</h2>
          <p>Latest values received from SANBOL</p>
        </div>
        <span>Auto refresh: 3 seconds</span>
      </div>

      <div className="soil-modern-grid">
        {sensors.map((sensor) => (
          <div className="soil-modern-card" key={sensor.name}>
            <div className="soil-modern-card-top">
              <div className={`soil-modern-icon ${sensor.color}`}>
                {sensor.icon}
              </div>

              <span className="reading-status">Received</span>
            </div>

            <p className="soil-modern-name">{sensor.name}</p>

            <div className="soil-modern-value">
              {sensor.value}
              <small>{sensor.unit}</small>
            </div>

            <p className="soil-modern-description">{sensor.description}</p>
          </div>
        ))}
      </div>

      {/* LAST UPDATE */}
      <section className="soil-update-panel">
        <div className="soil-update-icon">🕒</div>

        <div>
          <span>Last Sensor Update</span>
          <h3>{formattedTime}</h3>
          <p>Latest data received from SANBOL backend</p>
        </div>

        <div className="soil-update-indicator">
          <span></span>
          Connected
        </div>
      </section>

      {/* FOOTER */}
      <div className="soil-page-footer">
        <span>🌱 SANBOL Smart Agriculture</span>
        <span>Live Soil Monitoring System</span>
      </div>
    </div>
  );
}

export default SoilAnalysis;
