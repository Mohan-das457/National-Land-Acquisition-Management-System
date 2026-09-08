// ===== NLAMS SHARED ROLE & AUTHENTICATION ENGINE =====
// Problem Statement #26016 - Multi-Stakeholder Decision Support
// Supporting: Tamil Nadu (TN), Andhra Pradesh (AP), Central Ministry, and Field Surveyors

const NLAMS_ROLES = {
  central: {
    id: 'central',
    name: 'Dr. Ramesh Kumar IAS',
    title: 'Joint Secretary (Land Reforms)',
    dept: 'Dept of Land Resources, Ministry of Rural Development',
    badge: 'Central Ministry',
    badgeColor: '#ff9900',
    avatar: 'RK',
    scope: 'National (28 States, 8 UTs)',
    jurisdictionLevel: 'National HQ - New Delhi',
    stateCode: 'ALL',
    stats: {
      projects: '2,847',
      landProposed: '1,42,850 Ha',
      landAcquired: '98,420 Ha',
      landAcquiredPct: '68.9%',
      compDisbursed: '₹48,250 Cr',
      compTotal: '₹72,400 Cr',
      pendingApprovals: 23,
      slaBreaches: 4,
      disputes: 312
    },
    mapCenter: [21.5937, 78.9629],
    mapZoom: 5,
    description: 'Monitors nationwide land acquisition across central ministries (MoRTH, MoR, MoP, MoWR), approves national alignment corridors, and manages union compensation grants.'
  },

  state_tn: {
    id: 'state_tn',
    name: 'Thiru K. Phanindra Reddy IAS',
    title: 'Principal Secretary (Revenue & Land Administration)',
    dept: 'Revenue & Disaster Management Dept, Govt of Tamil Nadu',
    badge: 'State Govt (Tamil Nadu)',
    badgeColor: '#0070c8',
    avatar: 'PR',
    scope: 'State of Tamil Nadu (38 Districts)',
    jurisdictionLevel: 'Secretariat - Fort St. George, Chennai',
    stateCode: 'TN',
    stats: {
      projects: '324',
      landProposed: '18,420 Ha',
      landAcquired: '13,110 Ha',
      landAcquiredPct: '71.2%',
      compDisbursed: '₹7,940 Cr',
      compTotal: '₹11,200 Cr',
      pendingApprovals: 7,
      slaBreaches: 1,
      disputes: 38
    },
    mapCenter: [12.9950, 79.9550],
    mapZoom: 14,
    description: 'Oversees Chennai Peripheral Ring Road (CPRR), Chennai-Bengaluru Industrial Corridor (CBIC), Tamil Nadu Gazette Section 11 & 19 notifications, and Special DRO approvals.'
  },

  district_tn: {
    id: 'district_tn',
    name: 'Dr. Alby John IAS',
    title: 'District Collector & Competent Authority (CALA)',
    dept: 'Tiruvallur District Administration & CPRR Project Office',
    badge: 'District CALA (Tiruvallur, TN)',
    badgeColor: '#22c55e',
    avatar: 'AJ',
    scope: 'CPRR Section II Corridor (Sriperumbudur & Tiruvallur Taluks)',
    jurisdictionLevel: 'Collectorate - Tiruvallur, Tamil Nadu',
    stateCode: 'TN',
    stats: {
      projects: '18',
      landProposed: '2,140 Ha',
      landAcquired: '1,580 Ha',
      landAcquiredPct: '73.8%',
      compDisbursed: '₹1,840 Cr',
      compTotal: '₹2,420 Cr',
      pendingApprovals: 4,
      slaBreaches: 0,
      disputes: 5
    },
    mapCenter: [12.9950, 79.9550],
    mapZoom: 15,
    description: 'Heads Section 15 hearings for CPRR in Sriperumbudur/Tiruvallur, publishes Section 19 Declarations, computes 100% Solatium awards, and disburses DBT via State Treasury.'
  },

  surveyor_tn: {
    id: 'surveyor_tn',
    name: 'K. Soundararajan',
    title: 'Firka Revenue Inspector & Cadastral Surveyor',
    dept: 'Taluk Office, Sriperumbudur (Tiruvallur District)',
    badge: 'Cadastral Surveyor (Sriperumbudur, TN)',
    badgeColor: '#0d9488',
    avatar: 'KS',
    scope: 'Nemili, Thandalam & Mambakkam Villages (CPRR Alignment)',
    jurisdictionLevel: 'Sriperumbudur Firka Station, Tamil Nadu',
    stateCode: 'TN',
    stats: {
      projects: 'CPRR Package 2',
      landProposed: '12.6 Ha (7 Patta Parcels)',
      landAcquired: '9.2 Ha',
      landAcquiredPct: '73.0%',
      compDisbursed: '₹22.47 Cr',
      compTotal: '₹30.80 Cr',
      pendingApprovals: 3,
      slaBreaches: 0,
      disputes: 1
    },
    mapCenter: [12.9950, 79.9550],
    mapZoom: 15,
    description: 'Ground survey for Chennai Peripheral Ring Road: verifies Nanja/Punja land classification, Patta passbooks, stone demarcation, standing coconut/mango tree counts, and DGPS pins.'
  },

  state_ap: {
    id: 'state_ap',
    name: 'Smt. R. P. Sisodia IAS',
    title: 'Special Chief Secretary (Revenue & Land Administration)',
    dept: 'Revenue & Land Administration Department, Govt of Andhra Pradesh',
    badge: 'State Govt (Andhra Pradesh)',
    badgeColor: '#7c3aed',
    avatar: 'RS',
    scope: 'State of Andhra Pradesh (26 Districts)',
    jurisdictionLevel: 'AP State Secretariat - Velagapudi, Amaravati',
    stateCode: 'AP',
    stats: {
      projects: '286',
      landProposed: '29,840 Ha',
      landAcquired: '19,250 Ha',
      landAcquiredPct: '64.5%',
      compDisbursed: '₹12,420 Cr',
      compTotal: '₹18,900 Cr',
      pendingApprovals: 9,
      slaBreaches: 2,
      disputes: 52
    },
    mapCenter: [16.5430, 80.5250],
    mapZoom: 14,
    description: 'Coordinates Amaravati Capital Region Seed Expressway, Polavaram Right Main Canal acquisition, Webland 1B digitization, and Section 19 Gazette notifications in AP.'
  },

  district_ap: {
    id: 'district_ap',
    name: 'Shri M. Venugopal Reddy IAS',
    title: 'District Collector & CALA (Capital Region)',
    dept: 'Guntur District Administration & APCRDA Project Unit',
    badge: 'District CALA (Guntur / Amaravati, AP)',
    badgeColor: '#22c55e',
    avatar: 'VR',
    scope: 'Amaravati Capital Region (Thullur, Mandadam, Velagapudi)',
    jurisdictionLevel: 'District Collectorate - Guntur, Andhra Pradesh',
    stateCode: 'AP',
    stats: {
      projects: '24',
      landProposed: '3,480 Ha',
      landAcquired: '2,290 Ha',
      landAcquiredPct: '65.8%',
      compDisbursed: '₹2,680 Cr',
      compTotal: '₹3,950 Cr',
      pendingApprovals: 5,
      slaBreaches: 1,
      disputes: 7
    },
    mapCenter: [16.5430, 80.5250],
    mapZoom: 15,
    description: 'Adjudicates Section 15 objections across Krishna river floodplain villages, resolves Land Pooling Scheme (LPS) vs RFCTLARR disputes, and sanctions DBT via CFMS/PFMS.'
  }
};

// Current role retrieval
function getCurrentRole() {
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');
  if (roleParam && NLAMS_ROLES[roleParam]) {
    localStorage.setItem('nlams_current_role', roleParam);
    return NLAMS_ROLES[roleParam];
  }
  const stored = localStorage.getItem('nlams_current_role');
  if (stored && NLAMS_ROLES[stored]) {
    return NLAMS_ROLES[stored];
  }
  // Default to Tamil Nadu CALA or Central
  localStorage.setItem('nlams_current_role', 'district_tn');
  return NLAMS_ROLES.district_tn;
}

// Switch active role
function switchRole(roleKey) {
  if (!NLAMS_ROLES[roleKey]) return;
  localStorage.setItem('nlams_current_role', roleKey);
  
  showRoleToast(NLAMS_ROLES[roleKey]);
  updateUIPersona(NLAMS_ROLES[roleKey]);
  
  if (typeof window.onNLAMSRoleChange === 'function') {
    window.onNLAMSRoleChange(NLAMS_ROLES[roleKey]);
  }
}

// Update UI elements across pages
function updateUIPersona(role) {
  const avatarEl = document.querySelector('.sidebar-user .user-avatar');
  const nameEl = document.querySelector('.sidebar-user .user-name');
  const roleEl = document.querySelector('.sidebar-user .user-role');
  
  if (avatarEl) {
    avatarEl.textContent = role.avatar;
    avatarEl.style.background = `linear-gradient(135deg, ${role.badgeColor}, #e68a00)`;
  }
  if (nameEl) nameEl.textContent = role.name;
  if (roleEl) {
    roleEl.innerHTML = `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${role.badgeColor};margin-right:5px;"></span>${role.badge}`;
  }

  const selectEl = document.getElementById('nlamsRoleSelect');
  if (selectEl) selectEl.value = role.id;

  let jurisTag = document.getElementById('nlamsJurisdictionBadge');
  if (!jurisTag) {
    const headerTitleDiv = document.querySelector('.top-header > div:first-child');
    if (headerTitleDiv) {
      jurisTag = document.createElement('div');
      jurisTag.id = 'nlamsJurisdictionBadge';
      jurisTag.style.cssText = 'display:inline-flex;align-items:center;gap:6px;margin-top:4px;padding:2px 8px;border-radius:4px;font-size:11px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#a8b4cc;';
      headerTitleDiv.appendChild(jurisTag);
    }
  }
  if (jurisTag) {
    jurisTag.innerHTML = `📍 <strong>${role.jurisdictionLevel}</strong> &bull; <span style="color:#ff9900;">${role.scope}</span>`;
  }
}

// Injects top role switcher bar and project explainer button
function injectRoleBar() {
  const currentRole = getCurrentRole();
  
  const topHeader = document.querySelector('.top-header');
  if (topHeader) {
    let roleBarContainer = document.getElementById('nlamsRoleBarContainer');
    if (!roleBarContainer) {
      roleBarContainer = document.createElement('div');
      roleBarContainer.id = 'nlamsRoleBarContainer';
      roleBarContainer.style.cssText = 'display:flex;align-items:center;gap:10px;margin-right:12px;';
      
      const spacer = topHeader.querySelector('.header-spacer') || topHeader.children[1];
      if (spacer) {
        topHeader.insertBefore(roleBarContainer, spacer.nextSibling);
      } else {
        topHeader.appendChild(roleBarContainer);
      }
    }

    roleBarContainer.innerHTML = `
      <a href="presentation.html" class="btn btn-outline btn-sm" style="display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg, rgba(255,122,0,0.25), rgba(255,174,0,0.15));border-color:#ff7a00;color:#ff9e00;font-weight:700;padding:6px 12px;text-decoration:none;border-radius:6px;box-shadow:0 2px 8px rgba(255,122,0,0.2);" title="Launch Tomorrow's Project Review Presentation Deck [Slides, Speaker Notes & Defense]">
        <span>📽️</span> Review Deck
      </a>

      <button class="btn btn-outline btn-sm" onclick="openExplainerModal()" style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,153,0,0.12);border-color:rgba(255,153,0,0.4);color:#ff9900;font-weight:600;padding:6px 12px;cursor:pointer;" title="Understand Problem Statement #26016 & Statutory Workflow">
        <span>📖</span> Project Explainer
      </button>

      <div style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);padding:4px 10px;border-radius:8px;">
        <span style="font-size:11px;color:#a8b4cc;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Persona:</span>
        <select id="nlamsRoleSelect" onchange="switchRole(this.value)" style="background:transparent;border:none;color:#f0f4ff;font-size:12px;font-weight:700;cursor:pointer;outline:none;font-family:'Inter',sans-serif;">
          <option value="district_tn" style="background:#0d1120;color:#f0f4ff;" ${currentRole.id==='district_tn'?'selected':''}>🌊 CALA Tiruvallur (Tamil Nadu - CPRR)</option>
          <option value="state_tn" style="background:#0d1120;color:#f0f4ff;" ${currentRole.id==='state_tn'?'selected':''}>🏢 State Govt (Tamil Nadu Secretariat)</option>
          <option value="surveyor_tn" style="background:#0d1120;color:#f0f4ff;" ${currentRole.id==='surveyor_tn'?'selected':''}>📐 Cadastral Surveyor (Sriperumbudur, TN)</option>
          <option value="district_ap" style="background:#0d1120;color:#f0f4ff;" ${currentRole.id==='district_ap'?'selected':''}>🌾 CALA Guntur (Andhra Pradesh - Amaravati)</option>
          <option value="state_ap" style="background:#0d1120;color:#f0f4ff;" ${currentRole.id==='state_ap'?'selected':''}>🏢 State Govt (Andhra Pradesh Secretariat)</option>
          <option value="central" style="background:#0d1120;color:#f0f4ff;" ${currentRole.id==='central'?'selected':''}>🏛️ Central Ministry (DoLR/MoRD New Delhi)</option>
        </select>
      </div>
    `;
  }

  updateUIPersona(currentRole);
  injectExplainerModalDOM();
}

function showRoleToast(role) {
  let toast = document.getElementById('nlamsToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'nlamsToast';
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;background:rgba(13,17,32,0.95);border:1px solid rgba(255,153,0,0.4);border-radius:10px;padding:12px 18px;display:flex;align-items:center;gap:12px;box-shadow:0 12px 32px rgba(0,0,0,0.6);backdrop-filter:blur(16px);transform:translateY(100px);opacity:0;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <div style="width:36px;height:36px;border-radius:8px;background:${role.badgeColor};display:flex;align-items:center;justify-content:center;font-weight:700;color:white;font-size:14px;">${role.avatar}</div>
    <div>
      <div style="font-size:11px;color:#a8b4cc;text-transform:uppercase;letter-spacing:0.5px;">Active Persona</div>
      <div style="font-weight:700;color:#f0f4ff;font-size:13px;">${role.name} (${role.badge})</div>
      <div style="font-size:10px;color:#ff9900;">Scope: ${role.scope}</div>
    </div>
  `;
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 3500);
}

function injectExplainerModalDOM() {
  if (document.getElementById('nlamsExplainerModal')) return;

  const modal = document.createElement('div');
  modal.id = 'nlamsExplainerModal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(4,6,15,0.85);backdrop-filter:blur(10px);z-index:10000;align-items:center;justify-content:center;padding:20px;';
  
  modal.innerHTML = `
    <div style="background:#0d1120;border:1px solid rgba(255,153,0,0.3);border-radius:16px;width:100%;max-width:860px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,0.8);position:relative;display:flex;flex-direction:column;">
      <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg, rgba(255,153,0,0.1), transparent);">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#ff9900,#e68a00);display:flex;align-items:center;justify-content:center;font-size:20px;">📜</div>
          <div>
            <h3 style="font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;color:#f0f4ff;margin:0;">National Land Acquisition & Management System (NLAMS)</h3>
            <div style="font-size:12px;color:#a8b4cc;">Problem Statement #26016 &bull; Department of Land Resources (DoLR), MoRD</div>
          </div>
        </div>
        <button onclick="closeExplainerModal()" style="background:rgba(255,255,255,0.08);border:none;color:#a8b4cc;width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:16px;">✕</button>
      </div>

      <div style="display:flex;gap:4px;padding:12px 24px;background:rgba(0,0,0,0.2);border-bottom:1px solid rgba(255,255,255,0.06);">
        <button class="explainer-tab-btn" onclick="switchExplainerTab('overview', this)" style="background:rgba(255,153,0,0.1);color:#ff9900;border:none;border-bottom:2px solid #ff9900;padding:8px 14px;border-radius:6px 6px 0 0;font-size:12px;font-weight:600;cursor:pointer;">1. Problem & Core Mission</button>
        <button class="explainer-tab-btn" onclick="switchExplainerTab('lifecycle', this)" style="background:transparent;color:#a8b4cc;border:none;border-bottom:2px solid transparent;padding:8px 14px;border-radius:6px 6px 0 0;font-size:12px;font-weight:600;cursor:pointer;">2. Statutory 6-Stage Lifecycle</button>
        <button class="explainer-tab-btn" onclick="switchExplainerTab('personas', this)" style="background:transparent;color:#a8b4cc;border:none;border-bottom:2px solid transparent;padding:8px 14px;border-radius:6px 6px 0 0;font-size:12px;font-weight:600;cursor:pointer;">3. Why Different Personas?</button>
        <button class="explainer-tab-btn" onclick="switchExplainerTab('gis', this)" style="background:transparent;color:#a8b4cc;border:none;border-bottom:2px solid transparent;padding:8px 14px;border-radius:6px 6px 0 0;font-size:12px;font-weight:600;cursor:pointer;">4. AP & TN Cadastral GIS</button>
      </div>

      <div style="padding:24px;color:#cbd5e1;font-size:13.5px;line-height:1.65;overflow-y:auto;" id="explainerModalContent">
      </div>

      <div style="padding:16px 24px;border-top:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.2);">
        <div style="font-size:12px;color:#a8b4cc;">Compliance: RFCTLARR Act 2013 | PM GatiShakti NMP Standard</div>
        <button class="btn btn-saffron btn-sm" onclick="closeExplainerModal()">Got it, Explore System →</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  switchExplainerTab('overview');
}

const EXPLAINER_TABS = {
  overview: `
    <div style="margin-bottom:18px;">
      <h4 style="color:#ff9900;font-size:16px;margin-bottom:8px;">⚠️ The National Problem in Real-World Infrastructure</h4>
      <p>Land acquisition is the single biggest bottleneck in India's mega infrastructure development (Highways, High-Speed Bullet Trains, Dedicated Freight Corridors, Solar Parks, River Interlinking). According to MOSPI, <strong>over 70% of delayed national projects suffer cost escalations exceeding ₹4.5 Lakh Crore purely due to land disputes and slow administrative approvals</strong>.</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;">
      <div style="background:rgba(229,57,53,0.08);border:1px solid rgba(229,57,53,0.25);border-radius:10px;padding:14px;">
        <div style="font-weight:700;color:#ef4444;margin-bottom:6px;">🚨 Without NLAMS (Current Legacy Pain Points)</div>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#a8b4cc;display:flex;flex-direction:column;gap:6px;">
          <li><strong>Catastrophic Statutory Lapses</strong>: Under RFCTLARR Act Sec 25, if the Award is not declared within 12 months of Sec 19 publication, <em>the entire acquisition lapses automatically</em>.</li>
          <li><strong>Fragmented Physical Files</strong>: Moving across Patwari/Karnam &rarr; Tehsildar &rarr; District Collector (CALA) &rarr; State Revenue &rarr; Central Ministry takes years.</li>
          <li><strong>Disputes & Injunctions</strong>: High Court stays triggered due to boundary mismatch, inaccurate survey numbers, and unrecorded heirs.</li>
          <li><strong>Ghost Beneficiaries</strong>: Lack of Aadhaar/PFMS direct bank integration leads to delayed compensation and middleman fraud.</li>
        </ul>
      </div>

      <div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:10px;padding:14px;">
        <div style="font-weight:700;color:#22c55e;margin-bottom:6px;">✅ With NLAMS (Our Solution for SIH #26016)</div>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#a8b4cc;display:flex;flex-direction:column;gap:6px;">
          <li><strong>Single Source of Truth</strong>: Digitized end-to-end lifecycle from proposal to physical possession.</li>
          <li><strong>Automated Section 25 Alarms</strong>: Real-time countdown timers warn CALAs before the statutory 12-month lapse period expires.</li>
          <li><strong>State-Specific Cadastral GIS (AP & TN)</strong>: Real Patta / Khata survey polygons overlaid on Satellite imagery to prevent boundary tampering.</li>
          <li><strong>Direct Benefit Transfer (DBT)</strong>: Direct bank transfer linked with Aadhaar and Patta/Webland 1B records, giving farmers 100% Solatium instantly.</li>
        </ul>
      </div>
    </div>
  `,

  lifecycle: `
    <div style="margin-bottom:16px;">
      <h4 style="color:#ff9900;font-size:16px;margin-bottom:6px;">⚖️ The 6 Statutory Stages under RFCTLARR Act 2013</h4>
      <p style="color:#a8b4cc;font-size:12.5px;">Every infrastructure acquisition in India must strictly follow these 6 statutory milestones. NLAMS tracks each parcel and project through this pipeline:</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px;">
      <div style="display:flex;gap:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;align-items:center;">
        <div style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#ff9900;min-width:70px;">Stage 1</div>
        <div>
          <strong style="color:#f0f4ff;">Project Proposal & SIA (Social Impact Assessment)</strong>
          <div style="font-size:12px;color:#a8b4cc;">Land Requiring Body (NHAI/Railways/TNRDC/APCRDA) submits alignment. SIA team conducts public hearings and studies livelihood impact on families.</div>
        </div>
      </div>

      <div style="display:flex;gap:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;align-items:center;">
        <div style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#a855f7;min-width:70px;">Stage 2</div>
        <div>
          <strong style="color:#f0f4ff;">Section 11 Preliminary Notification</strong>
          <div style="font-size:12px;color:#a8b4cc;">Published in official Gazette and newspapers stating intent to acquire. Freezes transactions to prevent artificial price inflation.</div>
        </div>
      </div>

      <div style="display:flex;gap:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;align-items:center;">
        <div style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#0d9488;min-width:70px;">Stage 3</div>
        <div>
          <strong style="color:#f0f4ff;">Section 15 Hearing of Objections & Joint Survey</strong>
          <div style="font-size:12px;color:#a8b4cc;">60-day window for land owners to submit objections. Field surveyors execute ground Joint Measurement Surveys (JMS) to verify physical boundaries.</div>
        </div>
      </div>

      <div style="display:flex;gap:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;align-items:center;">
        <div style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#3b82f6;min-width:70px;">Stage 4</div>
        <div>
          <strong style="color:#f0f4ff;">Section 19 Final Declaration & R&R Scheme</strong>
          <div style="font-size:12px;color:#a8b4cc;">Formal declaration published that land is required for public utility. <strong>Section 25 statutory countdown begins</strong>: exactly 12 months to declare the award.</div>
        </div>
      </div>

      <div style="display:flex;gap:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;align-items:center;">
        <div style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#f59e0b;min-width:70px;">Stage 5</div>
        <div>
          <strong style="color:#f0f4ff;">Section 23 Award Determination (100% Solatium)</strong>
          <div style="font-size:12px;color:#a8b4cc;">Quasi-judicial determination by Collector/CALA: (Market Value &times; Multiplier) + <strong>100% Solatium</strong> + 12% annual interest from Sec 11 date.</div>
        </div>
      </div>

      <div style="display:flex;gap:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;align-items:center;">
        <div style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#22c55e;min-width:70px;">Stage 6</div>
        <div>
          <strong style="color:#f0f4ff;">Section 38 DBT Compensation & Physical Possession</strong>
          <div style="font-size:12px;color:#a8b4cc;">Award amount directly credited to beneficiary bank account via PFMS. Physical possession panchnama drawn and land handed over for civil works.</div>
        </div>
      </div>
    </div>
  `,

  personas: `
    <div style="margin-bottom:16px;">
      <h4 style="color:#ff9900;font-size:16px;margin-bottom:6px;">👥 Separation of Powers Across AP, TN & Union</h4>
      <p style="color:#a8b4cc;font-size:12.5px;">Each jurisdiction has distinct statutory officers and land tenure terminologies:</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div style="background:rgba(0,112,200,0.06);border:1px solid rgba(0,112,200,0.25);border-radius:10px;padding:14px;">
        <strong style="color:#60a5fa;">🌊 Tamil Nadu (CPRR Corridor)</strong>
        <div style="font-size:12px;color:#cbd5e1;margin-top:4px;"><strong>CALA:</strong> Dr. Alby John IAS (District Collector, Tiruvallur)</div>
        <div style="font-size:12px;color:#cbd5e1;"><strong>Surveyor:</strong> K. Soundararajan (Firka Inspector, Sriperumbudur)</div>
        <div style="font-size:11.5px;color:#a8b4cc;margin-top:6px;">Manages Patta passbooks, Nanja (Wet) & Punja (Dry) classifications, and Chennai Peripheral Ring Road acquisition.</div>
      </div>

      <div style="background:rgba(124,58,237,0.06);border:1px solid rgba(124,58,237,0.25);border-radius:10px;padding:14px;">
        <strong style="color:#a78bfa;">🌾 Andhra Pradesh (Amaravati Corridor)</strong>
        <div style="font-size:12px;color:#cbd5e1;margin-top:4px;"><strong>CALA:</strong> Shri M. Venugopal Reddy IAS (Collector, Guntur)</div>
        <div style="font-size:12px;color:#cbd5e1;"><strong>State:</strong> Smt. R. P. Sisodia IAS (Special Chief Secretary)</div>
        <div style="font-size:11.5px;color:#a8b4cc;margin-top:6px;">Manages Webland 1B Adangal records, Jaribu river soils, Land Pooling Scheme vs RFCTLARR, and Seed Capital Access roads.</div>
      </div>
    </div>
  `,

  gis: `
    <div style="margin-bottom:16px;">
      <h4 style="color:#ff9900;font-size:16px;margin-bottom:6px;">🗺️ Sub-Meter Cadastral Accuracy in AP & TN</h4>
      <p style="color:#a8b4cc;font-size:12.5px;">Real farm holdings are represented with actual polygonal boundaries and tenure classifications:</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px;font-size:12.5px;">
      <div style="background:rgba(255,255,255,0.03);padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
        <strong style="color:#f0f4ff;">Tamil Nadu:</strong> Patta Numbers, Survey & Sub-division numbers (e.g. 142/1A, 142/1B), Nanja/Punja land rates, CPRR 60m buffer corridor.
      </div>
      <div style="background:rgba(255,255,255,0.03);padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
        <strong style="color:#f0f4ff;">Andhra Pradesh:</strong> Webland Khata Numbers, Survey Nos (204/1, 204/2), Jaribu/Metta classifications, Amaravati Core Seed Axis corridor.
      </div>
    </div>
  `
};

function switchExplainerTab(tabKey, btnEl) {
  const contentEl = document.getElementById('explainerModalContent');
  if (contentEl && EXPLAINER_TABS[tabKey]) {
    contentEl.innerHTML = EXPLAINER_TABS[tabKey];
  }
  document.querySelectorAll('.explainer-tab-btn').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = '#a8b4cc';
    b.style.borderBottom = '2px solid transparent';
  });
  if (btnEl) {
    btnEl.style.background = 'rgba(255,153,0,0.1)';
    btnEl.style.color = '#ff9900';
    btnEl.style.borderBottom = '2px solid #ff9900';
  }
}

function openExplainerModal() {
  injectExplainerModalDOM();
  const m = document.getElementById('nlamsExplainerModal');
  if (m) m.style.display = 'flex';
}

function closeExplainerModal() {
  const m = document.getElementById('nlamsExplainerModal');
  if (m) m.style.display = 'none';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectRoleBar);
} else {
  injectRoleBar();
}
