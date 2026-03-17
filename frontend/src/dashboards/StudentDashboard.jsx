import { Link } from "react-router-dom";
import "../styles/studentDashboard.css";

function StudentDashboard() {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}

      <div className="sidebar">
        <h2 className="logo">HuntJobs</h2>

        <ul>
          <li className="active">Dashboard</li>

          <li>
            <Link to="/upload-resume">Upload Resume</Link>
          </li>

          <li>
            <Link to="/recommended">Recommended Jobs</Link>
          </li>

          <li>
            <Link to="/jobs">Browse Jobs</Link>
          </li>

          <li>
            <Link to="/applications">My Applications</Link>
          </li>

          <li>
            <Link to="/jobs-map">Jobs Map</Link>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}

      <div className="main-content">
        <h1>Student Dashboard</h1>

        <div className="cards">
          <Link to="/upload-resume" className="card">
            <h3>Upload Resume</h3>
            <p>Add your resume to analyze skills</p>
          </Link>

          <Link to="/recommended" className="card">
            <h3>Recommended Jobs</h3>
            <p>AI matched jobs for you</p>
          </Link>

          <Link to="/jobs" className="card">
            <h3>Browse Jobs</h3>
            <p>Explore all available jobs</p>
          </Link>

          <Link to="/applications" className="card">
            <h3>My Applications</h3>
            <p>Track your applied jobs</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
