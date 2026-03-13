import { useEffect, useState } from "react";
import API from "../services/api";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/admin/jobs");

        setJobs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Jobs</h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          <h3>{job.title}</h3>

          <p>Company: {job.company}</p>

          <p>Location: {job.location}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminJobs;
