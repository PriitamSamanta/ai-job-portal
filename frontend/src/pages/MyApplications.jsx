import { useEffect, useState } from "react";
import API from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications/user");
        console.log(res.data);
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2>My Applications</h2>

      {applications.map((app) => (
        <div
          key={app._id}
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          <h3>{app.job_id?.title}</h3>

          <p>Company: {app.job_id?.company}</p>

          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;
