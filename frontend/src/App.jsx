import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import RecommendedJobs from "./pages/RecommendedJobs";
import StudentDashboard from "./dashboards/StudentDashboard";
import UploadResume from "./pages/UploadResume";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./dashboards/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import JobApplicants from "./pages/JobApplicants";
import AdminDashboard from "./dashboards/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJobs";
import AdminApplications from "./pages/AdminApplications";
import ActivityLogs from "./pages/ActivityLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/recommended" element={<RecommendedJobs />} />
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/job-applicants/:id" element={<JobApplicants />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-jobs" element={<AdminJobs />} />
        <Route path="/admin-applications" element={<AdminApplications />} />
        <Route path="/activity-logs" element={<ActivityLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
