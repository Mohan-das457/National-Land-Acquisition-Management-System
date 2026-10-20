const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../db');

async function authenticateToken(req, res, next) {
  let token = null;

  // 1. Check Authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // 2. Check cookies
  if (!token && req.cookies && req.cookies.nlams_token) {
    token = req.cookies.nlams_token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'AUTHENTICATION_REQUIRED',
      message: 'Access denied: Valid bearer token or session cookie required.'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Check if session or user is still active in database
    const users = await db.query(
      'SELECT id, email, full_name, role, state_code, district, status FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0 || users[0].status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'ACCOUNT_INACTIVE',
        message: 'User account is inactive or no longer exists.'
      });
    }

    req.user = users[0];
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      error: 'TOKEN_INVALID_OR_EXPIRED',
      message: 'Authentication session expired or invalid. Please log in again.'
    });
  }
}

// Optional auth for public tracking endpoints (attaches user if token present)
async function optionalAuth(req, res, next) {
  let token = null;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.nlams_token) {
    token = req.cookies.nlams_token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const users = await db.query(
        'SELECT id, email, full_name, role, state_code, district, status FROM users WHERE id = ?',
        [decoded.userId]
      );
      if (users.length > 0 && users[0].status === 'active') {
        req.user = users[0];
      }
    } catch (e) {
      // Ignored for optional auth
    }
  }
  next();
}

module.exports = {
  authenticateToken,
  optionalAuth
};
