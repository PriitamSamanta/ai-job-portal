import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function StudentDashboard() {
  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <div className="dashboard-sidebar">

        <h2 className="dashboard-logo">
          HireAI
        </h2>

        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/jobs">Browse Jobs</Link>
          </li>

          <li>
            <Link to="/recommended">Recommended Jobs</Link>
          </li>

          <li>
            <Link to="/jobs-map">Jobs Map</Link>
          </li>

          <li>
            <Link to="/upload-resume">Upload Resume</Link>
          </li>

          <li>
            <Link to="/applications">My Applications</Link>
          </li>
        </ul>
      </div>

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

          <Link to="/upload-resume" className="action-card">
            <h2>Upload Resume</h2>
            <p>
              Upload your resume and let AI analyze your skills.
            </p>
          </Link>

          <Link to="/recommended" className="action-card">
            <h2>AI Recommended Jobs</h2>
            <p>
              Discover jobs matched with your skills and profile.
            </p>
          </Link>

          <Link to="/jobs" className="action-card">
            <h2>Browse Jobs</h2>
            <p>
              Search and apply for the latest opportunities.
            </p>
          </Link>

          <Link to="/jobs-map" className="action-card">
            <h2>Nearby Jobs Map</h2>
            <p>
              Explore jobs near your location using interactive maps.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;