const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Job Portal API Running");
});

const PORT = 5000;

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    userId: req.userId,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
