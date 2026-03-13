import { useState } from "react";
import API from "../services/api";

function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");

  const submitJob = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", {
        title,
        company,
        description,
        skills_required: skills.split(","),
        location,
      });

      alert("Job posted successfully");
    } catch (error) {
      console.error(error);

      alert("Error posting job");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Post New Job</h2>

      <form onSubmit={submitJob}>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <br />
        <br />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <br />
        <br />

        <input
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;
