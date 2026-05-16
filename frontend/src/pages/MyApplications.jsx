import { useEffect, useState } from "react";
import API from "../services/api";

import "../styles/applications.css";

function MyApplications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    const fetchApplications = async () => {

      try {
        const res = await API.get(
          "/applications/user"
        );

        setApplications(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();

  }, []);

  return (
    <div className="applications-page">

      {/* HEADER */}
      <div className="applications-header">

        <h1>My Applications</h1>

        <p>
          Track your applications and AI resume analysis
        </p>

      </div>

      {/* GRID */}
      <div className="applications-grid">

        {applications.map((app) => (

          <div
            className="application-card"
            key={app._id}
          >

            <h2>
              {app.job_id?.title}
            </h2>

            <p className="application-company">
              {app.job_id?.company}
            </p>

            <p>
              📍 {app.job_id?.location}
            </p>

            {/* STATUS */}
            <span
              className={`status-badge status-${app.status}`}
            >
              {app.status}
            </span>

            {/* SCORE */}
            <div className="resume-score">

              <h4>
                Resume Score: {app.resume_score || 0}%
              </h4>

              <div className="score-bar">

                <div
                  className="score-fill"
                  style={{
                    width: `${app.resume_score || 0}%`,
                  }}
                />

              </div>
            </div>

            {/* MATCHED */}
            <div className="skills-section">

              <h4>Matched Skills</h4>

              <div className="skills-list">

                {app.matchedSkills?.map(
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
            </div>

            {/* MISSING */}
            <div className="skills-section">

              <h4>Missing Skills</h4>

              <div className="skills-list">

                {app.missingSkills?.map(
                  (skill, index) => (
                    <span
                      className="skill-tag missing-tag"
                      key={index}
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default MyApplications;