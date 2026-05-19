import { useState } from "react";

import API from "../services/api";

import "../styles/uploadResume.css";
import toast from "react-hot-toast";

function UploadResume() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      toast.error("Please select a PDF");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("resume", file);

      await API.post(
        "/resume/upload",
        formData
      );

      toast.success("Resume uploaded successfully");

    } catch (error) {

      console.error(error);

      toast.error("Upload failed");
    }
  };

  return (
    <div className="upload-page">

      <div className="upload-card">

        <div className="upload-badge">
          AI Resume Analyzer
        </div>

        <h1>Upload Your Resume</h1>

        <p className="upload-subtitle">
          Let AI analyze your resume
          and detect skills automatically
        </p>

        {/* DROPZONE */}
        <label className="upload-dropzone">

          <div className="upload-icon">
            📄
          </div>

          <h2>Drag & Drop Resume</h2>

          <p>
            or click to browse PDF file
          </p>

          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </label>

        {/* FILE */}
        {file && (
          <div className="selected-file">
            Selected:
            {" "}
            {file.name}
          </div>
        )}

        {/* BUTTON */}
        <button
          className="upload-btn"
          onClick={handleUpload}
        >
          Upload & Analyze
        </button>

      </div>
    </div>
  );
}

export default UploadResume;