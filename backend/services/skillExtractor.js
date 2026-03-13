const skillList = [
  "react",
  "node",
  "mongodb",
  "javascript",
  "python",
  "java",
  "docker",
  "aws",
  "express",
  "html",
  "css",
];

function extractSkills(text) {
  const lowerText = text.toLowerCase();

  const detectedSkills = skillList.filter((skill) => lowerText.includes(skill));

  return detectedSkills;
}

module.exports = extractSkills;
