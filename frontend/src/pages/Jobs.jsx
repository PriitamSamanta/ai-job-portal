import { useEffect, useState } from "react";
import API from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchTitle = job.title.toLowerCase().includes(search.toLowerCase());

    const matchLocation = job.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase());

    const matchSkill = job.skills_required
      .join(" ")
      .toLowerCase()
      .includes(skillFilter.toLowerCase());

    return matchTitle && matchLocation && matchSkill;
  });

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
      const res = await API.post("/applications", {
        job_id: jobId,
      });

      setAnalysis(res.data);
    } catch (error) {
      console.error(error);
      alert("Already applied or error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />

        <input
          placeholder="Filter by skill..."
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        />
      </div>

      <h2>Available Jobs</h2>

      {filteredJobs.map((job) => (
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

      {analysis && (
        <div
          style={{
            border: "2px solid green",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <h3>Resume Analysis</h3>

          <p>
            <strong>Resume Score:</strong> {analysis.resumeScore}%
          </p>

          <h4>Matched Skills</h4>
          <ul>
            {analysis.matchedSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h4>Missing Skills</h4>
          <ul>
            {analysis.missingSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h4>Suggested Skills To Learn</h4>

          <ul>
            {analysis.missingSkills.map((skill, index) => (
              <li key={index}>
                📚 Learn {skill}
                <a
                  href={`https://www.google.com/search?q=learn+${skill}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  (Resources)
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Jobs;
