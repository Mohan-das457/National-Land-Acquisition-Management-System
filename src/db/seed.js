const bcrypt = require('bcryptjs');
const db = require('./index');
const { runMigrations } = require('./migrate');

async function seedDatabase() {
  console.log('[Seed] Seeding synthetic data for SIH 2026 demo...');
  await runMigrations();

  const salt = await bcrypt.genSalt(10);
  const defaultPasswordHash = await bcrypt.hash('Password@123', salt);

  // 1. Seed Users & Stakeholders
  const users = [
    {
      id: 'USR-CENTRAL-01',
      email: 'ramesh.kumar@dolr.gov.in',
      full_name: 'Dr. Ramesh Kumar IAS',
      designation: 'Joint Secretary (Land Reforms)',
      department: 'Dept of Land Resources, Ministry of Rural Development',
      role: 'central',
      state_code: 'ALL',
      district: 'ALL',
      phone: '+91 11 2338 2456'
    },
    {
      id: 'USR-STATE-TN',
      email: 'phanindra.reddy@tn.gov.in',
      full_name: 'Thiru K. Phanindra Reddy IAS',
      designation: 'Principal Secretary (Revenue)',
      department: 'Revenue & Disaster Management Dept, Govt of Tamil Nadu',
      role: 'state',
      state_code: 'TN',
      district: 'ALL',
      phone: '+91 44 2567 1234'
    },
    {
      id: 'USR-CALA-TN',
      email: 'alby.john@tn.gov.in',
      full_name: 'Dr. Alby John IAS',
      designation: 'District Collector & Competent Authority (CALA)',
      department: 'Tiruvallur District Administration & CPRR Project Office',
      role: 'district',
      state_code: 'TN',
      district: 'Tiruvallur',
      phone: '+91 44 2766 5432'
    },
    {
      id: 'USR-SURVEYOR-TN',
      email: 'k.soundar@tn.gov.in',
      full_name: 'K. Soundararajan',
      designation: 'Firka Revenue Inspector & Cadastral Surveyor',
      department: 'Taluk Office, Sriperumbudur (Tiruvallur District)',
      role: 'surveyor',
      state_code: 'TN',
      district: 'Tiruvallur',
      phone: '+91 94440 12345'
    },
    {
      id: 'USR-STATE-AP',
      email: 'rp.sisodia@ap.gov.in',
      full_name: 'Smt. R. P. Sisodia IAS',
      designation: 'Special Chief Secretary (Revenue)',
      department: 'Revenue & Land Administration Department, Govt of Andhra Pradesh',
      role: 'state',
      state_code: 'AP',
      district: 'ALL',
      phone: '+91 863 244 5678'
    },
    {
      id: 'USR-CALA-AP',
      email: 'venugopal.reddy@ap.gov.in',
      full_name: 'Shri M. Venugopal Reddy IAS',
      designation: 'District Collector & CALA (Capital Region)',
      department: 'Guntur District Administration & APCRDA Project Unit',
      role: 'district',
      state_code: 'AP',
      district: 'Guntur',
      phone: '+91 863 223 4567'
    },
    {
      id: 'USR-FARMER-01',
      email: 'ramu.gowda@kisan.in',
      full_name: 'Ramu Gowda',
      designation: 'Verified Landowner & Producer',
      department: 'Tiruvallur Farmers Co-operative',
      role: 'citizen',
      state_code: 'TN',
      district: 'Tiruvallur',
      phone: '+91 98410 98765'
    }
  ];

  for (const u of users) {
    const existing = await db.query('SELECT id FROM users WHERE email = ?', [u.email]);
    if (existing.length === 0) {
      await db.execute(
        `INSERT INTO users (id, email, password_hash, full_name, designation, department, role, state_code, district, phone, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
        [u.id, u.email, defaultPasswordHash, u.full_name, u.designation, u.department, u.role, u.state_code, u.district, u.phone]
      );
    }
  }

  // 2. Seed Infrastructure Projects
  const projects = [
    {
      id: 'PRJ-TN-CPRR-02',
      reference_no: 'NHAI/PIU-CHN/CPRR/PKG-2/2024',
      name: 'Chennai Peripheral Ring Road (CPRR Package 2)',
      sector: 'Highways & Expressways',
      requiring_body: 'Tamil Nadu Road Development Company (TNRDC) / MoRTH',
      state_code: 'TN',
      district: 'Tiruvallur',
      taluk: 'Sriperumbudur',
      villages: 'Nemili, Thandalam, Mambakkam, Irungattukottai',
      total_land_ha: 142.85,
      acquired_land_ha: 98.42,
      estimated_cost_cr: 2420.00,
      sanctioned_compensation_cr: 380.00,
      disbursed_compensation_cr: 275.50,
      current_stage: 5,
      stage_name: 'Stage 5: Section 23 Award Determination',
      status: 'in_progress',
      sla_breached: 0,
      pending_tasks_count: 4,
      center_lat: 12.9950,
      center_lng: 79.9550,
      row_width_meters: 60,
      created_by: 'USR-CENTRAL-01'
    },
    {
      id: 'PRJ-AP-AMR-01',
      reference_no: 'APCRDA/LA/CORE-SEED-AXIS/2023',
      name: 'Amaravati Capital Region Seed Axis Expressway',
      sector: 'Urban Transport & Capital Infrastructure',
      requiring_body: 'Andhra Pradesh Capital Region Development Authority (APCRDA)',
      state_code: 'AP',
      district: 'Guntur',
      taluk: 'Thullur',
      villages: 'Mandadam, Velagapudi, Thullur, Rayapudi',
      total_land_ha: 218.40,
      acquired_land_ha: 142.30,
      estimated_cost_cr: 3150.00,
      sanctioned_compensation_cr: 460.00,
      disbursed_compensation_cr: 310.20,
      current_stage: 4,
      stage_name: 'Stage 4: Section 19 Final Declaration',
      status: 'in_progress',
      sla_breached: 0,
      pending_tasks_count: 6,
      center_lat: 16.5430,
      center_lng: 80.5250,
      row_width_meters: 80,
      created_by: 'USR-CENTRAL-01'
    },
    {
      id: 'PRJ-UP-JWR-01',
      reference_no: 'YEIDA/LA/JEWAR-AIRPORT-PH2/2024',
      name: 'Noida International Airport (Jewar Phase II)',
      sector: 'Aviation & Aerotropolis',
      requiring_body: 'Yamuna Expressway Industrial Development Authority (YEIDA)',
      state_code: 'UP',
      district: 'Gautam Buddha Nagar',
      taluk: 'Jewar',
      villages: 'Ranhera, Dayanatpur, Rohi',
      total_land_ha: 1365.00,
      acquired_land_ha: 1054.00,
      estimated_cost_cr: 7420.00,
      sanctioned_compensation_cr: 1840.00,
      disbursed_compensation_cr: 1420.00,
      current_stage: 5,
      stage_name: 'Stage 5: Section 23 Award Determination',
      status: 'in_progress',
      sla_breached: 0,
      pending_tasks_count: 5,
      center_lat: 28.1640,
      center_lng: 77.5720,
      row_width_meters: 100,
      created_by: 'USR-CENTRAL-01'
    }
  ];

  for (const p of projects) {
    const existing = await db.query('SELECT id FROM projects WHERE id = ?', [p.id]);
    if (existing.length === 0) {
      await db.execute(
        `INSERT INTO projects (
          id, reference_no, name, sector, requiring_body, state_code, district, taluk, villages,
          total_land_ha, acquired_land_ha, estimated_cost_cr, sanctioned_compensation_cr,
          disbursed_compensation_cr, current_stage, stage_name, status, sla_breached,
          pending_tasks_count, center_lat, center_lng, row_width_meters, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id, p.reference_no, p.name, p.sector, p.requiring_body, p.state_code, p.district, p.taluk, p.villages,
          p.total_land_ha, p.acquired_land_ha, p.estimated_cost_cr, p.sanctioned_compensation_cr,
          p.disbursed_compensation_cr, p.current_stage, p.stage_name, p.status, p.sla_breached,
          p.pending_tasks_count, p.center_lat, p.center_lng, p.row_width_meters, p.created_by
        ]
      );
    }
  }

  // 3. Seed Cadastral Parcels with Sub-Meter Coordinates
  const parcels = [
    {
      id: 'TN-PAR-142-1A',
      project_id: 'PRJ-TN-CPRR-02',
      state_code: 'TN',
      district: 'Tiruvallur',
      taluk: 'Sriperumbudur',
      village: 'Nemili',
      survey_number: '142/1A',
      patta_khata_no: 'Patta # 842',
      owner_name: 'M. Selvamani & K. Arumugam (Joint Patta)',
      joint_owners: 'M. Selvamani (50%), K. Arumugam (50%)',
      aadhaar_linked: 1,
      total_area_ha: 2.30,
      acquired_area_ha: 1.75,
      land_classification: 'Nanja (Wet Irrigated Paddy Land)',
      guideline_value_per_ha: 6500000.00,
      rural_multiplier: 1.50,
      base_compensation: 17062500.00,
      solatium_amount: 17062500.00,
      additional_interest: 2047500.00,
      total_award_amount: 36172500.00,
      disbursement_status: 'disbursed',
      polygon_geojson: JSON.stringify([
        [12.9920, 79.9480],
        [12.9948, 79.9495],
        [12.9940, 79.9535],
        [12.9912, 79.9518]
      ]),
      trees_count: 22,
      trees_valuation: 240000.00,
      structures_valuation: 180000.00
    },
    {
      id: 'TN-PAR-142-1B',
      project_id: 'PRJ-TN-CPRR-02',
      state_code: 'TN',
      district: 'Tiruvallur',
      taluk: 'Sriperumbudur',
      village: 'Nemili',
      survey_number: '142/1B',
      patta_khata_no: 'Patta # 843',
      owner_name: 'V. Murugesan & Smt. V. Meenakshi',
      joint_owners: 'V. Murugesan, Smt. V. Meenakshi',
      aadhaar_linked: 1,
      total_area_ha: 1.45,
      acquired_area_ha: 1.10,
      land_classification: 'Punja (Dry Agricultural Land)',
      guideline_value_per_ha: 5800000.00,
      rural_multiplier: 1.50,
      base_compensation: 9570000.00,
      solatium_amount: 9570000.00,
      additional_interest: 1148400.00,
      total_award_amount: 20288400.00,
      disbursement_status: 'approved',
      polygon_geojson: JSON.stringify([
        [12.9948, 79.9495],
        [12.9975, 79.9512],
        [12.9965, 79.9552],
        [12.9940, 79.9535]
      ]),
      trees_count: 8,
      trees_valuation: 65000.00,
      structures_valuation: 95000.00
    },
    {
      id: 'AP-PAR-204-1',
      project_id: 'PRJ-AP-AMR-01',
      state_code: 'AP',
      district: 'Guntur',
      taluk: 'Thullur',
      village: 'Mandadam',
      survey_number: '204/1',
      patta_khata_no: 'Webland Khata # 1042',
      owner_name: 'Chalasani Venkatramaiah & Sons',
      joint_owners: 'C. Venkatramaiah, C. Radhakrishna',
      aadhaar_linked: 1,
      total_area_ha: 3.10,
      acquired_area_ha: 2.45,
      land_classification: 'Jaribu (Krishna River Alluvial Soil)',
      guideline_value_per_ha: 7800000.00,
      rural_multiplier: 1.25,
      base_compensation: 23887500.00,
      solatium_amount: 23887500.00,
      additional_interest: 2866500.00,
      total_award_amount: 50641500.00,
      disbursement_status: 'pending',
      polygon_geojson: JSON.stringify([
        [16.5410, 80.5210],
        [16.5442, 80.5225],
        [16.5435, 80.5265],
        [16.5402, 80.5248]
      ]),
      trees_count: 14,
      trees_valuation: 180000.00,
      structures_valuation: 220000.00
    }
  ];

  for (const par of parcels) {
    const existing = await db.query('SELECT id FROM cadastral_parcels WHERE id = ?', [par.id]);
    if (existing.length === 0) {
      await db.execute(
        `INSERT INTO cadastral_parcels (
          id, project_id, state_code, district, taluk, village, survey_number, patta_khata_no,
          owner_name, joint_owners, aadhaar_linked, total_area_ha, acquired_area_ha,
          land_classification, guideline_value_per_ha, rural_multiplier, base_compensation,
          solatium_amount, additional_interest, total_award_amount, disbursement_status,
          polygon_geojson, trees_count, trees_valuation, structures_valuation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          par.id, par.project_id, par.state_code, par.district, par.taluk, par.village,
          par.survey_number, par.patta_khata_no, par.owner_name, par.joint_owners, par.aadhaar_linked,
          par.total_area_ha, par.acquired_area_ha, par.land_classification, par.guideline_value_per_ha,
          par.rural_multiplier, par.base_compensation, par.solatium_amount, par.additional_interest,
          par.total_award_amount, par.disbursement_status, par.polygon_geojson, par.trees_count,
          par.trees_valuation, par.structures_valuation
        ]
      );
    }
  }

  // 4. Seed Compensation Cases
  const compCases = [
    {
      id: 'CMP-TN-142-1A',
      parcel_id: 'TN-PAR-142-1A',
      project_id: 'PRJ-TN-CPRR-02',
      beneficiary_name: 'M. Selvamani & K. Arumugam',
      bank_name: 'Indian Overseas Bank (Sriperumbudur)',
      account_number_masked: 'XXXX-XXXX-3819',
      ifsc_code: 'IOBA0000142',
      award_reference: 'AWARD/CPRR/SEC23/2025/084',
      gross_amount: 36172500.00,
      deductions: 0.00,
      net_payable: 36172500.00,
      payment_status: 'reconciled',
      pfms_transaction_ref: 'PFMS-TN-2026-91823901',
      reconciliation_status: 'reconciled'
    },
    {
      id: 'CMP-TN-142-1B',
      parcel_id: 'TN-PAR-142-1B',
      project_id: 'PRJ-TN-CPRR-02',
      beneficiary_name: 'V. Murugesan & Smt. V. Meenakshi',
      bank_name: 'State Bank of India (Tiruvallur)',
      account_number_masked: 'XXXX-XXXX-7104',
      ifsc_code: 'SBIN0001289',
      award_reference: 'AWARD/CPRR/SEC23/2026/012',
      gross_amount: 20288400.00,
      deductions: 0.00,
      net_payable: 20288400.00,
      payment_status: 'approved',
      pfms_transaction_ref: 'PFMS-TN-2026-PENDING-SANCTION',
      reconciliation_status: 'unreconciled'
    }
  ];

  for (const c of compCases) {
    const existing = await db.query('SELECT id FROM compensation_cases WHERE id = ?', [c.id]);
    if (existing.length === 0) {
      await db.execute(
        `INSERT INTO compensation_cases (
          id, parcel_id, project_id, beneficiary_name, bank_name, account_number_masked, ifsc_code,
          award_reference, gross_amount, deductions, net_payable, payment_status,
          pfms_transaction_ref, reconciliation_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          c.id, c.parcel_id, c.project_id, c.beneficiary_name, c.bank_name, c.account_number_masked,
          c.ifsc_code, c.award_reference, c.gross_amount, c.deductions, c.net_payable, c.payment_status,
          c.pfms_transaction_ref, c.reconciliation_status
        ]
      );
    }
  }

  // 5. Seed Statutory Deadlines (Section 25 RFCTLARR Act 2013)
  const deadlines = [
    {
      id: 'DEADLINE-CPRR-SEC25',
      project_id: 'PRJ-TN-CPRR-02',
      section_ref: 'Section 25',
      statutory_milestone: 'Declaration of Compensation Award under Section 23',
      trigger_event: 'Publication of Section 19 Final Declaration in Tamil Nadu Gazette',
      effective_start_date: '2025-05-15',
      due_date: '2026-05-15',
      max_statutory_months: 12,
      status: 'active',
      escalation_level: 1
    },
    {
      id: 'DEADLINE-AMR-SEC25',
      project_id: 'PRJ-AP-AMR-01',
      section_ref: 'Section 25',
      statutory_milestone: 'Declaration of Compensation Award under Section 23',
      trigger_event: 'Publication of Section 19 Final Declaration in AP Gazette',
      effective_start_date: '2025-08-10',
      due_date: '2026-08-10',
      max_statutory_months: 12,
      status: 'active',
      escalation_level: 0
    }
  ];

  for (const d of deadlines) {
    const existing = await db.query('SELECT id FROM statutory_deadlines WHERE id = ?', [d.id]);
    if (existing.length === 0) {
      await db.execute(
        `INSERT INTO statutory_deadlines (
          id, project_id, section_ref, statutory_milestone, trigger_event, effective_start_date,
          due_date, max_statutory_months, status, escalation_level
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          d.id, d.project_id, d.section_ref, d.statutory_milestone, d.trigger_event,
          d.effective_start_date, d.due_date, d.max_statutory_months, d.status, d.escalation_level
        ]
      );
    }
  }

  // 6. Seed Objections & Quasi-Judicial Hearings
  const objections = [
    {
      id: 'OBJ-2025-089',
      project_id: 'PRJ-TN-CPRR-02',
      parcel_id: 'TN-PAR-142-1B',
      petitioner_name: 'V. Murugesan',
      petitioner_phone: '+91 94441 55667',
      petitioner_email: 'murugesan.v@email.com',
      khasra_survey_no: '142/1B',
      objection_type: 'Valuation & Tree Enumeration',
      grounds_summary: 'Petitioner requests re-survey of borewell casing and 8 mature palmyra trees omitted during preliminary notification.',
      filing_date: '2025-02-10',
      hearing_date: '2025-03-05',
      hearing_venue: 'Collectorate Chamber, Tiruvallur',
      hearing_status: 'disposed',
      speaking_order_text: 'Joint verification conducted by Firka Surveyor. Palmyra trees and pump casing added to supplementary valuation schedule. Relief granted.',
      order_decision: 'accepted_with_modifications',
      adjudicated_by: 'USR-CALA-TN'
    }
  ];

  for (const o of objections) {
    const existing = await db.query('SELECT id FROM objections WHERE id = ?', [o.id]);
    if (existing.length === 0) {
      await db.execute(
        `INSERT INTO objections (
          id, project_id, parcel_id, petitioner_name, petitioner_phone, petitioner_email,
          khasra_survey_no, objection_type, grounds_summary, filing_date, hearing_date,
          hearing_venue, hearing_status, speaking_order_text, order_decision, adjudicated_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          o.id, o.project_id, o.parcel_id, o.petitioner_name, o.petitioner_phone, o.petitioner_email,
          o.khasra_survey_no, o.objection_type, o.grounds_summary, o.filing_date, o.hearing_date,
          o.hearing_venue, o.hearing_status, o.speaking_order_text, o.order_decision, o.adjudicated_by
        ]
      );
    }
  }

  console.log('[Seed] Database successfully seeded with verified SIH 2026 synthetic records.');
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Seed] Seeding failed:', err);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
