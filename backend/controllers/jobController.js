const Job = require("../models/Job");
const User = require("../models/User");
const calculateJobMatch = require("../services/jobRecommendation");

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      skills_required,
      location,
      salary,
      experience_required,
      latitude,
      longitude
    } = req.body;

    const recruiter_id = req.userId;

    const job = await Job.create({
      title,
      company,
      description,
      skills_required,
      location,
      salary,
      experience_required,
      latitude,
      longitude,
      recruiter_id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getRecommendedJobs = async (req, res) => {
  try {
    console.log("User ID:", req.userId);
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userSkills = user.skills || [];

    const jobs = await Job.find();

    const recommendations = jobs.map((job) => {
      const score = calculateJobMatch(job.skills_required, userSkills);

      return {
        job,
        matchScore: score,
      };
    });

    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    res.json(recommendations);
  } catch (error) {
    console.log("Recommendation Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
