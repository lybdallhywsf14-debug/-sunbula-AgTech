import { Link } from "react-router-dom";
import { soilData, robotData, recommendations } from "../data/mockData";

function Dashboard() {
  const sensors = [
    {
      name: "pH Level",
      value: soilData.ph,
      unit: "",
      icon: "🧪",
      status: "Low",
      type: "warning",
      percent: 45,
    },
    {
      name: "Nitrogen",
      value: soilData.nitrogen,
      unit: "mg/kg",
      icon: "🌱",
      status: "Low",
      type: "warning",
      percent: 35,
    },
    {
      name: "Phosphorus",
      value: soilData.phosphorus,
      unit: "mg/kg",
      icon: "🧫",
      status: "Normal",
      type: "normal",
      percent: 70,
    },
    {
      name: "Potassium",
      value: soilData.potassium,
      unit: "mg/kg",
      icon: "🍃",
      status: "Low",
      type: "warning",
      percent: 40,
    },
    {
      name: "Moisture",
      value: soilData.moisture,
      unit: "%",
      icon: "💧",
      status: "Low",
      type: "warning",
      percent: 32,
    },
    {
      name: "Temperature",
      value: soilData.temperature,
      unit: "°C",
      icon: "🌡️",
      status: "Normal",
      type: "normal",
      percent: 65,
    },
  ];

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">SMART AGRICULTURE SYSTEM</span>
          <h1>Welcome to SANBOL 🌱</h1>
          <p>
            Monitor your agricultural robot and soil conditions from one place.
          </p>
        </div>

        <div className="dashboard-actions">
          <Link to="/soil-analysis" className="primary-button">
            View Soil Analysis →
          </Link>
          <Link to="/robot-control" className="secondary-button">
            🤖 Control Robot
          </Link>
        </div>
      </div>

      {/* ROBOT OVERVIEW */}
      <div className="dashboard-section-heading">
        <div>
          <h2>Robot Overview</h2>
          <p>Current system status</p>
        </div>
        <span className="live-label">
          <span className="live-dot"></span>
          System Overview
        </span>
      </div>

      <section className="status-cards">
        <div className="card dashboard-stat-card">
          <div className="stat-top">
            <div className="stat-icon green-icon">🤖</div>
            <span className="stat-label">ROBOT STATUS</span>
          </div>
          <strong className="stat-value">{robotData.status}</strong>
          <p>Ready to operate</p>
          <div className="stat-footer">
            <span className="small-green-dot"></span>
            Robot connection status
          </div>
        </div>

        <div className="card dashboard-stat-card">
          <div className="stat-top">
            <div className="stat-icon blue-icon">🔋</div>
            <span className="stat-label">BATTERY LEVEL</span>
          </div>
          <strong className="stat-value">{robotData.battery}%</strong>
          <p>Battery condition</p>
          <div className="stat-progress">
            <span style={{ width: `${robotData.battery}%` }}></span>
          </div>
        </div>

        <div className="card dashboard-stat-card">
          <div className="stat-top">
            <div className="stat-icon purple-icon">📶</div>
            <span className="stat-label">CONNECTION</span>
          </div>
          <strong className="stat-value">{robotData.connection}</strong>
          <p>Network connection</p>
          <div className="stat-footer">
            <span className="small-green-dot"></span>
            Connection information
          </div>
        </div>
      </section>

      {/* SOIL OVERVIEW */}
      <section className="dashboard-soil-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Soil Overview</h2>
            <p>Latest soil sensor readings</p>
          </div>

          <Link to="/soil-analysis" className="view-all-link">
            View all →
          </Link>
        </div>

        <div className="modern-sensor-grid">
          {sensors.map((sensor) => (
            <div className="modern-sensor-card" key={sensor.name}>
              <div className="modern-sensor-top">
                <div className="sensor-icon-box">{sensor.icon}</div>

                <span className={`modern-status ${sensor.type}`}>
                  {sensor.status}
                </span>
              </div>

              <p>{sensor.name}</p>

              <div className="modern-sensor-value">
                {sensor.value}
                <small>{sensor.unit}</small>
              </div>

              <div className="sensor-progress">
                <span
                  className={sensor.type}
                  style={{ width: `${sensor.percent}%` }}
                ></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section className="dashboard-bottom modern-dashboard-bottom">
        <div className="recommendation modern-panel">
          <div className="panel-heading">
            <div className="panel-heading-icon">💡</div>
            <div>
              <h2>Soil Recommendations</h2>
              <p>Suggestions based on soil readings</p>
            </div>
          </div>

          {recommendations.map((item, index) => (
            <div className="modern-recommendation-item" key={index}>
              <span className={`recommendation-indicator ${item.type}`}>
                {item.type === "warning" ? "!" : "✓"}
              </span>

              <div>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
              </div>
            </div>
          ))}

          <Link to="/soil-analysis" className="panel-link">
            Explore soil analysis →
          </Link>
        </div>

        <div className="quick-control modern-panel">
          <div className="panel-heading">
            <div className="panel-heading-icon">🤖</div>
            <div>
              <h2>Robot Control</h2>
              <p>Current robot movement</p>
            </div>
          </div>

          <div className="movement-display">
            <span className="movement-icon">⚙️</span>
            <div>
              <small>CURRENT MOVEMENT</small>
              <strong>{robotData.movement}</strong>
            </div>
          </div>

          <div className="robot-speed-display">
            <span>Robot Speed</span>
            <strong>{robotData.speed}%</strong>
          </div>

          <div className="speed-progress">
            <span style={{ width: `${robotData.speed}%` }}></span>
          </div>

          <Link to="/robot-control" className="control-button">
            Open Robot Controls →
          </Link>
        </div>
      </section>

      <div className="dashboard-footer">
        <span>🌱 SANBOL Smart Agriculture System</span>
        <span>Monitoring your farm intelligently</span>
      </div>
    </div>
  );
}

export default Dashboard;
