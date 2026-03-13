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
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>

      {users.map((user) => (
        <div
          key={user._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <h3>{user.name}</h3>

          <p>Email: {user.email}</p>

          <p>Role: {user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;
