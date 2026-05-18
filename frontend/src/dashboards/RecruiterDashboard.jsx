import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/recruiter.css";

function RecruiterDashboard() {

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    topScore: 0,
    avgScore: 0,
  });

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const res = await API.get(
          "/applications/recruiter/analytics"
        );

        setStats(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();

  }, []);

  return (
    <div className="recruiter-page">

      {/* MAIN CONTENT */}
      <div className="recruiter-content">

        {/* TOPBAR */}
        <div className="recruiter-topbar">

          <div className="recruiter-title">
            <h1>Recruiter Dashboard</h1>

            <p>
              Manage jobs and track candidate performance
            </p>
          </div>

          <span className="recruiter-badge">
            Hiring Analytics
          </span>
        </div>

        {/* STATS */}
        <div className="recruiter-stats">

          <div className="recruiter-stat-card">
            <h3>Total Jobs</h3>
            <p>{stats.totalJobs}</p>
          </div>

          <div className="recruiter-stat-card">
            <h3>Total Applicants</h3>
            <p>{stats.totalApplicants}</p>
          </div>

          <div className="recruiter-stat-card">
            <h3>Top Candidate Score</h3>
            <p>{stats.topScore}%</p>
          </div>

          <div className="recruiter-stat-card">
            <h3>Average Resume Score</h3>
            <p>{stats.avgScore}%</p>
          </div>

        </div>

        {/* ACTION CARDS */}
        <div className="recruiter-actions">

          <NavLink to="/post-job" className="recruiter-card">

            <h2>Post New Job</h2>

            <p>
              Create and publish job openings with
              map-based location support.
            </p>

          </NavLink>

          <NavLink to="/my-jobs" className="recruiter-card">

            <h2>Manage Jobs</h2>

            <p>
              View posted jobs, applicants,
              rankings, and hiring status.
            </p>

          </NavLink>

        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;