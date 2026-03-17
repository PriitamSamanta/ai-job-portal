import { useState } from "react";
import API from "../services/api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const submitJob = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", {
        title,
        company,
        description,
        skills_required: skills.split(","),
        location,
        latitude,
        longitude,
      });

      alert("Job posted successfully");
    } catch (error) {
      console.error(error);

      alert("Error posting job");
    }
  };

  function LocationMarker({ setLatitude, setLongitude }) {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });

    return null;
  }

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

        <h3>Select Job Location on Map</h3>

        <MapContainer
          center={[23.0225, 72.5714]} // Ahmedabad default
          zoom={10}
          style={{ height: "300px", width: "100%", marginBottom: "20px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <LocationMarker
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />

          {latitude && longitude && <Marker position={[latitude, longitude]} />}
        </MapContainer>

        {latitude && (
          <p>
            Selected Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </p>
        )}

        <br />
        <br />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;
