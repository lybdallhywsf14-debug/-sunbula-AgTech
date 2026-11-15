import { useState } from "react";

function RobotControl() {
  const [direction, setDirection] = useState("Stopped");
  const [speed, setSpeed] = useState(50);

  const moveRobot = (newDirection) => {
    setDirection(newDirection);
  };

  const stopRobot = () => {
    setDirection("Stopped");
  };

  const movements = {
    Forward: "Moving Forward",
    Backward: "Moving Backward",
    Left: "Turning Left",
    Right: "Turning Right",
    Stopped: "Robot Stopped",
  };

  return (
    <div className="robot-page modern-robot-page">
      {/* HEADER */}
      <div className="robot-modern-header">
        <div>
          <span className="robot-eyebrow">ROBOT MANAGEMENT SYSTEM</span>
          <h1>Robot Control</h1>
          <p>Control and monitor your SANBOL agricultural robot.</p>
        </div>

        <div className="robot-connection-badge">
          <span></span>
          Connected
        </div>
      </div>

      {/* ROBOT OVERVIEW */}
      <section className="robot-overview-cards">
        <div className="robot-overview-card">
          <div className="robot-overview-icon green">🤖</div>
          <div>
            <span>ROBOT STATUS</span>
            <strong>Ready</strong>
            <small>System operational</small>
          </div>
        </div>

        <div className="robot-overview-card">
          <div className="robot-overview-icon blue">🔋</div>
          <div>
            <span>BATTERY LEVEL</span>
            <strong>87%</strong>
            <small>Good condition</small>
          </div>
        </div>

        <div className="robot-overview-card">
          <div className="robot-overview-icon purple">⚙️</div>
          <div>
            <span>MOVEMENT</span>
            <strong>{direction}</strong>
            <small>Current direction</small>
          </div>
        </div>
      </section>

      {/* MAIN CONTROL */}
      <div className="robot-modern-layout">
        <section className="modern-control-panel">
          <div className="robot-panel-heading">
            <div>
              <h2>Movement Control</h2>
              <p>Choose a direction to control the robot</p>
            </div>
            <span className="control-heading-icon">🎮</span>
          </div>

          <div className="robot-direction-pad">
            <button
              className="direction-button forward"
              onClick={() => moveRobot("Forward")}
              aria-label="Move Forward"
            >
              <span>↑</span>
              <small>FORWARD</small>
            </button>

            <div className="robot-middle-controls">
              <button
                className="direction-button"
                onClick={() => moveRobot("Left")}
                aria-label="Move Left"
              >
                <span>←</span>
                <small>LEFT</small>
              </button>

              <button className="robot-stop-button" onClick={stopRobot}>
                <span>■</span>
                STOP
              </button>

              <button
                className="direction-button"
                onClick={() => moveRobot("Right")}
                aria-label="Move Right"
              >
                <span>→</span>
                <small>RIGHT</small>
              </button>
            </div>

            <button
              className="direction-button backward"
              onClick={() => moveRobot("Backward")}
              aria-label="Move Backward"
            >
              <span>↓</span>
              <small>BACKWARD</small>
            </button>
          </div>

          <div className="robot-control-note">
            <span>ℹ️</span>
            Select a direction or press STOP.
          </div>
        </section>

        {/* STATUS PANEL */}
        <section className="modern-robot-status">
          <div className="robot-panel-heading">
            <div>
              <h2>Robot Status</h2>
              <p>Current robot information</p>
            </div>
            <span className="control-heading-icon">📊</span>
          </div>

          <div className="modern-status-item">
            <span>Connection</span>
            <strong className="status-connected">
              <i></i> Connected
            </strong>
          </div>

          <div className="modern-status-item">
            <span>Current Movement</span>
            <strong>{direction}</strong>
          </div>

          <div className="modern-status-item">
            <span>Battery</span>
            <strong>87%</strong>
          </div>

          <div className="modern-status-item">
            <span>Speed</span>
            <strong>{speed}%</strong>
          </div>

          <div className="robot-current-action">
            <span>⚡ CURRENT ACTION</span>
            <h3>{movements[direction]}</h3>
          </div>
        </section>
      </div>

      {/* SPEED CONTROL */}
      <section className="modern-speed-panel">
        <div className="robot-panel-heading">
          <div>
            <h2>Speed Control</h2>
            <p>Adjust the robot movement speed</p>
          </div>

          <div className="speed-icon">⚡</div>
        </div>

        <div className="modern-speed-value">
          <strong>{speed}%</strong>
          <span>Selected Speed</span>
        </div>

        <input
          className="modern-speed-slider"
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{
            "--speed-progress": `${speed}%`,
          }}
        />

        <div className="modern-speed-labels">
          <span>0% · Slow</span>
          <span>50% · Medium</span>
          <span>100% · Fast</span>
        </div>
      </section>

      <div className="robot-page-footer">
        <span>🤖 SANBOL Robot Management</span>
        <span>Smart Agricultural Control System</span>
      </div>
    </div>
  );
}

export default RobotControl;
