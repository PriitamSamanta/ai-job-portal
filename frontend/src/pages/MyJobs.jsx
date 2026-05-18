import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/myJobs.css";

function MyJobs() {

  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

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
    <div className="myjobs-page">

      {/* HEADER */}
      <div className="myjobs-header">

        <h1>My Posted Jobs</h1>

        <p>
          Manage job postings and view applicants
        </p>

      </div>

      {/* GRID */}
      <div className="myjobs-grid">

        {jobs.map((job) => (

          <div
            className="myjob-card"
            key={job._id}
          >

            <h2>{job.title}</h2>

            <p className="myjob-company">
              {job.company}
            </p>

            <p className="myjob-location">
              📍 {job.location}
            </p>

            {/* SKILLS */}
            <div className="myjob-skills">

              {job.skills_required?.map(
                (skill, index) => (
                  <span
                    className="myjob-skill"
                    key={index}
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

            {/* BUTTON */}
            <button
              className="view-btn"
              onClick={() =>
                navigate(
                  `/job-applicants/${job._id}`
                )
              }
            >
              View Applicants
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default MyJobs;