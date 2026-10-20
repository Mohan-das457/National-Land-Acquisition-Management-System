const crypto = require('crypto');
const db = require('../db');
const { checkJurisdiction } = require('../middleware/rbac');

async function getProjects(req, res, next) {
  try {
    const { state, sector, stage, search, limit = 50, offset = 0 } = req.query;

    let sql = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    // Jurisdiction enforcement for non-central roles
    if (req.user && req.user.role === 'state' && req.user.state_code !== 'ALL') {
      sql += ' AND state_code = ?';
      params.push(req.user.state_code);
    } else if (req.user && (req.user.role === 'district' || req.user.role === 'surveyor') && req.user.district !== 'ALL') {
      sql += ' AND district = ?';
      params.push(req.user.district);
    } else if (state) {
      sql += ' AND state_code = ?';
      params.push(state.toUpperCase());
    }

    if (sector) {
      sql += ' AND sector LIKE ?';
      params.push(`%${sector}%`);
    }

    if (stage) {
      sql += ' AND current_stage = ?';
      params.push(parseInt(stage, 10));
    }

    if (search) {
      sql += ' AND (name LIKE ? OR reference_no LIKE ? OR district LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const projects = await db.query(sql, params);

    return res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
}

async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;
    const projects = await db.query('SELECT * FROM projects WHERE id = ?', [id]);

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'PROJECT_NOT_FOUND',
        message: `Project with ID ${id} not found.`
      });
    }

    const project = projects[0];

    // Fetch related parcels and statutory deadlines
    const parcels = await db.query('SELECT * FROM cadastral_parcels WHERE project_id = ?', [id]);
    const deadlines = await db.query('SELECT * FROM statutory_deadlines WHERE project_id = ?', [id]);
    const workflow = await db.query('SELECT * FROM workflow_events WHERE project_id = ? ORDER BY stage_number ASC', [id]);

    return res.json({
      success: true,
      data: {
        ...project,
        parcels,
        deadlines,
        workflow
      }
    });
  } catch (err) {
    next(err);
  }
}

async function createProject(req, res, next) {
  try {
    const {
      name, sector, requiring_body, state_code, district, taluk, villages,
      total_land_ha, estimated_cost_cr, center_lat, center_lng, row_width_meters
    } = req.body;

    if (!name || !requiring_body || !state_code || !district || !total_land_ha) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_FAILED',
        message: 'Name, Requiring Body, State Code, District, and Total Land Area are mandatory fields.'
      });
    }

    // Check jurisdiction authority
    if (!checkJurisdiction(req.user, state_code, district)) {
      return res.status(403).json({
        success: false,
        error: 'JURISDICTION_DENIED',
        message: `You do not have jurisdiction to register projects in ${state_code} / ${district}.`
      });
    }

    const projectId = `PRJ-${state_code}-${Date.now().toString().slice(-6)}`;
    const refNo = `${requiring_body.split(' ')[0].toUpperCase()}/LA/${district.toUpperCase()}/${new Date().getFullYear()}/${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

    await db.execute(
      `INSERT INTO projects (
        id, reference_no, name, sector, requiring_body, state_code, district, taluk, villages,
        total_land_ha, acquired_land_ha, estimated_cost_cr, current_stage, stage_name, status,
        center_lat, center_lng, row_width_meters, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0.0, ?, 1, 'Stage 1: Proposal & SIA', 'in_progress', ?, ?, ?, ?)`,
      [
        projectId, refNo, name, sector || 'Infrastructure', requiring_body, state_code, district,
        taluk || district, villages || 'Survey underway', parseFloat(total_land_ha),
        parseFloat(estimated_cost_cr) || 0, parseFloat(center_lat) || 20.5937,
        parseFloat(center_lng) || 78.9629, parseInt(row_width_meters, 10) || 60, req.user.id
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      projectId,
      referenceNo: refNo
    });
  } catch (err) {
    next(err);
  }
}

async function getDashboardStats(req, res, next) {
  try {
    const { state } = req.query;
    let whereClause = '1=1';
    const params = [];

    if (req.user && req.user.role === 'state' && req.user.state_code !== 'ALL') {
      whereClause += ' AND state_code = ?';
      params.push(req.user.state_code);
    } else if (req.user && (req.user.role === 'district' || req.user.role === 'surveyor') && req.user.district !== 'ALL') {
      whereClause += ' AND district = ?';
      params.push(req.user.district);
    } else if (state && state !== 'ALL') {
      whereClause += ' AND state_code = ?';
      params.push(state.toUpperCase());
    }

    const projectTotals = await db.query(
      `SELECT
        COUNT(*) AS totalProjects,
        COALESCE(SUM(total_land_ha), 0) AS totalLandProposedHa,
        COALESCE(SUM(acquired_land_ha), 0) AS totalLandAcquiredHa,
        COALESCE(SUM(sanctioned_compensation_cr), 0) AS totalCompSanctionedCr,
        COALESCE(SUM(disbursed_compensation_cr), 0) AS totalCompDisbursedCr,
        COALESCE(SUM(CASE WHEN current_stage = 6 THEN 1 ELSE 0 END), 0) AS completedProjects,
        COALESCE(SUM(CASE WHEN current_stage < 6 THEN 1 ELSE 0 END), 0) AS runningProjects,
        COALESCE(SUM(sla_breached), 0) AS slaBreaches
       FROM projects WHERE ${whereClause}`,
      params
    );

    const parcelTotals = await db.query(
      `SELECT
        COUNT(*) AS totalParcels,
        COALESCE(SUM(CASE WHEN disbursement_status = 'disbursed' THEN 1 ELSE 0 END), 0) AS disbursedParcels,
        COALESCE(SUM(CASE WHEN disbursement_status = 'pending' THEN 1 ELSE 0 END), 0) AS pendingParcels
       FROM cadastral_parcels cp
       JOIN projects p ON cp.project_id = p.id
       WHERE ${whereClause}`,
      params
    );

    return res.json({
      success: true,
      data: {
        projects: projectTotals[0],
        parcels: parcelTotals[0],
        roleContext: req.user ? req.user.role : 'public'
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  getDashboardStats
};
