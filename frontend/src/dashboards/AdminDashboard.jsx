import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";

import API from "../services/api";

import "../styles/admin.css";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await API.get(
          "/admin/stats"
        );

        setStats(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();

  }, []);

  return (
    <div className="admin-page">


      {/* CONTENT */}
      <div className="admin-content">

        {/* TOPBAR */}
        <div className="admin-topbar">

          <div className="admin-title">

            <h1>Admin Dashboard</h1>

            <p>
              Monitor platform analytics and
              manage system activities
            </p>

          </div>

          <span className="admin-badge">
            System Analytics
          </span>
        </div>

        {/* STATS */}
        <div className="admin-stats">

          <div className="admin-stat-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Students</h3>
            <p>{stats.totalStudents}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Recruiters</h3>
            <p>{stats.totalRecruiters}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Total Jobs</h3>
            <p>{stats.totalJobs}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Applications</h3>
            <p>{stats.totalApplications}</p>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="admin-actions">

          <Link
            to="/admin/users"
            className="admin-card"
          >

            <h2>Manage Users</h2>

            <p>
              View and monitor students,
              recruiters, and admin accounts.
            </p>

          </Link>

          <Link
            to="/admin/jobs"
            className="admin-card"
          >

            <h2>Manage Jobs</h2>

            <p>
              Track job postings and monitor
              recruitment activities.
            </p>

          </Link>

          <Link
            to="/admin/applications"
            className="admin-card"
          >

            <h2>Applications Overview</h2>

            <p>
              Analyze applications and AI
              recruitment insights.
            </p>

          </Link>

          <Link
            to="/admin/activity-logs"
            className="admin-card"
          >

            <h2>System Activity Logs</h2>

            <p>
              Monitor user activities and
              platform actions in real-time.
            </p>

          </Link>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;