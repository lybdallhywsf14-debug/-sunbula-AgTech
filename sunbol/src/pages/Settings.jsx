import { useState } from "react";

const defaultSettings = {
  robotName: "SANBOL",
  wifi: "SANBOL_WIFI",
  connection: "Wi-Fi",
  autoScan: true,
  notifications: true,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("sanbol-settings");
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSavedMessage("");
  };

  const saveSettings = () => {
    localStorage.setItem("sanbol-settings", JSON.stringify(settings));
    setSavedMessage("Settings saved successfully!");
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("sanbol-settings");
    setSavedMessage("Settings have been reset.");
  };

  return (
    <div className="settings-page modern-settings">
      <div className="settings-heading">
        <div>
          <span className="settings-eyebrow">SYSTEM PREFERENCES</span>
          <h1>Settings</h1>
          <p>Customize your SANBOL robot and manage system preferences.</p>
        </div>

        <div className="settings-icon">⚙️</div>
      </div>

      <div className="settings-grid">
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-card-icon">🤖</div>
            <div>
              <h2>Robot Settings</h2>
              <p>Manage your robot information and connection.</p>
            </div>
          </div>

          <div className="setting-item">
            <label>Robot Name</label>
            <input
              type="text"
              value={settings.robotName}
              onChange={(e) => updateSetting("robotName", e.target.value)}
              placeholder="Enter robot name"
            />
          </div>

          <div className="setting-item">
            <label>Connection Type</label>
            <select
              value={settings.connection}
              onChange={(e) => updateSetting("connection", e.target.value)}
            >
              <option>Wi-Fi</option>
              <option>Bluetooth</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Wi-Fi Network</label>
            <input
              type="text"
              value={settings.wifi}
              onChange={(e) => updateSetting("wifi", e.target.value)}
              placeholder="Enter Wi-Fi name"
            />
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-card-icon">🌱</div>
            <div>
              <h2>Scan Settings</h2>
              <p>Control automatic scanning and alerts.</p>
            </div>
          </div>

          <div className="toggle-item">
            <div>
              <strong>Automatic Soil Scan</strong>
              <p>Allow the robot to scan soil automatically.</p>
            </div>

            <button
              type="button"
              aria-label="Toggle automatic soil scan"
              aria-pressed={settings.autoScan}
              className={settings.autoScan ? "toggle active" : "toggle"}
              onClick={() => updateSetting("autoScan", !settings.autoScan)}
            >
              <span />
            </button>
          </div>

          <div className="settings-divider" />

          <div className="toggle-item">
            <div>
              <strong>Notifications</strong>
              <p>Receive alerts when soil needs attention.</p>
            </div>

            <button
              type="button"
              aria-label="Toggle notifications"
              aria-pressed={settings.notifications}
              className={settings.notifications ? "toggle active" : "toggle"}
              onClick={() =>
                updateSetting("notifications", !settings.notifications)
              }
            >
              <span />
            </button>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-card-icon">📡</div>
            <div>
              <h2>System Status</h2>
              <p>Current system information.</p>
            </div>
          </div>

          <div className="system-row">
            <span>Robot</span>
            <strong className="status-demo">Demo Status</strong>
          </div>

          <div className="system-row">
            <span>Wi-Fi</span>
            <strong className="status-demo">Demo Status</strong>
          </div>

          <div className="system-row">
            <span>Battery</span>
            <strong>
              87% <span className="battery-icon">🔋</span>
            </strong>
          </div>

          <div className="system-row">
            <span>System Version</span>
            <strong>1.0.0</strong>
          </div>

          <p className="settings-note">
            Connection and battery values are currently sample information.
          </p>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-card-icon">💾</div>
            <div>
              <h2>Data Settings</h2>
              <p>Save or restore your preferences.</p>
            </div>
          </div>

          <div className="settings-actions">
            <button className="save-button" onClick={saveSettings}>
              <span>✓</span> Save Settings
            </button>

            <button className="reset-button" onClick={resetSettings}>
              ↻ Reset Settings
            </button>
          </div>

          {savedMessage && <p className="settings-success">{savedMessage}</p>}
        </section>
      </div>
    </div>
  );
}

export default Settings;
