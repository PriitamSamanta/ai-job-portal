import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/jobs.css";
import toast from "react-hot-toast";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

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

  // APPLY JOB
  const applyJob = async (jobId) => {
    try {
      await API.post("/applications", {
        job_id: jobId,
      });

      toast.success("Applied Successfully!");
    } catch (error) {
      console.error(error);

      toast.error("Already applied or error occurred");
    }
  };

  // FILTER JOBS
  const filteredJobs = jobs.filter((job) => {
    const matchTitle = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchLocation = job.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase());

    const matchSkill = job.skills_required
      .join(" ")
      .toLowerCase()
      .includes(skillFilter.toLowerCase());

    return matchTitle && matchLocation && matchSkill;
  });

  return (
    <div className="jobs-page">

      {/* MAIN CONTENT */}
      <div className="jobs-content">

        {/* TOPBAR */}
        <div className="jobs-topbar">
          <div>
            <h1>Browse Jobs</h1>
            <p>Find your next opportunity</p>
          </div>

          <input
            className="jobs-search"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTERS */}
        <div className="jobs-filters">

          <input
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />

          <input
            placeholder="Filter by skill"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
          />
        </div>

        {/* JOB CARDS */}
        <div className="jobs-grid">

          {filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>

              <h2>{job.title}</h2>

              <p className="job-company">
                {job.company}
              </p>

              <p className="job-location">
                📍 {job.location}
              </p>

              {/* SKILLS */}
              <div className="job-skills">
                {job.skills_required.map((skill, index) => (
                  <span className="skill-tag" key={index}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* FOOTER */}
              <div className="job-footer">

                <span className="match-score">
                  AI Match
                </span>

                <button
                  className="apply-btn"
                  onClick={() => applyJob(job._id)}
                >
                  Apply
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;