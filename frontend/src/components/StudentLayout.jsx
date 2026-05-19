import { NavLink, Outlet } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiActivity,
  FiMapPin,
  FiUpload,
} from "react-icons/fi";

import "../styles/dashboard.css";

function StudentLayout() {

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <div className="dashboard-sidebar">

        <h2 className="dashboard-logo">
          HireAI
        </h2>

        <ul>

          <li>
            <NavLink
              to="/dashboard"
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
              to="/jobs"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FiBriefcase className="sidebar-icon" />
              Browse Jobs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/recommended"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FiUsers className="sidebar-icon" />
              Recommended Jobs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/jobs-map"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FiMapPin className="sidebar-icon" />
              Jobs Map
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/upload-resume"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FiUpload className="sidebar-icon" />
              Upload Resume
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/applications"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FiFileText className="sidebar-icon" />
              My Applications
            </NavLink>
          </li>

        </ul>
      </div>

      {/* PAGE CONTENT */}
      <div className="dashboard-content">

        <Outlet />

      </div>
    </div>
  );
}

export default StudentLayout;