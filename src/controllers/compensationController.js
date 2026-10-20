const db = require('../db');
const { calculateCompensation } = require('../services/rfctlarrCalculator');
const paymentAdapter = require('../services/paymentAdapter');
const { logAuditEvent } = require('../middleware/audit');

async function getCompensationCases(req, res, next) {
  try {
    const { projectId, status, search } = req.query;

    let sql = `
      SELECT c.*, p.survey_number, p.patta_khata_no, p.village, p.land_classification,
             prj.name AS project_name, prj.state_code, prj.district
      FROM compensation_cases c
      JOIN cadastral_parcels p ON c.parcel_id = p.id
      JOIN projects prj ON c.project_id = prj.id
      WHERE 1=1
    `;
    const params = [];

    if (projectId) {
      sql += ' AND c.project_id = ?';
      params.push(projectId);
    }
    if (status) {
      sql += ' AND c.payment_status = ?';
      params.push(status);
    }
    if (search) {
      sql += ' AND (c.beneficiary_name LIKE ? OR p.survey_number LIKE ? OR p.patta_khata_no LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY c.created_at DESC';

    const cases = await db.query(sql, params);

    return res.json({
      success: true,
      count: cases.length,
      data: cases
    });
  } catch (err) {
    next(err);
  }
}

async function calculateAward(req, res, next) {
  try {
    const {
      acquiredAreaHa,
      guidelineValuePerHa,
      distanceFromUrbanKm,
      isUrban,
      treesValuation,
      structuresValuation,
      sec11Date
    } = req.body;

    const calculation = calculateCompensation({
      acquiredAreaHa,
      guidelineValuePerHa,
      distanceFromUrbanKm,
      isUrban,
      treesValuation,
      structuresValuation,
      sec11Date
    });

    return res.json({
      success: true,
      calculation
    });
  } catch (err) {
    next(err);
  }
}

async function disburseCasePayment(req, res, next) {
  try {
    const { caseId } = req.params;

    if (!caseId) {
      return res.status(400).json({ success: false, message: 'caseId parameter required' });
    }

    const result = await paymentAdapter.disburseCompensation(caseId, req.user);

    await logAuditEvent({
      userId: req.user.id,
      userName: req.user.full_name,
      role: req.user.role,
      action: 'COMPENSATION_DBT_DISBURSED',
      resourceType: 'COMPENSATION_CASE',
      resourceId: caseId,
      details: result,
      ipAddress: req.ip
    });

    return res.json({
      success: true,
      message: `Direct Benefit Transfer of ₹${(result.amount / 10000000.0).toFixed(2)} Cr completed via PFMS Sandbox.`,
      disbursement: result
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCompensationCases,
  calculateAward,
  disburseCasePayment
};
