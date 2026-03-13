import { useState } from "react";
import API from "../services/api";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
      const res = await API.post("/resume/upload", formData);

      setSkills(res.data.detectedSkills);

      alert("Resume uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Upload Resume</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed gray",
          padding: "40px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <p>Drag & Drop your Resume here</p>

        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>

      <button onClick={uploadResume}>Upload Resume</button>

      <br />
      <br />

      {skills.length > 0 && (
        <div>
          <h3>Detected Skills</h3>

          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadResume;
