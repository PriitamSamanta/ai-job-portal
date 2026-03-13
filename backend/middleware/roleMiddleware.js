exports.requireAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};

exports.requireRecruiter = (req, res, next) => {
  if (req.userRole !== "recruiter") {
    return res.status(403).json({
      message: "Recruiter access required",
    });
  }

  next();
};

exports.requireStudent = (req, res, next) => {
  if (req.userRole !== "student") {
    return res.status(403).json({
      message: "Student access required",
    });
  }

  next();
};
