function calculateResumeScore(
  jobSkills,
  resumeSkills,
  experience = 0,
  requiredExperience = 0,
) {
  const matchedSkills = jobSkills.filter((skill) =>
    resumeSkills.includes(skill.toLowerCase()),
  );

  const missingSkills = jobSkills.filter(
    (skill) => !resumeSkills.includes(skill.toLowerCase()),
  );

  // Skill Score
  const skillScore = (matchedSkills.length / jobSkills.length) * 70;

  // Experience Score
  let experienceScore = 0;

  if (requiredExperience > 0) {
    const ratio = Math.min(experience / requiredExperience, 1);
    experienceScore = ratio * 20;
  }

  // Education Score (placeholder for now)
  const educationScore = 10;

  const finalScore = Math.round(skillScore + experienceScore + educationScore);

  return {
    score: finalScore,
    matchedSkills,
    missingSkills,
  };
}

module.exports = calculateResumeScore;
