import { NavLink, Outlet } from "react-router-dom";

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