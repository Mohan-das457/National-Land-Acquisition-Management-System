-- =========================================================================
-- NLAMS — National Land Acquisition & Management System Database Schema
-- Compliance: RFCTLARR Act 2013 | PM GatiShakti Geospatial Standards
-- Target: MySQL 8.x / 9.x
-- =========================================================================

-- 1. Users & RBAC
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  designation VARCHAR(150),
  department VARCHAR(255),
  role VARCHAR(50) NOT NULL,
  state_code VARCHAR(10) DEFAULT 'ALL',
  district VARCHAR(100) DEFAULT 'ALL',
  phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(128) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at DATETIME NOT NULL,
  revoked TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  token_hash VARCHAR(128) NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 2. Infrastructure Projects & Corridors
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(64) PRIMARY KEY,
  reference_no VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  sector VARCHAR(80) NOT NULL,
  requiring_body VARCHAR(150) NOT NULL,
  state_code VARCHAR(10) NOT NULL,
  district VARCHAR(100) NOT NULL,
  taluk VARCHAR(100),
  villages TEXT,
  total_land_ha DECIMAL(10, 4) NOT NULL,
  acquired_land_ha DECIMAL(10, 4) DEFAULT 0.0000,
  estimated_cost_cr DECIMAL(12, 2) NOT NULL,
  sanctioned_compensation_cr DECIMAL(12, 2) DEFAULT 0.00,
  disbursed_compensation_cr DECIMAL(12, 2) DEFAULT 0.00,
  current_stage INT DEFAULT 1,
  stage_name VARCHAR(100) DEFAULT 'Stage 1: Proposal & SIA',
  status VARCHAR(40) DEFAULT 'in_progress',
  sla_breached TINYINT(1) DEFAULT 0,
  pending_tasks_count INT DEFAULT 0,
  center_lat DECIMAL(10, 6),
  center_lng DECIMAL(10, 6),
  row_width_meters INT DEFAULT 60,
  created_by VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Workflow Events & Approvals
CREATE TABLE IF NOT EXISTS workflow_events (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  stage_number INT NOT NULL,
  stage_title VARCHAR(150) NOT NULL,
  file_number VARCHAR(100) NOT NULL,
  status VARCHAR(40) NOT NULL,
  assigned_role VARCHAR(50) NOT NULL,
  assigned_officer_id VARCHAR(64),
  action_required VARCHAR(255),
  scrutiny_notes TEXT,
  green_noting_text TEXT,
  rejection_reason TEXT,
  completed_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 4. Cadastral Parcels & Spatial Boundaries
CREATE TABLE IF NOT EXISTS cadastral_parcels (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  state_code VARCHAR(10) NOT NULL,
  district VARCHAR(100) NOT NULL,
  taluk VARCHAR(100) NOT NULL,
  village VARCHAR(100) NOT NULL,
  survey_number VARCHAR(80) NOT NULL,
  patta_khata_no VARCHAR(80) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  joint_owners TEXT,
  aadhaar_linked TINYINT(1) DEFAULT 0,
  total_area_ha DECIMAL(10, 4) NOT NULL,
  acquired_area_ha DECIMAL(10, 4) NOT NULL,
  land_classification VARCHAR(100) NOT NULL,
  guideline_value_per_ha DECIMAL(12, 2) NOT NULL,
  rural_multiplier DECIMAL(3, 2) DEFAULT 1.50,
  base_compensation DECIMAL(12, 2) NOT NULL,
  solatium_amount DECIMAL(12, 2) NOT NULL,
  additional_interest DECIMAL(12, 2) NOT NULL,
  total_award_amount DECIMAL(12, 2) NOT NULL,
  disbursement_status VARCHAR(50) DEFAULT 'pending',
  polygon_geojson TEXT NOT NULL,
  trees_count INT DEFAULT 0,
  trees_valuation DECIMAL(12, 2) DEFAULT 0.00,
  structures_valuation DECIMAL(12, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 5. Objections, Hearings & Quasi-Judicial Speaking Orders
CREATE TABLE IF NOT EXISTS objections (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  parcel_id VARCHAR(64),
  petitioner_name VARCHAR(150) NOT NULL,
  petitioner_phone VARCHAR(20),
  petitioner_email VARCHAR(100),
  khasra_survey_no VARCHAR(80) NOT NULL,
  objection_type VARCHAR(100) NOT NULL,
  grounds_summary TEXT NOT NULL,
  supporting_doc_ref VARCHAR(255),
  filing_date DATE NOT NULL,
  hearing_date DATE,
  hearing_venue VARCHAR(255),
  hearing_status VARCHAR(40) DEFAULT 'scheduled',
  speaking_order_text TEXT,
  order_decision VARCHAR(50),
  adjudicated_by VARCHAR(64),
  adjudicated_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 6. Compensation Cases & Payment Reconciliation (PFMS Sandbox)
CREATE TABLE IF NOT EXISTS compensation_cases (
  id VARCHAR(64) PRIMARY KEY,
  parcel_id VARCHAR(64) NOT NULL UNIQUE,
  project_id VARCHAR(64) NOT NULL,
  beneficiary_name VARCHAR(150) NOT NULL,
  bank_name VARCHAR(100),
  account_number_masked VARCHAR(50),
  ifsc_code VARCHAR(20),
  award_reference VARCHAR(100),
  statutory_rule_version VARCHAR(50) DEFAULT 'RFCTLARR_2013_V1',
  gross_amount DECIMAL(12, 2) NOT NULL,
  deductions DECIMAL(12, 2) DEFAULT 0.00,
  net_payable DECIMAL(12, 2) NOT NULL,
  payment_status VARCHAR(40) DEFAULT 'pending',
  pfms_transaction_ref VARCHAR(100),
  disbursement_timestamp DATETIME,
  reconciliation_status VARCHAR(40) DEFAULT 'unreconciled',
  dispute_flag TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parcel_id) REFERENCES cadastral_parcels(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 7. Statutory Deadlines & Section 25 Countdown Radar
CREATE TABLE IF NOT EXISTS statutory_deadlines (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  section_ref VARCHAR(50) NOT NULL,
  statutory_milestone VARCHAR(150) NOT NULL,
  trigger_event VARCHAR(150) NOT NULL,
  effective_start_date DATE NOT NULL,
  due_date DATE NOT NULL,
  max_statutory_months INT DEFAULT 12,
  extended_due_date DATE,
  extension_reason TEXT,
  extension_authority_ref VARCHAR(100),
  status VARCHAR(30) DEFAULT 'active',
  escalation_level INT DEFAULT 0,
  resolved_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 8. Digital Signatures & e-Sign Audit Trail
CREATE TABLE IF NOT EXISTS digital_signatures (
  id VARCHAR(64) PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(64) NOT NULL,
  signer_id VARCHAR(64) NOT NULL,
  signer_name VARCHAR(150) NOT NULL,
  signer_designation VARCHAR(150),
  token_id VARCHAR(100) NOT NULL,
  provider VARCHAR(50) DEFAULT 'DEMO_NIC_DSC',
  document_hash_sha256 VARCHAR(64) NOT NULL,
  signature_timestamp DATETIME NOT NULL,
  verification_status VARCHAR(30) DEFAULT 'valid',
  is_demo_mode TINYINT(1) DEFAULT 1,
  audit_metadata TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Secure Document Vault
CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64),
  parcel_id VARCHAR(64),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  stored_file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  sha256_checksum VARCHAR(64) NOT NULL,
  version_number INT DEFAULT 1,
  access_level VARCHAR(40) DEFAULT 'internal',
  uploaded_by VARCHAR(64) NOT NULL,
  verified_by VARCHAR(64),
  verified_at DATETIME,
  is_quarantined TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Immutable Audit Log Ledger
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(64),
  user_name VARCHAR(150),
  role VARCHAR(50),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(80) NOT NULL,
  resource_id VARCHAR(64),
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
