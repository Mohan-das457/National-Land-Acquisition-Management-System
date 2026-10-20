const db = require('../db');

async function logAuditEvent(options) {
  const {
    userId = null,
    userName = 'Anonymous / System',
    role = 'public',
    action,
    resourceType,
    resourceId = null,
    details = null,
    ipAddress = null
  } = options;

  try {
    const detailsStr = typeof details === 'object' ? JSON.stringify(details) : details;
    await db.execute(
      `INSERT INTO audit_logs (user_id, user_name, role, action, resource_type, resource_id, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, userName, role, action, resourceType, resourceId, detailsStr, ipAddress]
    );
  } catch (err) {
    console.error('[AuditLog] Failed to record audit log:', err.message);
  }
}

// Express middleware helper for automatic route auditing
function auditMiddleware(action, resourceType) {
  return async (req, res, next) => {
    // Intercept response finish
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        const user = req.user || {};
        logAuditEvent({
          userId: user.id || null,
          userName: user.full_name || 'System / Public User',
          role: user.role || 'public',
          action,
          resourceType,
          resourceId: req.params.id || req.body.id || req.body.projectId || null,
          details: {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode
          },
          ipAddress: req.ip || req.connection.remoteAddress
        });
      }
    });
    next();
  };
}

module.exports = {
  logAuditEvent,
  auditMiddleware
};
