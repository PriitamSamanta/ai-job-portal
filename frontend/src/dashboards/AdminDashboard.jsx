import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

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
        const res = await API.get("/admin/stats");

        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Recruiters</h3>
          <p>{stats.totalRecruiters}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Jobs</h3>
          <p>{stats.totalJobs}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Applications</h3>
          <p>{stats.totalApplications}</p>
        </div>
      </div>

      <Link to="/admin-users">
        <button>View Users</button>
      </Link>
      <Link to="/admin-jobs">
        <button>View Jobs</button>
      </Link>
      <Link to="/admin-applications">
        <button>View Applications</button>
      </Link>
      <Link to="/activity-logs">
        <button>Activity Logs</button>
      </Link>
    </div>
  );
}

export default AdminDashboard;
