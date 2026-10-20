const db = require('../db');

/**
 * Statutory Deadlines & Section 25 Countdown Radar Service
 * Section 25 of the RFCTLARR Act 2013 provides:
 * "The Collector shall make an award within a period of twelve months from the date of publication
 * of the declaration under section 19 and if no award is made within that period, the entire
 * proceedings for the acquisition of the land shall lapse:
 * Provided that the appropriate Government may have the power to extend or notify an extended
 * period if in its opinion circumstances exist justifying the same, with reasons recorded in writing."
 */

async function getActiveDeadlines(filter = {}) {
  let sql = `
    SELECT d.*, p.name AS project_name, p.state_code, p.district, p.reference_no
    FROM statutory_deadlines d
    JOIN projects p ON d.project_id = p.id
    WHERE d.status = 'active'
  `;
  const params = [];

  if (filter.projectId) {
    sql += ' AND d.project_id = ?';
    params.push(filter.projectId);
  }

  if (filter.stateCode && filter.stateCode !== 'ALL') {
    sql += ' AND p.state_code = ?';
    params.push(filter.stateCode);
  }

  const rows = await db.query(sql, params);
  const now = new Date();

  return rows.map(d => {
    const targetDate = d.extended_due_date ? new Date(d.extended_due_date) : new Date(d.due_date);
    const diffMs = targetDate - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    let riskLevel = 'normal';
    let urgencyBadge = 'Safe';
    if (diffDays <= 0) {
      riskLevel = 'critical_lapsed';
      urgencyBadge = 'Statutory Lapse Risk';
    } else if (diffDays <= 30) {
      riskLevel = 'urgent';
      urgencyBadge = 'Urgent (<30 Days)';
    } else if (diffDays <= 90) {
      riskLevel = 'warning';
      urgencyBadge = 'Warning (<90 Days)';
    }

    return {
      ...d,
      daysRemaining: diffDays,
      effectiveDueDate: targetDate.toISOString().slice(0, 10),
      isExtended: Boolean(d.extended_due_date),
      riskLevel,
      urgencyBadge,
      legalAuthorityNotice: 'RFCTLARR Act 2013 Section 25 (Mandatory 12-Month Limit with Proviso Extension)'
    };
  });
}

/**
 * Apply legal extension under Section 25 Proviso
 */
async function grantSection25Extension(deadlineId, options) {
  const { extensionMonths = 6, authorityOrderRef, extensionReason, approvedByUser } = options;

  const rows = await db.query('SELECT * FROM statutory_deadlines WHERE id = ?', [deadlineId]);
  if (rows.length === 0) throw new Error('DEADLINE_RECORD_NOT_FOUND');

  const deadline = rows[0];
  const currentDueDate = new Date(deadline.extended_due_date || deadline.due_date);
  
  // Calculate new extended date
  const newDate = new Date(currentDueDate);
  newDate.setMonth(newDate.getMonth() + parseInt(extensionMonths, 10));

  const newDateStr = newDate.toISOString().slice(0, 10);

  await db.execute(
    `UPDATE statutory_deadlines
     SET extended_due_date = ?,
         extension_authority_ref = ?,
         extension_reason = ?,
         escalation_level = 0
     WHERE id = ?`,
    [newDateStr, authorityOrderRef, extensionReason, deadlineId]
  );

  return {
    success: true,
    deadlineId,
    newExtendedDueDate: newDateStr,
    statutoryBasis: 'RFCTLARR Act 2013 Section 25 Proviso',
    authorityOrderRef,
    extensionReason
  };
}

module.exports = {
  getActiveDeadlines,
  grantSection25Extension
};
