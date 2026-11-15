import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import SoilAnalysis from "./pages/SoilAnalysis";
import RobotControl from "./pages/RobotControl";
import ScanHistory from "./pages/ScanHistory";
import Settings from "./pages/Settings";
import AIchat from "./pages/AIchat";
import RobotMap from "./pages/RobotMap";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="main-area">
          <header className="topbar">
            <div>
              <h3>SANBOL Agricultural Robot</h3>
              <p>Smart farming control system</p>
            </div>

            <div className="top-status">
              <span className="status-dot"></span>
              Connected
            </div>
          </header>

          <main className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/soil-analysis" element={<SoilAnalysis />} />
              <Route path="/robot-control" element={<RobotControl />} />
              <Route path="/scans" element={<ScanHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/ai-chat" element={<AIchat />} />
              <Route path="/robot-map" element={<RobotMap />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
