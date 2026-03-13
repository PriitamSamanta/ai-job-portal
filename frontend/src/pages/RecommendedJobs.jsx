import { useEffect, useState } from "react";
import API from "../services/api";

function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const res = await API.get("/jobs/recommended");

        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendedJobs();
  }, []);

  return (
    <div>
      <h2>Recommended Jobs</h2>

      {jobs.map((item) => (
        <div
          key={item.job._id}
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          <h3>{item.job.title}</h3>

          <p>Company: {item.job.company}</p>

          <p>Location: {item.job.location}</p>

          <p>Match Score: {item.matchScore}%</p>
        </div>
      ))}
    </div>
  );
}

export default RecommendedJobs;
