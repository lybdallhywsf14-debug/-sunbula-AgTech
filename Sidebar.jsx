import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">🌱</span>
        <h2>SANBOL</h2>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/" end>
          <span className="menu-icon">🏠</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/soil-analysis">
          <span className="menu-icon">🌱</span>
          <span>Soil Analysis</span>
        </NavLink>

        <NavLink to="/robot-control">
          <span className="menu-icon">🤖</span>
          <span>Robot Control</span>
        </NavLink>

        <NavLink to="/robot-map">
          <span className="menu-icon">📍</span>
          <span>Robot Map</span>
        </NavLink>

        <NavLink to="/scans">
          <span className="menu-icon">📊</span>
          <span>Scan History</span>
        </NavLink>

        <NavLink to="/settings">
          <span className="menu-icon">⚙️</span>
          <span>Settings</span>
        </NavLink>

        <NavLink to="/ai-chat">
          <span className="menu-icon">💬</span>
          <span>AI Chat</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <span className="connection-dot"></span>
        <span>Robot Connected</span>
      </div>
    </aside>
  );
}

export default Sidebar;