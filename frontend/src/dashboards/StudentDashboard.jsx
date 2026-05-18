import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";
import {
  FaBriefcase,
  FaMapMarkedAlt,
  FaRobot,
  FaFileUpload,
} from "react-icons/fa";

function StudentDashboard() {
  return (
    <div className="dashboard-page">


      {/* MAIN CONTENT */}
      <div className="dashboard-content">

        {/* TOPBAR */}
        <div className="dashboard-topbar">

          <div className="dashboard-title">
            <h1>Student Dashboard</h1>
            <p>Track jobs, applications, and AI recommendations</p>
          </div>

          <span className="ai-badge">
            AI Powered
          </span>
        </div>

        {/* STATS */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>Applications</h3>
            <p>12</p>
          </div>

          <div className="stat-card">
            <h3>Recommended Jobs</h3>
            <p>8</p>
          </div>

          <div className="stat-card">
            <h3>Resume Score</h3>
            <p>78%</p>
          </div>

          <div className="stat-card">
            <h3>Nearby Jobs</h3>
            <p>15</p>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="action-grid">

          <NavLink to="/upload-resume" className="action-card">
            <h2><FaFileUpload /> Upload Resume</h2>
            <p>
              Upload your resume and let AI analyze your skills.
            </p>
          </NavLink>

          <NavLink to="/recommended" className="action-card">
            <h2><FaRobot /> AI Recommended Jobs</h2>
            <p>
              Discover jobs matched with your skills and profile.
            </p>
          </NavLink>

          <NavLink to="/jobs" className="action-card">
            <h2><FaBriefcase /> Browse Jobs</h2>
            <p>
              Search and apply for the latest opportunities.
            </p>
          </NavLink>

          <NavLink to="/jobs-map" className="action-card">
            <h2><FaMapMarkedAlt /> Nearby Jobs Map</h2>
            <p>
              Explore jobs near your location using interactive maps.
            </p>
          </NavLink>

        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;