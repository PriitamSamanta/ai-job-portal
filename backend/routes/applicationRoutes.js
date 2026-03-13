const express = require("express");
const router = express.Router();
const { requireStudent } = require("../middleware/roleMiddleware");

const {
  applyJob,
  getUserApplications,
  getApplicantsByJob,
  getRecruiterDashboard,
} = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, requireStudent, applyJob);

//router.post("/", authMiddleware, applyJob);

router.get("/user", authMiddleware, getUserApplications);

router.get("/job/:jobId", authMiddleware, getApplicantsByJob);

router.get("/recruiter/dashboard", authMiddleware, getRecruiterDashboard);

module.exports = router;
