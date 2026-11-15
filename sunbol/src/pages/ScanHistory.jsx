import { useState } from "react";
import { scanHistory } from "../data/mockData";

function ScanHistory() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const totalScans = scanHistory.length;

  const normalScans = scanHistory.filter(
    (scan) => scan.result === "Normal",
  ).length;

  const warningScans = scanHistory.filter(
    (scan) => scan.result === "Needs Attention",
  ).length;

  const filteredScans = scanHistory.filter((scan) => {
    const matchesFilter = filter === "All" || scan.result === filter;

    const matchesSearch =
      String(scan.location).toLowerCase().includes(search.toLowerCase()) ||
      String(scan.date).toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="scan-page modern-scan-page">
      {/* HEADER */}
      <div className="scan-modern-header">
        <div>
          <span className="scan-eyebrow">SMART AGRICULTURE RECORDS</span>
          <h1>Scan History</h1>
          <p>Review previous soil scans and analysis results.</p>
        </div>

        <div className="scan-total-badge">📊 {totalScans} Total Records</div>
      </div>

      {/* SUMMARY CARDS */}
      <section className="scan-modern-summary">
        <div className="scan-stat-card">
          <div className="scan-stat-icon green">📊</div>
          <span>TOTAL SCANS</span>
          <strong>{totalScans}</strong>
          <small>All recorded scans</small>
        </div>

        <div className="scan-stat-card">
          <div className="scan-stat-icon blue">✅</div>
          <span>NORMAL RESULTS</span>
          <strong>{normalScans}</strong>
          <small>Scans marked as normal</small>
        </div>

        <div className="scan-stat-card">
          <div className="scan-stat-icon orange">⚠️</div>
          <span>NEEDS ATTENTION</span>
          <strong>{warningScans}</strong>
          <small>Scans requiring attention</small>
        </div>
      </section>

      {/* TABLE */}
      <section className="scan-modern-panel">
        <div className="scan-panel-heading">
          <div>
            <h2>Previous Soil Scans</h2>
            <p>Browse your recorded soil analysis</p>
          </div>
          <span className="scan-panel-icon">🌱</span>
        </div>

        {/* SEARCH */}
        <div className="scan-toolbar">
          <div className="scan-search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by location or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="scan-filters">سسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسس
            {["All", "Normal", "Needs Attention"].map((item) => (
              <button
                key={item}
                className={filter === item ? "selected" : ""}
                onClick={() => setFilter(item)}
              >
                {item === "All" ? "All" : item}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="scan-modern-table-wrapper">
          <table className="scan-modern-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Location</th>
                <th>pH</th>
                <th>Nitrogen</th>
                <th>Phosphorus</th>
                <th>Potassium</th>
                <th>Moisture</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>
              {filteredScans.map((scan, index) => (
                <tr key={index}>
                  <td>
                    <strong>{scan.date}</strong>
                    <small>{scan.time}</small>
                  </td>

                  <td>
                    <span className="scan-location">📍 {scan.location}</span>
                  </td>

                  <td>{scan.ph}</td>
                  <td>{scan.nitrogen}</td>
                  <td>{scan.phosphorus}</td>
                  <td>{scan.potassium}</td>
                  <td>{scan.moisture}%</td>

                  <td>
                    <span
                      className={`scan-result ${
                        scan.result === "Normal"
                          ? "normal-result"
                          : "warning-result"
                      }`}
                    >
                      {scan.result === "Normal"
                        ? "✓ Normal"
                        : "⚠ Needs Attention"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredScans.length === 0 && (
            <div className="scan-empty">
              <span>🔎</span>
              <h3>No scans found</h3>
              <p>Try another search or filter.</p>
            </div>
          )}
        </div>

        <div className="scan-table-footer">
          Showing {filteredScans.length} of {totalScans} records
        </div>
      </section>

      <div className="scan-page-footer">
        <span>🌱 SANBOL Smart Agriculture</span>
        <span>Soil Analysis Records</span>
      </div>
    </div>
  );
}

export default ScanHistory;
