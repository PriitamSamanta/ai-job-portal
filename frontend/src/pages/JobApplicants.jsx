import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";

import "../styles/jobApplicants.css";

function JobApplicants() {

  const [applications, setApplications] =
    useState([]);

  const { jobId } = useParams();

  // FETCH
  useEffect(() => {

    const fetchApplicants = async () => {

      try {

        const res = await API.get(
          `/applications/job/${jobId}`
        );

        setApplications(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchApplicants();

  }, [jobId]);

  // UPDATE STATUS
  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      await API.put(
        `/applications/status/${applicationId}`,
        { status }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );

    } catch (error) {

      console.error(error);

      alert("Failed to update status");
    }
  };

  return (
    <div className="applicants-page">

      {/* HEADER */}
      <div className="applicants-header">

        <h1>Job Applicants</h1>

        <p>
          AI-ranked candidates for this job
        </p>

      </div>

      {/* GRID */}
      <div className="applicants-grid">

        {applications.map((app) => (

          <div
            className="applicant-card"
            key={app._id}
          >

            <h2 className="applicant-name">
              {app.student_id?.name}
            </h2>

            <p className="applicant-email">
              {app.student_id?.email}
            </p>

            {/* SCORE */}
            <div className="score-section">

              <h4>
                Resume Score:
                {" "}
                {app.resume_score || 0}%
              </h4>

              <div className="score-bar">

                <div
                  className="score-fill"
                  style={{
                    width:
                      `${app.resume_score || 0}%`,
                  }}
                />

              </div>
            </div>

            {/* STATUS */}
            <span
              className={`status-badge status-${app.status}`}
            >
              {app.status}
            </span>

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

            {/* BUTTONS */}
            <div className="action-buttons">

              <button
                className="shortlist-btn"
                onClick={() =>
                  updateStatus(
                    app._id,
                    "shortlisted"
                  )
                }
              >
                Shortlist
              </button>

              <button
                className="reject-btn"
                onClick={() =>
                  updateStatus(
                    app._id,
                    "rejected"
                  )
                }
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default JobApplicants;