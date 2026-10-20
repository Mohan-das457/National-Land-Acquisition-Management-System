const deadlineService = require('../services/deadlineService');
const { logAuditEvent } = require('../middleware/audit');

async function getDeadlines(req, res, next) {
  try {
    const { projectId, stateCode } = req.query;
    const deadlines = await deadlineService.getActiveDeadlines({
      projectId,
      stateCode: stateCode || (req.user ? req.user.state_code : 'ALL')
    });

    return res.json({
      success: true,
      count: deadlines.length,
      data: deadlines
    });
  } catch (err) {
    next(err);
  }
}

async function requestExtension(req, res, next) {
  try {
    const { id } = req.params;
    const { extensionMonths, authorityOrderRef, extensionReason } = req.body;

    if (!authorityOrderRef || !extensionReason) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_FAILED',
        message: 'authorityOrderRef and extensionReason are legally mandated under RFCTLARR Act Section 25 Proviso.'
      });
    }

    const result = await deadlineService.grantSection25Extension(id, {
      extensionMonths: parseInt(extensionMonths, 10) || 6,
      authorityOrderRef,
      extensionReason,
      approvedByUser: req.user
    });

    await logAuditEvent({
      userId: req.user.id,
      userName: req.user.full_name,
      role: req.user.role,
      action: 'STATUTORY_DEADLINE_EXTENDED',
      resourceType: 'STATUTORY_DEADLINE',
      resourceId: id,
      details: result,
      ipAddress: req.ip
    });

    return res.json({
      success: true,
      message: `Statutory deadline extended under RFCTLARR Act Section 25 Proviso until ${result.newExtendedDueDate}.`,
      extension: result
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDeadlines,
  requestExtension
};
