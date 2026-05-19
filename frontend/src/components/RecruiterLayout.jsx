import {
  NavLink,
  Outlet,
} from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
} from "react-icons/fi";

import "../styles/recruiter.css";

function RecruiterLayout() {

  return (
    <div className="recruiter-page">

      {/* SIDEBAR */}
      <div className="recruiter-sidebar">

        <h2 className="recruiter-logo">
          HireAI
        </h2>

        <ul>

          <li>
            <NavLink
              to="/recruiter-dashboard"
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
              to="/post-job"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FiBriefcase className="sidebar-icon" />
              Post Job
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-jobs"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FiFileText className="sidebar-icon" />
              My Jobs
            </NavLink>
          </li>

        </ul>
      </div>

      {/* CONTENT */}
      <div className="recruiter-content">

        <Outlet />

      </div>
    </div>
  );
}

export default RecruiterLayout;