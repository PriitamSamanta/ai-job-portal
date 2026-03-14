const express = require("express");
const router = express.Router();
const { requireStudent } = require("../middleware/roleMiddleware");
const { requireRecruiter } = require("../middleware/roleMiddleware");

const {
  applyJob,
  getUserApplications,
  getApplicantsByJob,
  getRecruiterDashboard,
  updateApplicationStatus,
  getRecruiterAnalytics,
} = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, requireStudent, applyJob);

//router.post("/", authMiddleware, applyJob);

router.get("/user", authMiddleware, getUserApplications);

router.get("/job/:jobId", authMiddleware, getApplicantsByJob);

router.get("/recruiter/dashboard", authMiddleware, getRecruiterDashboard);

router.put(
  "/status/:applicationId",
  authMiddleware,
  requireRecruiter,
  updateApplicationStatus,
);

router.get(
  "/recruiter/analytics",
  authMiddleware,
  requireRecruiter,
  getRecruiterAnalytics,
);

module.exports = router;
