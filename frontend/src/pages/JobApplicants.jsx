import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

function JobApplicants() {
  const { id } = useParams();

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await API.get(`/applications/job/${id}`);

        setApplicants(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplicants();
  }, [id]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/status/${id}`, { status });

      alert("Status updated");

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Applicants</h2>

      {applicants.map((app) => (
        <div
          key={app._id}
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          <h3>{app.student_id?.name}</h3>

          <p>Email: {app.student_id?.email}</p>

          <p>Status: {app.status}</p>

          <button onClick={() => updateStatus(app._id, "shortlisted")}>
            Shortlist
          </button>

          <button onClick={() => updateStatus(app._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default JobApplicants;
