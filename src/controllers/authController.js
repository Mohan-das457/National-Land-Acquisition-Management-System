const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');
const db = require('../db');
const { logAuditEvent } = require('../middleware/audit');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'CREDENTIALS_REQUIRED',
        message: 'Please provide both email address and password.'
      });
    }

    const users = await db.query('SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email address or password provided.'
      });
    }

    const user = users[0];

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'ACCOUNT_SUSPENDED',
        message: 'Your official account has been suspended or deactivated.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email address or password provided.'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        stateCode: user.state_code,
        district: user.district
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Set secure HTTP-only cookie
    res.cookie('nlams_token', token, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    // Record audit event
    await logAuditEvent({
      userId: user.id,
      userName: user.full_name,
      role: user.role,
      action: 'USER_LOGIN_SUCCESS',
      resourceType: 'AUTH_SESSION',
      resourceId: user.id,
      ipAddress: req.ip
    });

    const sanitizedUser = {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      designation: user.designation,
      department: user.department,
      role: user.role,
      stateCode: user.state_code,
      district: user.district,
      phone: user.phone
    };

    return res.json({
      success: true,
      message: 'Authentication successful.',
      token,
      user: sanitizedUser
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    if (req.user) {
      await logAuditEvent({
        userId: req.user.id,
        userName: req.user.full_name,
        role: req.user.role,
        action: 'USER_LOGOUT',
        resourceType: 'AUTH_SESSION',
        resourceId: req.user.id,
        ipAddress: req.ip
      });
    }

    res.clearCookie('nlams_token');
    return res.json({
      success: true,
      message: 'Logged out successfully.'
    });
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res) {
  return res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      fullName: req.user.full_name,
      designation: req.user.designation,
      department: req.user.department,
      role: req.user.role,
      stateCode: req.user.state_code,
      district: req.user.district,
      phone: req.user.phone
    }
  });
}

// Password Reset Request
async function requestPasswordReset(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const users = await db.query('SELECT id, email, full_name FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    if (users.length === 0) {
      // Don't leak user existence
      return res.json({ success: true, message: 'If an account exists, a reset token has been issued.' });
    }

    const resetToken = crypto.randomBytes(24).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

    await db.execute(
      `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
       VALUES (?, ?, ?)`,
      [users[0].id, tokenHash, expiresAt]
    );

    return res.json({
      success: true,
      message: 'If an account exists, a reset token has been issued.',
      sandboxDemoToken: config.env === 'development' ? resetToken : undefined
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  logout,
  getCurrentUser,
  requestPasswordReset
};
