const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const ActivityLog = require("../models/ActivityLog");

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const totalStudents = await User.countDocuments({ role: "student" });
    const totalRecruiters = await User.countDocuments({ role: "recruiter" });

    res.json({
      totalUsers,
      totalStudents,
      totalRecruiters,
      totalJobs,
      totalApplications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter_id", "name email");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student_id", "name email")
      .populate("job_id", "title company");

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user_id", "name email role")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
