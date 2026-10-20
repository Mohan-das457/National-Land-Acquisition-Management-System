const db = require('../db');
const { checkJurisdiction } = require('../middleware/rbac');
const { logAuditEvent } = require('../middleware/audit');

const STAGE_NAMES = {
  1: 'Stage 1: Proposal & SIA (Social Impact Assessment)',
  2: 'Stage 2: Section 11 Preliminary Notification',
  3: 'Stage 3: Section 15 Hearing of Objections & Joint Survey',
  4: 'Stage 4: Section 19 Final Declaration & R&R Scheme',
  5: 'Stage 5: Section 23 Award Determination (100% Solatium)',
  6: 'Stage 6: Section 38 DBT Compensation & Physical Possession'
};

const REQUIRED_STAGE_ROLES = {
  1: ['central', 'state'],
  2: ['state', 'district'],
  3: ['district', 'surveyor'],
  4: ['state', 'district'],
  5: ['district'],
  6: ['district', 'central']
};

async function getWorkflowPipeline(req, res, next) {
  try {
    const { projectId } = req.query;
    let sql = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    if (projectId) {
      sql += ' AND id = ?';
      params.push(projectId);
    }

    const projects = await db.query(sql, params);

    // Compute stage counts
    const stageCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    projects.forEach(p => {
      const st = p.current_stage || 1;
      stageCounts[st] = (stageCounts[st] || 0) + 1;
    });

    return res.json({
      success: true,
      stageCounts,
      projects
    });
  } catch (err) {
    next(err);
  }
}

async function transitionStage(req, res, next) {
  try {
    const { projectId, targetStage, decision, comments, scrutinyNotes, greenNotingText } = req.body;

    if (!projectId || !targetStage) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_FAILED',
        message: 'projectId and targetStage are required.'
      });
    }

    const projects = await db.query('SELECT * FROM projects WHERE id = ?', [projectId]);
    if (projects.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const project = projects[0];
    const currentStage = project.current_stage;
    const nextStage = parseInt(targetStage, 10);

    // 1. Enforce valid state progression (No skipping stages forward)
    if (nextStage > currentStage + 1) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_STAGE_TRANSITION',
        message: `Cannot skip statutory stages. Current stage is ${currentStage} (${STAGE_NAMES[currentStage]}), requested stage is ${nextStage}.`
      });
    }

    // 2. Enforce role authorization for target stage
    const allowedRoles = REQUIRED_STAGE_ROLES[nextStage] || ['central'];
    if (!allowedRoles.includes(req.user.role) && req.user.role !== 'central') {
      return res.status(403).json({
        success: false,
        error: 'ROLE_UNAUTHORIZED_FOR_STAGE',
        message: `Your role [${req.user.role}] cannot approve transition to Stage ${nextStage}. Required roles: [${allowedRoles.join(', ')}].`
      });
    }

    // 3. Enforce jurisdiction check
    if (!checkJurisdiction(req.user, project.state_code, project.district)) {
      return res.status(403).json({
        success: false,
        error: 'JURISDICTION_DENIED',
        message: `You do not have jurisdiction authority over project in ${project.state_code} / ${project.district}.`
      });
    }

    // 4. Record workflow event
    const eventId = `EVT-${Date.now().toString().slice(-6)}`;
    const fileNumber = `NLAMS/FILE/${project.state_code}/${project.id}/${Date.now().toString().slice(-4)}`;

    await db.execute(
      `INSERT INTO workflow_events (
        id, project_id, stage_number, stage_title, file_number, status,
        assigned_role, assigned_officer_id, action_required, scrutiny_notes,
        green_noting_text, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        eventId, project.id, nextStage, STAGE_NAMES[nextStage], fileNumber,
        decision === 'approved' ? 'approved' : 'rejected',
        req.user.role, req.user.id, comments || 'Stage transition signed off',
        scrutinyNotes || 'Statutory criteria verified', greenNotingText || 'e-Office green noting cleared'
      ]
    );

    // 5. Update Project Stage
    await db.execute(
      `UPDATE projects
       SET current_stage = ?,
           stage_name = ?,
           status = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [nextStage, STAGE_NAMES[nextStage], nextStage === 6 ? 'completed' : 'in_progress', project.id]
    );

    await logAuditEvent({
      userId: req.user.id,
      userName: req.user.full_name,
      role: req.user.role,
      action: 'WORKFLOW_STAGE_TRANSITION',
      resourceType: 'PROJECT',
      resourceId: project.id,
      details: {
        fromStage: currentStage,
        toStage: nextStage,
        decision,
        fileNumber
      },
      ipAddress: req.ip
    });

    return res.json({
      success: true,
      message: `Project ${project.id} transitioned to ${STAGE_NAMES[nextStage]}.`,
      eventId,
      fileNumber,
      currentStage: nextStage,
      stageName: STAGE_NAMES[nextStage]
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getWorkflowPipeline,
  transitionStage
};
