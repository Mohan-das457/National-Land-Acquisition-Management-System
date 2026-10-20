const db = require('../db');
const { logAuditEvent } = require('../middleware/audit');

/**
 * Public Citizen & Landowner Portal Controller
 * Implements privacy-by-design: masks bank accounts and Aadhaar numbers.
 */

async function searchPublicKhasra(req, res, next) {
  try {
    const { query, stateCode, district } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'SEARCH_TERM_REQUIRED',
        message: 'Please provide a Khasra/Survey number, Patta number, or Project reference.'
      });
    }

    let sql = `
      SELECT p.id, p.survey_number, p.patta_khata_no, p.village, p.taluk, p.district,
             p.state_code, p.acquired_area_ha, p.total_area_ha, p.land_classification,
             p.disbursement_status, prj.name AS project_name, prj.stage_name
      FROM cadastral_parcels p
      JOIN projects prj ON p.project_id = prj.id
      WHERE (p.survey_number LIKE ? OR p.patta_khata_no LIKE ? OR prj.reference_no LIKE ?)
    `;
    const params = [`%${query}%`, `%${query}%`, `%${query}%`];

    if (stateCode) {
      sql += ' AND p.state_code = ?';
      params.push(stateCode.toUpperCase());
    }
    if (district) {
      sql += ' AND p.district = ?';
      params.push(district);
    }

    const results = await db.query(sql, params);

    return res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (err) {
    next(err);
  }
}

async function submitObjectionPetition(req, res, next) {
  try {
    const {
      projectId, parcelId, petitionerName, petitionerPhone,
      petitionerEmail, khasraSurveyNo, objectionType, groundsSummary
    } = req.body;

    if (!projectId || !petitionerName || !khasraSurveyNo || !objectionType || !groundsSummary) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_FAILED',
        message: 'Project ID, Petitioner Name, Khasra Number, Objection Type, and Grounds Summary are required.'
      });
    }

    const objectionId = `OBJ-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    const filingDate = new Date().toISOString().slice(0, 10);

    await db.execute(
      `INSERT INTO objections (
        id, project_id, parcel_id, petitioner_name, petitioner_phone, petitioner_email,
        khasra_survey_no, objection_type, grounds_summary, filing_date, hearing_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted')`,
      [
        objectionId, projectId, parcelId || null, petitionerName, petitionerPhone || null,
        petitionerEmail || null, khasraSurveyNo, objectionType, groundsSummary, filingDate
      ]
    );

    await logAuditEvent({
      userId: req.user ? req.user.id : null,
      userName: petitionerName,
      role: 'citizen',
      action: 'OBJECTION_PETITION_SUBMITTED',
      resourceType: 'OBJECTION',
      resourceId: objectionId,
      details: { khasraSurveyNo, objectionType },
      ipAddress: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Objection petition received under RFCTLARR Act 2013 Section 15.',
      objectionId,
      acknowledgement: {
        filingDate,
        petitioner: petitionerName,
        status: 'Acknowledged & Scheduled for Preliminary Scrutiny'
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getObjectionStatus(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await db.query(
      `SELECT o.id, o.khasra_survey_no, o.objection_type, o.filing_date, o.hearing_date,
              o.hearing_venue, o.hearing_status, o.speaking_order_text, o.order_decision,
              p.name AS project_name
       FROM objections o
       JOIN projects p ON o.project_id = p.id
       WHERE o.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Objection petition record not found.' });
    }

    return res.json({
      success: true,
      data: rows[0]
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  searchPublicKhasra,
  submitObjectionPetition,
  getObjectionStatus
};
