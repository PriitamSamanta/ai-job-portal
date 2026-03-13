import { Link } from "react-router-dom";

function RecruiterDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Recruiter Dashboard</h1>

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
