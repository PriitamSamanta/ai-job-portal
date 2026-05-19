import {
  NavLink,
  Outlet,
} from "react-router-dom";

import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiActivity,
} from "react-icons/fi";

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
              <FiHome className="sidebar-icon" />
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
              <FiUsers className="sidebar-icon" />
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
              <FiBriefcase className="sidebar-icon" />
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
              <FiFileText className="sidebar-icon" />
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
              <FiActivity className="sidebar-icon" />
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