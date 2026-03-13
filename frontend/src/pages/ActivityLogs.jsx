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
    <div style={{ padding: "20px" }}>
      <h2>Activity Logs</h2>

      {logs.map((log) => (
        <div
          key={log._id}
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          <p>{log.action}</p>

          <p>{new Date(log.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default ActivityLogs;
