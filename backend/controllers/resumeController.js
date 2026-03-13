const pdfParse = require("pdf-parse");
const fs = require("fs");
const extractSkills = require("../services/skillExtractor");
const User = require("../models/User");

exports.uploadResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const dataBuffer = fs.readFileSync(file.path);

    const pdfData = await pdfParse(dataBuffer);

    const extractedText = pdfData.text;

    const skills = extractSkills(extractedText);

    const user = await User.findById(req.userId);

    user.skills = skills;
    user.resume = file.path;

    await user.save();

    res.json({
      message: "Resume uploaded successfully",
      detectedSkills: skills,
    });
  } catch (error) {
    console.log("PDF ERROR:", error);

    res.status(500).json({
      message: "Error processing resume",
      error: error.message,
    });
  }
};
