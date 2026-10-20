const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const config = require('../config');
const db = require('../db');
const { logAuditEvent } = require('../middleware/audit');

async function listDocuments(req, res, next) {
  try {
    const { projectId, parcelId, category, search } = req.query;

    let sql = 'SELECT * FROM documents WHERE is_quarantined = 0';
    const params = [];

    if (projectId) {
      sql += ' AND project_id = ?';
      params.push(projectId);
    }
    if (parcelId) {
      sql += ' AND parcel_id = ?';
      params.push(parcelId);
    }
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      sql += ' AND (title LIKE ? OR file_name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC';

    const docs = await db.query(sql, params);

    return res.json({
      success: true,
      count: docs.length,
      data: docs
    });
  } catch (err) {
    next(err);
  }
}

async function uploadDocument(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const { projectId, parcelId, title, category, accessLevel } = req.body;

    if (!title || !category) {
      // Clean up uploaded file if validation fails
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: 'Title and Category are mandatory.' });
    }

    // Compute SHA-256 checksum
    const fileBuffer = fs.readFileSync(req.file.path);
    const checksum = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    const docId = `DOC-${Date.now().toString().slice(-6)}`;

    await db.execute(
      `INSERT INTO documents (
        id, project_id, parcel_id, title, category, file_name, stored_file_name,
        mime_type, file_size_bytes, sha256_checksum, access_level, uploaded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        docId, projectId || null, parcelId || null, title, category,
        req.file.originalname, path.basename(req.file.path), req.file.mimetype,
        req.file.size, checksum, accessLevel || 'internal', req.user ? req.user.id : 'USR-CENTRAL-01'
      ]
    );

    await logAuditEvent({
      userId: req.user ? req.user.id : null,
      userName: req.user ? req.user.full_name : 'Authorized Uploader',
      role: req.user ? req.user.role : 'uploader',
      action: 'DOCUMENT_UPLOADED',
      resourceType: 'DOCUMENT',
      resourceId: docId,
      details: {
        fileName: req.file.originalname,
        category,
        checksum
      },
      ipAddress: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Document vaulted and indexed with SHA-256 integrity checksum.',
      documentId: docId,
      checksum
    });
  } catch (err) {
    next(err);
  }
}

async function downloadDocument(req, res, next) {
  try {
    const { id } = req.params;
    const docs = await db.query('SELECT * FROM documents WHERE id = ?', [id]);

    if (docs.length === 0) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    const doc = docs[0];

    // Check file access authorization
    if (doc.access_level === 'restricted' && req.user && req.user.role === 'citizen') {
      return res.status(403).json({ success: false, message: 'Access denied: Restricted official record.' });
    }

    const filePath = path.join(config.storage.vaultDir, doc.stored_file_name);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Physical file missing from vault archive.' });
    }

    await logAuditEvent({
      userId: req.user ? req.user.id : null,
      userName: req.user ? req.user.full_name : 'Public Citizen',
      role: req.user ? req.user.role : 'public',
      action: 'DOCUMENT_DOWNLOADED',
      resourceType: 'DOCUMENT',
      resourceId: id,
      ipAddress: req.ip
    });

    res.setHeader('Content-Type', doc.mime_type);
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(doc.file_name)}"`);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listDocuments,
  uploadDocument,
  downloadDocument
};
