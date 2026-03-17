import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

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
        const res = await API.get("/applications/recruiter/analytics");

        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recruiter Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Jobs</h3>
          <p>{stats.totalJobs}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Applicants</h3>
          <p>{stats.totalApplicants}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Top Candidate Score</h3>
          <p>{stats.topScore}%</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Average Resume Score</h3>
          <p>{stats.avgScore}%</p>
        </div>
      </div>

      <br />

      <Link to="/post-job">
        <button>Post New Job</button>
      </Link>

      <br />
      <br />

      <Link to="/my-jobs">
        <button>View My Jobs</button>
      </Link>
    </div>
  );
}

export default RecruiterDashboard;
