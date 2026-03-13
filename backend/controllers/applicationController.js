const Application = require("../models/Application");
const Job = require("../models/Job");
const calculateResumeScore = require("../services/resumeScorer");
const logActivity = require("../services/activityLogger");

exports.applyJob = async (req, res) => {
  try {
    const student_id = req.userId;
    const { job_id } = req.body;

    const alreadyApplied = await Application.findOne({
      student_id,
      job_id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    // get job details
    const job = await Job.findById(job_id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const jobSkills = job.skills_required;

    // For now we simulate resume skills
    // Later this will come from resume analyzer
    const user = await User.findById(student_id);
    const resumeSkills = user.skills;

    const result = calculateResumeScore(jobSkills, resumeSkills);

    const application = await Application.create({
      student_id,
      job_id,
      resume_score: result.score,
    });
    await logActivity(student_id, "APPLY_JOB", `Applied for job ${job_id}`);

    res.status(201).json({
      message: "Application submitted successfully",
      resumeScore: result.score,
      matchedSkills: result.matchedSkills,
      missingSkills: result.missingSkills,
      application,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const student_id = req.userId;

    const applications = await Application.find({ student_id }).populate(
      "job_id",
    );

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getApplicantsByJob = async (req, res) => {
  try {
    const job_id = req.params.jobId;

    const applications = await Application.find({ job_id })
      .populate("student_id", "name email skills")
      .populate("job_id", "title company");

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getRecruiterDashboard = async (req, res) => {
  try {
    const recruiter_id = req.userId;

    const applications = await Application.find()
      .populate({
        path: "job_id",
        match: { recruiter_id: recruiter_id },
        select: "title company",
      })
      .populate("student_id", "name email")
      .sort({ resume_score: -1 });

    const filtered = applications.filter((app) => app.job_id !== null);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
