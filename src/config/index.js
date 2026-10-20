const path = require('path');
require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 8000,
  
  db: {
    type: process.env.DB_TYPE || 'auto',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nlams_db',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'nlams_sih_secure_jwt_secret_dev_key_2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 500
  },

  storage: {
    vaultDir: path.resolve(process.env.STORAGE_DIR || './storage/vault'),
    maxSizeMb: parseInt(process.env.MAX_UPLOAD_SIZE_MB, 10) || 50
  },

  adapters: {
    signingProvider: process.env.SIGNING_PROVIDER || 'DEMO_NIC_DSC_ADAPTER',
    paymentGateway: process.env.PAYMENT_GATEWAY || 'PFMS_SANDBOX_ADAPTER',
    smsEmail: process.env.SMS_EMAIL_PROVIDER || 'MOCK_GOV_GATEWAY'
  }
};
