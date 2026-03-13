function calculateResumeScore(jobSkills, resumeSkills) {
  const matchedSkills = jobSkills.filter((skill) =>
    resumeSkills.includes(skill.toLowerCase()),
  );

  const missingSkills = jobSkills.filter(
    (skill) => !resumeSkills.includes(skill.toLowerCase()),
  );

  const score = Math.round((matchedSkills.length / jobSkills.length) * 100);

  return {
    score,
    matchedSkills,
    missingSkills,
  };
}

module.exports = calculateResumeScore;
