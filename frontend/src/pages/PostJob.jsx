import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import API from "../services/api";

import "../styles/postJob.css";

function LocationMarker({
  setLatitude,
  setLongitude,
}) {

  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {

      setPosition(e.latlng);

      setLatitude(e.latlng.lat);

      setLongitude(e.latlng.lng);
    },
  });

  return position ? (
    <Marker position={position} />
  ) : null;
}

function PostJob() {

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] =
    useState("");

  const [latitude, setLatitude] =
    useState(null);

  const [longitude, setLongitude] =
    useState(null);

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/jobs", {
        title,
        company,
        description,
        location,
        skills_required: skills
          .split(",")
          .map((s) => s.trim()),
        latitude,
        longitude,
      });

      alert("Job posted successfully!");

    } catch (error) {

      console.error(error);

      alert("Error posting job");
    }
  };

  return (
    <div className="postjob-page">

      <div className="postjob-card">

        {/* HEADER */}
        <div className="postjob-header">

          <h1>Post New Job</h1>

          <p>
            Create AI-powered job listings with
            precise map locations
          </p>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div className="postjob-form">

            <input
              className="postjob-input"
              placeholder="Job Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <input
              className="postjob-input"
              placeholder="Company Name"
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
            />

            <input
              className="postjob-input"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

            <input
              className="postjob-input"
              placeholder="Skills (React, Node, MongoDB)"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
            />

            <textarea
              className="postjob-textarea"
              placeholder="Job Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>

          {/* MAP */}
          <div className="map-section">

            <h2>Select Job Location</h2>

            <div className="map-wrapper">

              <MapContainer
                center={[23.0225, 72.5714]}
                zoom={10}
                style={{
                  height: "350px",
                  width: "100%",
                }}
              >

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />

              </MapContainer>
            </div>

            {latitude && longitude && (

              <div className="selected-location">

                📍 Selected Coordinates:
                {" "}
                {latitude.toFixed(4)},
                {" "}
                {longitude.toFixed(4)}

              </div>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="postjob-btn"
          >
            Post Job
          </button>

        </form>
      </div>
    </div>
  );
}

export default PostJob;