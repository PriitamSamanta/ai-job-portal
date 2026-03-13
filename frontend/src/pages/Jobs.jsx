import { useEffect, useState } from "react";
import API from "../services/api";

function Jobs() {
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

  const applyJob = async (jobId) => {
    try {
      await API.post("/applications", {
        job_id: jobId,
      });

      alert("Applied successfully!");
    } catch (error) {
      console.error(error);

      alert("Already applied or error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Jobs</h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          <h3>{job.title}</h3>

          <p>Company: {job.company}</p>

          <p>Location: {job.location}</p>

          <p>Salary: {job.salary}</p>

          <button onClick={() => applyJob(job._id)}>Apply Job</button>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
