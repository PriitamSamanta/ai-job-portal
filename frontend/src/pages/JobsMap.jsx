import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import API from "../services/api";

function JobsMap() {
  const [jobs, setJobs] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(10); // default 10km

  // Fetch jobs
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

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Location error:", error);
      },
    );
  }, []);

  // Distance calculation (Haversine)
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // Filter nearby jobs
  const nearbyJobs = jobs.filter((job) => {
    if (!userLocation || !job.latitude || !job.longitude) return false;

    const distance = getDistance(
      userLocation[0],
      userLocation[1],
      job.latitude,
      job.longitude,
    );

    return distance <= radius;
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* 🔽 Radius Selector */}
      <div style={{ padding: "10px", background: "#fff" }}>
        <label>Select Distance: </label>

        <select
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        >
          <option value={5}>5 km</option>
          <option value={10}>10 km</option>
          <option value={20}>20 km</option>
          <option value={50}>50 km</option>
        </select>
      </div>

      {/* 🗺️ Map */}
      <MapContainer
        center={userLocation || [23.0225, 72.5714]}
        zoom={10}
        style={{ height: "90%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 👤 User Marker */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* 📍 Job Markers */}
        {nearbyJobs.map((job) => (
          <Marker key={job._id} position={[job.latitude, job.longitude]}>
            <Popup>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>

              <button onClick={() => alert(`Apply for ${job.title}`)}>
                Apply
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default JobsMap;
