function calculateJobMatch(jobSkills, userSkills) {
  if (!jobSkills || jobSkills.length === 0) {
    return 0;
  }

  const normalizedUserSkills = userSkills.map((skill) => skill.toLowerCase());

  const matched = jobSkills.filter((skill) =>
    normalizedUserSkills.includes(skill.toLowerCase().replace(".js", "")),
  );

  const score = (matched.length / jobSkills.length) * 100;

  return Math.round(score);
}

module.exports = calculateJobMatch;
