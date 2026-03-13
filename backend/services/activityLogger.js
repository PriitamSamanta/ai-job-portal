const ActivityLog = require("../models/ActivityLog");

async function logActivity(user_id, action, details) {
  await ActivityLog.create({
    user_id,
    action,
    details,
  });
}

module.exports = logActivity;
