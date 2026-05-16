import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import API from "../services/api";

import "../styles/map.css";

function JobsMap() {

  const [jobs, setJobs] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(10);

  // FETCH JOBS
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

  // USER LOCATION
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (error) => {
        console.error(error);
      }
    );

  }, []);

  // DISTANCE
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

    const c =
      2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // FILTER JOBS
  const nearbyJobs = jobs.filter((job) => {

    if (
      !userLocation ||
      !job.latitude ||
      !job.longitude
    ) {
      return false;
    }

    const distance = getDistance(
      userLocation[0],
      userLocation[1],
      job.latitude,
      job.longitude
    );

    return distance <= radius;
  });

  return (
    <div className="map-page">

      {/* SIDEBAR */}
      <div className="map-sidebar">

        <h2>Nearby Jobs</h2>

        <p>
          Discover opportunities around your location
        </p>

        {/* FILTER */}
        <div className="map-filter">

          <select
            value={radius}
            onChange={(e) =>
              setRadius(Number(e.target.value))
            }
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={20}>20 km</option>
            <option value={50}>50 km</option>
          </select>

        </div>

        {/* JOB LIST */}
        <div className="map-job-list">

          {nearbyJobs.map((job) => {

            const distance = getDistance(
              userLocation[0],
              userLocation[1],
              job.latitude,
              job.longitude
            );

            return (
              <div
                className="map-job-card"
                key={job._id}
              >

                <h3>{job.title}</h3>

                <p className="map-job-company">
                  {job.company}
                </p>

                <p>
                  📍 {job.location}
                </p>

                <span className="map-distance">
                  {distance.toFixed(1)} km away
                </span>

              </div>
            );
          })}

        </div>
      </div>

      {/* MAP */}
      <div className="map-container-wrapper">

        <MapContainer
          center={userLocation || [23.0225, 72.5714]}
          zoom={10}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* USER */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                You are here
              </Popup>
            </Marker>
          )}

          {/* JOBS */}
          {nearbyJobs.map((job) => (
            <Marker
              key={job._id}
              position={[
                job.latitude,
                job.longitude,
              ]}
            >

              <Popup>

                <h3>{job.title}</h3>

                <p>{job.company}</p>

                <p>{job.location}</p>

                <button>
                  Apply
                </button>

              </Popup>

            </Marker>
          ))}

        </MapContainer>
      </div>
    </div>
  );
}

export default JobsMap;