import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import "../styles/recommendedJobs.css";

function RecommendedJobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const res = await API.get(
          "/jobs/recommended"
        );

        setJobs(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();

  }, []);

  return (
    <div className="recommended-page">

      {/* HEADER */}
      <div className="recommended-header">

        <h1>Recommended Jobs</h1>

        <p>
          AI-powered recommendations
          based on your skills
        </p>

      </div>

      {/* GRID */}
      <div className="recommended-grid">

        {jobs.map((job) => (

          <div
            className="recommended-card"
            key={job.job?._id}
          >

            {/* TITLE */}
            <h2>{job.job?.title}</h2>

            {/* COMPANY */}
            <p className="recommended-company">
              {job.job?.company}
            </p>

            {/* LOCATION */}
            <p className="recommended-location">
              📍 {job.job?.location}
            </p>

            {/* SKILLS */}
            <div className="skills-container">

              {job.job?.skills_required?.map(
                (skill, index) => (
                  <span
                    className="skill-tag"
                    key={index}
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

            {/* MATCH SCORE */}
            <div className="match-box">

              <h4>
                Match Score:
                {" "}
                {job.matchScore || 0}%
              </h4>

              <div className="score-bar">

                <div
                  className="score-fill"
                  style={{
                    width:
                      `${job.matchScore || 0}%`,
                  }}
                />

              </div>
            </div>

            {/* BUTTON */}
            <button className="apply-btn">
              Apply Now
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default RecommendedJobs;