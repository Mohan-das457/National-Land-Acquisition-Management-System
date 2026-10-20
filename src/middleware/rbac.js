/**
 * Role-Based Access Control (RBAC) & Jurisdiction Permission Middleware
 * Enforces server-side authority matrix across Central, State, CALA, Surveyor, and Citizen.
 */

// Hierarchy and permission matrix
const ROLE_PERMISSIONS = {
  central: ['view_all', 'create_project', 'approve_national_corridor', 'manage_users', 'audit_view', 'sign_dsc'],
  state: ['view_state', 'approve_state_notification', 'gazette_publish', 'audit_view', 'sign_dsc'],
  district: ['view_district', 'conduct_sec15_hearing', 'issue_sec23_award', 'sanction_compensation', 'sign_dsc'],
  surveyor: ['view_district', 'upload_jms_survey', 'demarcate_parcel', 'update_parcel_ground_truth'],
  citizen: ['view_public', 'file_objection', 'view_own_parcel', 'view_compensation_status']
};

function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Authentication required prior to permission check.'
      });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: 'FORBIDDEN_ROLE',
        message: `Action restricted. Required role: [${allowedRoles.join(', ')}]. Active role: [${userRole}].`
      });
    }

    next();
  };
}

/**
 * Ensures user has jurisdiction authority over a target project or parcel.
 * Central role has nationwide jurisdiction.
 * State role is bounded by state_code.
 * District/CALA & Surveyor are bounded by state_code and district.
 */
function checkJurisdiction(user, targetStateCode, targetDistrict) {
  if (user.role === 'central') return true;

  if (user.role === 'state') {
    return user.state_code === 'ALL' || user.state_code === targetStateCode;
  }

  if (user.role === 'district' || user.role === 'surveyor') {
    const stateMatch = user.state_code === 'ALL' || user.state_code === targetStateCode;
    const districtMatch = user.district === 'ALL' || user.district.toLowerCase() === (targetDistrict || '').toLowerCase();
    return stateMatch && districtMatch;
  }

  return false;
}

module.exports = {
  ROLE_PERMISSIONS,
  requireRole,
  checkJurisdiction
};
