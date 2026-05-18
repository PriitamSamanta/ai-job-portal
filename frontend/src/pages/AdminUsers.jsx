import { useEffect, useState } from "react";
import API from "../services/api";


function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");

        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-page-content">

      <div className="admin-page-header">
        <h1>All Users</h1>

        <p>
          Manage students,
          recruiters, and admins
        </p>
      </div>

      <div className="admin-list">

        {users.map((user) => (
          <div
            className="admin-row-card"
            key={user._id}
          >

            <div className="admin-row-left">

              <h2>{user.name}</h2>

              <p>{user.email}</p>

            </div>

            <div className="admin-row-right">

              <div className="admin-badge">
                {user.role}
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminUsers;
