import {
  NavLink,
  Outlet,
} from "react-router-dom";

import "../styles/admin.css";

function AdminLayout() {

  return (
    <div className="admin-page">

      {/* SIDEBAR */}
      <div className="admin-sidebar">

        <h2 className="admin-logo">
          HireAI
        </h2>

        <ul>

          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/jobs"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              Jobs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/applications"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              Applications
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/activity-logs"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              Activity Logs
            </NavLink>
          </li>

        </ul>
      </div>

      {/* CONTENT */}
      <div className="admin-content">

        <Outlet />

      </div>
    </div>
  );
}

export default AdminLayout;