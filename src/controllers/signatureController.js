const signingAdapter = require('../services/signingAdapter');
const db = require('../db');
const { logAuditEvent } = require('../middleware/audit');

async function signEntity(req, res, next) {
  try {
    const { entityType, entityId, payload, tokenId } = req.body;

    if (!entityType || !entityId || !payload) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_FAILED',
        message: 'entityType, entityId, and payload are required for cryptographic signature.'
      });
    }

    const result = await signingAdapter.sign({
      entityType,
      entityId,
      user: req.user,
      payload,
      tokenId: tokenId || 'NIC-DSC-HARDWARE-TOKEN-DEMO'
    });

    await logAuditEvent({
      userId: req.user.id,
      userName: req.user.full_name,
      role: req.user.role,
      action: 'DIGITAL_SIGNATURE_APPLIED',
      resourceType: entityType,
      resourceId: entityId,
      details: result,
      ipAddress: req.ip
    });

    return res.json({
      success: true,
      message: 'Cryptographic digital signature applied successfully in demonstration mode.',
      signature: result
    });
  } catch (err) {
    next(err);
  }
}

async function verifySignature(req, res, next) {
  try {
    const { signatureId } = req.params;
    const { payload } = req.body;

    if (!signatureId || !payload) {
      return res.status(400).json({
        success: false,
        message: 'signatureId and current payload are required for verification.'
      });
    }

    const verification = await signingAdapter.verify(signatureId, payload);

    return res.json({
      success: true,
      verification
    });
  } catch (err) {
    next(err);
  }
}

async function getEntitySignatures(req, res, next) {
  try {
    const { entityType, entityId } = req.query;
    let sql = 'SELECT * FROM digital_signatures WHERE 1=1';
    const params = [];

    if (entityType) {
      sql += ' AND entity_type = ?';
      params.push(entityType);
    }
    if (entityId) {
      sql += ' AND entity_id = ?';
      params.push(entityId);
    }

    sql += ' ORDER BY signature_timestamp DESC';

    const signatures = await db.query(sql, params);

    return res.json({
      success: true,
      count: signatures.length,
      data: signatures
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signEntity,
  verifySignature,
  getEntitySignatures
};
