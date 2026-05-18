import { useEffect, useState } from "react";
import API from "../services/api";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get("/admin/activity-logs");

        setLogs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="admin-page-content">

      <div className="admin-page-header">
        <h1>Activity Logs</h1>

        <p>
          Track platform activities
        </p>
      </div>

      <table className="activity-table">

        <thead>
          <tr>
            <th>Action</th>
            <th>User</th>
            <th>Date & Time</th>
          </tr>
        </thead>

        <tbody>

          {logs.map((log) => (
            <tr key={log._id}>

              <td>
                {log.action}
              </td>

              <td>
                {log.user_id?.name || "Unknown"}
              </td>

              <td>
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default ActivityLogs;
