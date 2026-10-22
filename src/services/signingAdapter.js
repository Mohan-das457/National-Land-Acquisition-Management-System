const crypto = require('crypto');
const db = require('../db');

/**
 * Interface & Implementation for Digital Signing Services (DSC / e-Sign)
 * Operates in Sandbox / Demonstration Mode until official CCA/NIC hardware token credentials are configured.
 */
class SigningProviderAdapter {
  constructor(providerName = 'DEMO_NIC_DSC') {
    this.providerName = providerName;
    this.isDemoMode = true; // Clearly marked demonstration mode
  }

  // Compute canonical SHA-256 hash of payload or document content
  generatePayloadHash(payload) {
    const serialized = typeof payload === 'string' ? payload : JSON.stringify(payload);
    return crypto.createHash('sha256').update(serialized).digest('hex');
  }

  /**
   * Apply digital signature stamp
   */
  async sign(options) {
    const {
      entityType,
      entityId,
      user,
      payload,
      tokenId = 'NIC-DSC-DEMO-TOKEN-01'
    } = options;

    const documentHash = this.generatePayloadHash(payload);
    const signatureTimestamp = new Date();
    const signatureId = `SIG-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;

    const record = {
      id: signatureId,
      entity_type: entityType,
      entity_id: entityId,
      signer_id: user.id,
      signer_name: user.full_name,
      signer_designation: user.designation || user.role,
      token_id: tokenId,
      provider: this.providerName,
      document_hash_sha256: documentHash,
      signature_timestamp: signatureTimestamp,
      verification_status: 'valid',
      is_demo_mode: this.isDemoMode ? 1 : 0,
      audit_metadata: JSON.stringify({
        simulatedProviderNotice: 'DEMONSTRATION ADAPTER: This signature was generated within a local demonstration sandbox. It certifies mathematical hash integrity but does not represent a live Certificate Authority (CA) issued key without configured production PKI hardware.',
        algorithm: 'SHA-256 / RSA-2048 Simulation',
        signerRole: user.role,
        signerJurisdiction: `${user.state_code} / ${user.district}`
      })
    };

    await db.execute(
      `INSERT INTO digital_signatures (
        id, entity_type, entity_id, signer_id, signer_name, signer_designation,
        token_id, provider, document_hash_sha256, signature_timestamp,
        verification_status, is_demo_mode, audit_metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.id, record.entity_type, record.entity_id, record.signer_id,
        record.signer_name, record.signer_designation, record.token_id,
        record.provider, record.document_hash_sha256, record.signature_timestamp,
        record.verification_status, record.is_demo_mode, record.audit_metadata
      ]
    );

    return {
      success: true,
      signatureId: record.id,
      signerName: record.signer_name,
      documentHash: record.document_hash_sha256,
      timestamp: signatureTimestamp.toISOString(),
      provider: this.providerName,
      isDemoMode: this.isDemoMode,
      verificationStatus: 'valid'
    };
  }

  /**
   * Verify document integrity against stored signature
   */
  async verify(signatureId, currentPayload) {
    const rows = await db.query('SELECT * FROM digital_signatures WHERE id = ?', [signatureId]);
    if (rows.length === 0) {
      return { verified: false, reason: 'SIGNATURE_NOT_FOUND' };
    }

    const signature = rows[0];
    const currentHash = this.generatePayloadHash(currentPayload);

    const isMatch = currentHash === signature.document_hash_sha256;

    return {
      verified: isMatch,
      signatureId,
      signerName: signature.signer_name,
      timestamp: signature.signature_timestamp,
      storedHash: signature.document_hash_sha256,
      currentHash,
      isDemoMode: Boolean(signature.is_demo_mode),
      tamperDetected: !isMatch
    };
  }
}

module.exports = new SigningProviderAdapter();
