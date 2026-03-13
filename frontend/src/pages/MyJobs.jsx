import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");

        setJobs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Posted Jobs</h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <h3>{job.title}</h3>

          <p>{job.company}</p>

          <Link to={`/job-applicants/${job._id}`}>
            <button>View Applicants</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyJobs;
