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
    <div className="admin-page-content">

      <div className="admin-page-header">
        <h1>All Jobs</h1>

        <p>
          Monitor all job postings
        </p>
      </div>

      <div className="admin-list">

        {jobs.map((job) => (
          <div
            className="admin-row-card"
            key={job._id}
          >

            <div className="admin-row-left">

              <h2>{job.title}</h2>

              <p>{job.company}</p>

              <p>{job.location}</p>

            </div>

            <div className="admin-row-right">

              <div className="admin-badge">
                Active Job
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminJobs;
