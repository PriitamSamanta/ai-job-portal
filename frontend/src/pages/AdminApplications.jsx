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
    <div className="admin-page-content">

      <div className="admin-page-header">
        <h1>Applications</h1>

        <p>
          Monitor all job applications
        </p>
      </div>

      <div className="admin-list">

        {applications.map((app) => (
          <div
            className="admin-row-card"
            key={app._id}
          >

            <div className="admin-row-left">

              <h2>
                {app.student_id?.name || "Unknown User"}
              </h2>

              <p>
                {app.student_id?.email || "No Email"}
              </p>

              <p>
                Applied for:
                {" "}
                {app.job_id?.title || "No Job"}
              </p>

            </div>

            <div className="admin-row-right">

              <div
                className={`admin-badge ${app.status}`}
              >
                {app.status}
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminApplications;
