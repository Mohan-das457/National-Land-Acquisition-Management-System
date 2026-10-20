const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const documentController = require('../controllers/documentController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// Configure Multer storage outside public directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(config.storage.vaultDir)) {
      fs.mkdirSync(config.storage.vaultDir, { recursive: true });
    }
    cb(null, config.storage.vaultDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = `VAULT-${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    cb(null, safeName);
  }
});

// File filter (restrict to PDF, Word, Excel, Images, GeoJSON)
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'application/json',
    'application/geo+json'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`UNSUPPORTED_FILE_TYPE: File type ${file.mimetype} is not permitted in legal vault.`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.storage.maxSizeMb * 1024 * 1024 }
});

router.get('/', optionalAuth, documentController.listDocuments);
router.post('/upload', authenticateToken, upload.single('file'), documentController.uploadDocument);
router.get('/download/:id', optionalAuth, documentController.downloadDocument);

module.exports = router;
