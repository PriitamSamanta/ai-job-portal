const express = require("express");
const router = express.Router();
const { requireAdmin } = require("../middleware/roleMiddleware");

const {
  getAdminStats,
  getAllUsers,
  getAllJobs,
  getAllApplications,
  getActivityLogs,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/stats", authMiddleware, requireAdmin, getAdminStats);

// router.get("/stats", authMiddleware, getAdminStats);

router.get("/users", authMiddleware, getAllUsers);

router.get("/jobs", authMiddleware, getAllJobs);

router.get("/applications", authMiddleware, getAllApplications);

router.get("/activity-logs", authMiddleware, requireAdmin, getActivityLogs);

module.exports = router;
