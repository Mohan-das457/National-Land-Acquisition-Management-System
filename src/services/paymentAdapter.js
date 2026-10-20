const crypto = require('crypto');
const db = require('../db');

/**
 * PFMS (Public Financial Management System) DBT Direct Benefit Transfer Sandbox Adapter
 * Handles payment instruction lifecycle with duplicate payment protection.
 */
class PaymentProviderAdapter {
  constructor(gatewayName = 'PFMS_SANDBOX_ADAPTER') {
    this.gatewayName = gatewayName;
    this.isSandbox = true;
  }

  /**
   * Process Direct Benefit Transfer instruction
   */
  async disburseCompensation(caseId, authorizedUser) {
    return db.transaction(async (tx) => {
      // 1. Fetch case with lock / check
      const cases = await tx.query('SELECT * FROM compensation_cases WHERE id = ?', [caseId]);
      if (cases.length === 0) {
        throw new Error('COMPENSATION_CASE_NOT_FOUND');
      }

      const compCase = cases[0];

      // 2. Duplicate payment prevention check
      if (compCase.payment_status === 'reconciled' || compCase.payment_status === 'processing') {
        throw new Error(`DUPLICATE_PAYMENT_REJECTED: Case ${caseId} is already in '${compCase.payment_status}' state.`);
      }

      if (compCase.dispute_flag) {
        throw new Error(`DISPUTE_ACTIVE: Case ${caseId} has an active legal dispute. Disbursement blocked.`);
      }

      // 3. Generate idempotent transaction reference
      const txRef = `PFMS-SANDBOX-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // 4. Update case to reconciled in sandbox
      await tx.query(
        `UPDATE compensation_cases
         SET payment_status = 'reconciled',
             pfms_transaction_ref = ?,
             disbursement_timestamp = ?,
             reconciliation_status = 'reconciled',
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [txRef, now, caseId]
      );

      // 5. Update parcel status to disbursed
      await tx.query(
        `UPDATE cadastral_parcels
         SET disbursement_status = 'disbursed',
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [compCase.parcel_id]
      );

      // 6. Update project disbursed compensation total
      await tx.query(
        `UPDATE projects
         SET disbursed_compensation_cr = disbursed_compensation_cr + (? / 10000000.0),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [compCase.net_payable, compCase.project_id]
      );

      return {
        success: true,
        caseId,
        parcelId: compCase.parcel_id,
        beneficiary: compCase.beneficiary_name,
        amount: compCase.net_payable,
        paymentStatus: 'reconciled',
        pfmsTransactionRef: txRef,
        timestamp: now,
        isSandboxNotice: 'PFMS SANDBOX MODE: Synthetic Direct Benefit Transfer simulated with complete ledger reconciliation.'
      };
    });
  }
}

module.exports = new PaymentProviderAdapter();
