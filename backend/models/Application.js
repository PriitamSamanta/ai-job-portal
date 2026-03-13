const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  resume_score: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ["pending", "shortlisted", "rejected"],
    default: "pending",
  },

  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
