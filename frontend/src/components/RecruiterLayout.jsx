import {
  NavLink,
  Outlet,
} from "react-router-dom";

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