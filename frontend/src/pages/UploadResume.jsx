import { useState } from "react";

import API from "../services/api";

import "../styles/uploadResume.css";

function UploadResume() {

  const [resume, setResume] = useState(null);

  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(false);

  // UPLOAD
  const handleUpload = async () => {

    if (!resume) {
      alert("Please select a resume");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resume);

      const res = await API.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setSkills(res.data.detectedSkills || []);

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);

      alert("Upload failed");
    }
  };

  return (
    <div className="upload-page">

      <div className="upload-card">

        {/* HEADER */}
        <div className="upload-header">

          <span className="ai-badge">
            AI Resume Analyzer
          </span>

          <h1>Upload Your Resume</h1>

          <p>
            Let AI analyze your resume and
            detect skills automatically
          </p>

        </div>

        {/* DROPZONE */}
        <label className="upload-dropzone">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResume(e.target.files[0])
            }
          />

          <h2>
            Drag & Drop Resume
          </h2>

          <p>
            or click to browse PDF file
          </p>

          {resume && (
            <p>
              Selected File:
              <strong> {resume.name}</strong>
            </p>
          )}

        </label>

        {/* BUTTON */}
        <button
          className="upload-btn"
          onClick={handleUpload}
        >

          {loading
            ? "Analyzing Resume..."
            : "Upload & Analyze"}

        </button>

        {/* ANALYSIS */}
        {skills.length > 0 && (

          <div className="analysis-card">

            <h2>
              Detected Skills
            </h2>

            <p>
              AI successfully analyzed your resume
            </p>

            <div className="skills-container">

              {skills.map((skill, index) => (
                <span
                  className="skill-tag"
                  key={index}
                >
                  {skill}
                </span>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default UploadResume;