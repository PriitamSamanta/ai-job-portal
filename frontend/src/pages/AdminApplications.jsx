import { useEffect, useState } from "react";
import API from "../services/api";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/admin/applications");

        setApplications(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Applications</h2>

      {applications.map((app) => (
        <div
          key={app._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <h3>{app.student_id?.name}</h3>

          <p>Job: {app.job_id?.title}</p>

          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminApplications;
