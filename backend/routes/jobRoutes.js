const express = require("express");
const router = express.Router();

const { requireRecruiter } = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getJobById,
  getRecommendedJobs,
} = require("../controllers/jobController");

router.post("/", authMiddleware, requireRecruiter, createJob);

// router.post("/", authMiddleware, createJob);
router.get("/", getJobs);

router.get("/recommended", authMiddleware, getRecommendedJobs);

router.get("/:id", getJobById);

module.exports = router;
