// ===== NLAMS HIGH-PRECISION MULTI-STATE CADASTRAL DATASET =====
// Ultra-Accurate Cadastral Parcels with Survey Numbers, Patta Records, and Right-of-Way Alignments
// Covering: Tamil Nadu (TN), Andhra Pradesh (AP), and Maharashtra (MH)

// =========================================================================
// 1. TAMIL NADU (TN) CADASTRAL DATASET: CHENNAI PERIPHERAL RING ROAD (CPRR)
// Location: Sriperumbudur - Tiruvallur Corridor, Tamil Nadu
// Terminology: Survey No, Sub-division, Patta No, Nanja (Wet), Punja (Dry), Poramboke
// =========================================================================
const TN_CADASTRAL_PARCELS = [
  {
    id: "TN-PAR-142-1A",
    stateCode: "TN",
    stateName: "Tamil Nadu",
    district: "Tiruvallur",
    taluk: "Sriperumbudur",
    village: "Nemili (Firka: Thandalam)",
    surveyNo: "142/1A",
    pattaNo: "Patta # 842",
    owner: "M. Selvamani & K. Arumugam (Joint Patta)",
    aadhaarLinked: true,
    totalAreaHa: 2.30,
    acquiredAreaHa: 1.75,
    landType: "Nanja (Wet Irrigated Paddy Land)",
    status: "possession",
    stageText: "Section 38 - Physical Possession Complete (Civil Handover to TNRDC)",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹65,00,000",
    multiplier: "1.5x (Rural Sub-urban Multiplier)",
    baseComp: "₹1,70,62,500",
    solatium: "₹1,70,62,500 (100% Solatium Sec 30(1))",
    interest: "₹20,47,500 (12% Sec 30(3))",
    totalAward: "₹3,61,72,500",
    dbtStatus: "✅ 100% Disbursed via PFMS to Indian Overseas Bank A/c ...3819",
    dbtDate: "12-Jan-2026",
    surveyDate: "14-Nov-2024",
    treesAssessed: "18 Coconut Palms, 4 Mango Trees (Valued ₹2,40,000)",
    structureVal: "Concrete Agricultural Pump Room (Valued ₹1,80,000)",
    polygon: [
      [12.9920, 79.9480],
      [12.9948, 79.9495],
      [12.9940, 79.9535],
      [12.9912, 79.9518]
    ]
  },
  {
    id: "TN-PAR-142-1B",
    stateCode: "TN",
    stateName: "Tamil Nadu",
    district: "Tiruvallur",
    taluk: "Sriperumbudur",
    village: "Nemili",
    surveyNo: "142/1B",
    pattaNo: "Patta # 843",
    owner: "V. Murugesan & Smt. V. Meenakshi",
    aadhaarLinked: true,
    totalAreaHa: 1.45,
    acquiredAreaHa: 1.10,
    landType: "Punja (Dry Agricultural Land)",
    status: "award",
    stageText: "Section 23 - Award Declared by Special DRO (Land Acquisition)",
    statusBadge: "Award Declared",
    statusColor: "#f59e0b",
    guidelineValuePerHa: "₹58,00,000",
    multiplier: "1.5x",
    baseComp: "₹95,70,000",
    solatium: "₹95,70,000 (100%)",
    interest: "₹11,48,400",
    totalAward: "₹2,02,88,400",
    dbtStatus: "⏳ Aadhaar e-Sign Done; Treasury Bill Sanctioned",
    dbtDate: "Expected 14-Sep-2026",
    surveyDate: "18-Nov-2024",
    treesAssessed: "8 Palmyra Trees",
    structureVal: "Borewell with casing pipe (₹95,000)",
    polygon: [
      [12.9948, 79.9495],
      [12.9975, 79.9512],
      [12.9965, 79.9552],
      [12.9940, 79.9535]
    ]
  },
  {
    id: "TN-PAR-143-2",
    stateCode: "TN",
    stateName: "Tamil Nadu",
    district: "Tiruvallur",
    taluk: "Sriperumbudur",
    village: "Thandalam",
    surveyNo: "143/2",
    pattaNo: "Patta # 1104",
    owner: "Sriperumbudur Auto Logistics & Warehousing Corp",
    aadhaarLinked: false,
    totalAreaHa: 3.20,
    acquiredAreaHa: 2.40,
    landType: "Commercial / Industrial Conversion Land",
    status: "declaration",
    stageText: "Section 19 - Final Acquisition Declaration Published in TN Gazette",
    statusBadge: "Section 19 Declared",
    statusColor: "#3b82f6",
    guidelineValuePerHa: "₹85,00,000",
    multiplier: "1.2x (Suburban Industrial Zone)",
    baseComp: "₹2,44,80,000",
    solatium: "₹2,44,80,000",
    interest: "₹29,37,600",
    totalAward: "₹5,18,97,600",
    dbtStatus: "📋 Section 15 Hearing Disposed; Award Inquiry Scheduled",
    dbtDate: "Target Award: 28-Sep-2026",
    surveyDate: "22-Dec-2024",
    treesAssessed: "Nil",
    structureVal: "Pre-fabricated Security Cabin & Boundary Wall",
    polygon: [
      [12.9912, 79.9518],
      [12.9940, 79.9535],
      [12.9930, 79.9580],
      [12.9902, 79.9560]
    ]
  },
  {
    id: "TN-PAR-144-1",
    stateCode: "TN",
    stateName: "Tamil Nadu",
    district: "Tiruvallur",
    taluk: "Sriperumbudur",
    village: "Thandalam",
    surveyNo: "144/1 (Poramboke)",
    pattaNo: "Government Poramboke",
    owner: "Tiruvallur Panchayat Union (Meikkal / Grazing Poramboke)",
    aadhaarLinked: false,
    totalAreaHa: 4.10,
    acquiredAreaHa: 2.80,
    landType: "Grama Natham & Water Course Poramboke",
    status: "possession",
    stageText: "Inter-Departmental Alienation Approved by Commissioner of Land Administration (CLA)",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹55,00,000",
    multiplier: "1.0x",
    baseComp: "₹1,54,00,000 (Book Adjustment)",
    solatium: "Exempt (Govt Land)",
    interest: "Nil",
    totalAward: "₹1,54,00,000",
    dbtStatus: "✅ Alienated to Highways Department (Go.Ms.No 142)",
    dbtDate: "05-Feb-2026",
    surveyDate: "10-Oct-2024",
    treesAssessed: "Nil",
    structureVal: "Culvert and drainage channel (Relocation planned)",
    polygon: [
      [12.9940, 79.9535],
      [12.9965, 79.9552],
      [12.9955, 79.9598],
      [12.9930, 79.9580]
    ]
  },
  {
    id: "TN-PAR-145-3",
    stateCode: "TN",
    stateName: "Tamil Nadu",
    district: "Tiruvallur",
    taluk: "Sriperumbudur",
    village: "Mambakkam",
    surveyNo: "145/3",
    pattaNo: "Patta # 519",
    owner: "K. Thangavel, T. Subramani & Legal Heirs",
    aadhaarLinked: true,
    totalAreaHa: 2.10,
    acquiredAreaHa: 1.60,
    landType: "Punja Land with National Highway Frontage",
    status: "disputed",
    stageText: "⚠️ Madras High Court WP No. 18420/2025 (Interim Injunction on Valuation Rate)",
    statusBadge: "High Court Stay / Dispute",
    statusColor: "#ef4444",
    guidelineValuePerHa: "₹72,00,000",
    multiplier: "1.5x",
    baseComp: "₹1,72,80,000",
    solatium: "₹1,72,80,000",
    interest: "₹20,73,600",
    totalAward: "₹3,66,33,600 (Court Escrow)",
    dbtStatus: "⛔ Deposited under Section 77 in High Court Principal Escrow",
    dbtDate: "Next Hearing: 22-Sep-2026",
    surveyDate: "04-Jan-2025",
    treesAssessed: "14 Teakwood Trees",
    structureVal: "Automobile Service Shed (Disputed valuation)",
    polygon: [
      [12.9965, 79.9552],
      [12.9992, 79.9570],
      [12.9982, 79.9615],
      [12.9955, 79.9598]
    ]
  },
  {
    id: "TN-PAR-146-1",
    stateCode: "TN",
    stateName: "Tamil Nadu",
    district: "Tiruvallur",
    taluk: "Sriperumbudur",
    village: "Mambakkam",
    surveyNo: "146/1",
    pattaNo: "Patta # 722",
    owner: "S. Rajeshwari W/o Late Sundaram",
    aadhaarLinked: true,
    totalAreaHa: 1.25,
    acquiredAreaHa: 0.95,
    landType: "Nanja (Double Crop Wet Paddy Land)",
    status: "possession",
    stageText: "Section 38 - 100% Compensation Disbursed & Possession Accorded",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹62,00,000",
    multiplier: "1.5x",
    baseComp: "₹88,35,000",
    solatium: "₹88,35,000 (100%)",
    interest: "₹10,60,200",
    totalAward: "₹1,87,30,200",
    dbtStatus: "✅ Credited directly to Canara Bank A/c via PFMS",
    dbtDate: "20-Jan-2026",
    surveyDate: "16-Nov-2024",
    treesAssessed: "6 Coconut Trees",
    structureVal: "Nil",
    polygon: [
      [12.9930, 79.9580],
      [12.9955, 79.9598],
      [12.9945, 79.9642],
      [12.9920, 79.9622]
    ]
  },
  {
    id: "TN-PAR-147-2A",
    stateCode: "TN",
    stateName: "Tamil Nadu",
    district: "Tiruvallur",
    taluk: "Sriperumbudur",
    village: "Irungattukottai",
    surveyNo: "147/2A",
    pattaNo: "Patta # 391",
    owner: "R. Subramanian & Sons",
    aadhaarLinked: true,
    totalAreaHa: 2.80,
    acquiredAreaHa: 2.15,
    landType: "Horticulture Mango Orchard",
    status: "award",
    stageText: "Section 23 - Award Declared; Tree Valuation Finalized with Horticulture Dept",
    statusBadge: "Award Declared",
    statusColor: "#f59e0b",
    guidelineValuePerHa: "₹68,00,000",
    multiplier: "1.5x",
    baseComp: "₹2,19,30,000",
    solatium: "₹2,19,30,000",
    interest: "₹26,31,600",
    totalAward: "₹4,64,91,600",
    dbtStatus: "⏳ Direct Bank Authorization Queued at Treasury",
    dbtDate: "Scheduled 15-Sep-2026",
    surveyDate: "28-Nov-2024",
    treesAssessed: "38 Banganapalli Mango Trees (Valued ₹3,80,000)",
    structureVal: "Farm Tubewell & Micro-irrigation Piping",
    polygon: [
      [12.9955, 79.9598],
      [12.9982, 79.9615],
      [12.9972, 79.9660],
      [12.9945, 79.9642]
    ]
  }
];

// Chennai Peripheral Ring Road (CPRR) 60-meter Alignment Corridor
const TN_EXPRESSWAY_ALIGNMENT = {
  name: "Chennai Peripheral Ring Road (CPRR) - Section II (Tiruvallur-Sriperumbudur)",
  widthMeters: 60,
  centerline: [
    [12.9880, 79.9450],
    [12.9915, 79.9500],
    [12.9945, 79.9550],
    [12.9970, 79.9600],
    [12.9995, 79.9650],
    [13.0020, 79.9700]
  ],
  bufferPolygon: [
    [12.9888, 79.9445],
    [12.9923, 79.9495],
    [12.9953, 79.9545],
    [12.9978, 79.9595],
    [13.0003, 79.9645],
    [13.0028, 79.9695],
    [13.0012, 79.9705],
    [12.9987, 79.9655],
    [12.9962, 79.9605],
    [12.9937, 79.9555],
    [12.9907, 79.9505],
    [12.9872, 79.9455]
  ]
};

// =========================================================================
// 2. ANDHRA PRADESH (AP) CADASTRAL DATASET: AMARAVATI SEED CAPITAL CORRIDOR
// Location: Thullur - Mandadam - Velagapudi, Guntur/Krishna District, AP
// Terminology: Survey No, Khata No, Webland 1B, Jaribu (Wet River Alluvial), Metta (Dry)
// =========================================================================
const AP_CADASTRAL_PARCELS = [
  {
    id: "AP-PAR-204-1",
    stateCode: "AP",
    stateName: "Andhra Pradesh",
    district: "Guntur (Capital Region)",
    taluk: "Thullur Mandal",
    village: "Mandadam (Krishna Floodplain)",
    surveyNo: "204/1",
    pattaNo: "Khata # 418 (Webland 1B)",
    owner: "Gutta Venkata Ramana & Sons",
    aadhaarLinked: true,
    totalAreaHa: 2.60,
    acquiredAreaHa: 2.10,
    landType: "Jaribu (Rich Multi-Crop River Alluvial Soil)",
    status: "possession",
    stageText: "Section 38 - Complete Possession Handed Over to APCRDA",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹75,00,000",
    multiplier: "1.5x (Capital Region Multiplier)",
    baseComp: "₹2,36,25,000",
    solatium: "₹2,36,25,000 (100% Solatium)",
    interest: "₹28,35,000",
    totalAward: "₹5,00,85,000",
    dbtStatus: "✅ Credited via CFMS / PFMS to Andhra Bank (UBI) A/c",
    dbtDate: "18-Feb-2026",
    surveyDate: "12-Nov-2024",
    treesAssessed: "24 Banana Plantations, 12 Coconut Palms",
    structureVal: "Submersible Pump Set & Drip Irrigation (₹2,10,000)",
    polygon: [
      [16.5410, 80.5180],
      [16.5440, 80.5200],
      [16.5430, 80.5245],
      [16.5400, 80.5225]
    ]
  },
  {
    id: "AP-PAR-204-2",
    stateCode: "AP",
    stateName: "Andhra Pradesh",
    district: "Guntur",
    taluk: "Thullur Mandal",
    village: "Mandadam",
    surveyNo: "204/2",
    pattaNo: "Khata # 419",
    owner: "Yarlagadda Sambasiva Rao & Family",
    aadhaarLinked: true,
    totalAreaHa: 1.80,
    acquiredAreaHa: 1.35,
    landType: "Metta (Dry Commercial Cotton Farm)",
    status: "award",
    stageText: "Section 23 - Award Declared by Joint Collector & CALA",
    statusBadge: "Award Declared",
    statusColor: "#f59e0b",
    guidelineValuePerHa: "₹68,00,000",
    multiplier: "1.5x",
    baseComp: "₹1,37,70,000",
    solatium: "₹1,37,70,000",
    interest: "₹16,52,400",
    totalAward: "₹2,91,92,400",
    dbtStatus: "⏳ Treasury Token Issued; Bank Mandate Active",
    dbtDate: "Expected 16-Sep-2026",
    surveyDate: "15-Nov-2024",
    treesAssessed: "Nil",
    structureVal: "Farm Fencing & Sump (₹80,000)",
    polygon: [
      [16.5440, 80.5200],
      [16.5470, 80.5220],
      [16.5460, 80.5265],
      [16.5430, 80.5245]
    ]
  },
  {
    id: "AP-PAR-205-A",
    stateCode: "AP",
    stateName: "Andhra Pradesh",
    district: "Guntur",
    taluk: "Thullur Mandal",
    village: "Velagapudi (Near State Secretariat)",
    surveyNo: "205/A",
    pattaNo: "Grama Kantham (Common)",
    owner: "Velagapudi Gram Panchayat (Public Utility)",
    aadhaarLinked: false,
    totalAreaHa: 3.50,
    acquiredAreaHa: 2.20,
    landType: "Grama Kantham & Village Drainage Corridor",
    status: "declaration",
    stageText: "Section 19 - Final Declaration Published in AP Gazette",
    statusBadge: "Section 19 Declared",
    statusColor: "#3b82f6",
    guidelineValuePerHa: "₹80,00,000",
    multiplier: "1.2x",
    baseComp: "₹2,11,20,000",
    solatium: "₹2,11,20,000",
    interest: "₹25,34,400",
    totalAward: "₹4,47,74,400",
    dbtStatus: "📋 Resettlement of 14 Petty Shops under R&R Master Plan",
    dbtDate: "Award Inquiry: 24-Sep-2026",
    surveyDate: "20-Dec-2024",
    treesAssessed: "12 Neem Trees",
    structureVal: "Community Center Building (To be rebuilt under R&R)",
    polygon: [
      [16.5400, 80.5225],
      [16.5430, 80.5245],
      [16.5420, 80.5290],
      [16.5390, 80.5270]
    ]
  },
  {
    id: "AP-PAR-206-1",
    stateCode: "AP",
    stateName: "Andhra Pradesh",
    district: "Guntur",
    taluk: "Thullur Mandal",
    village: "Thullur",
    surveyNo: "206/1",
    pattaNo: "Khata # 702",
    owner: "K. Srinivasa Rao & 3 Co-sharers",
    aadhaarLinked: true,
    totalAreaHa: 2.90,
    acquiredAreaHa: 2.40,
    landType: "Jaribu Land with Seed Access Road Frontage",
    status: "disputed",
    stageText: "⚠️ AP High Court WP No. 9412/2025 (Dispute: Land Pooling Scheme vs RFCTLARR Act)",
    statusBadge: "High Court Injunction",
    statusColor: "#ef4444",
    guidelineValuePerHa: "₹88,00,000",
    multiplier: "1.5x",
    baseComp: "₹3,16,80,000",
    solatium: "₹3,16,80,000",
    interest: "₹38,01,600",
    totalAward: "₹6,71,61,600 (Deposited in Court)",
    dbtStatus: "⛔ Interim Stay on Possession; Escrow Deposit Verified",
    dbtDate: "Next Hearing: 25-Sep-2026",
    surveyDate: "08-Jan-2025",
    treesAssessed: "Teak & Mango Mixed Farm",
    structureVal: "Two-Story Farmhouse & Storage Warehouse",
    polygon: [
      [16.5430, 80.5245],
      [16.5460, 80.5265],
      [16.5450, 80.5310],
      [16.5420, 80.5290]
    ]
  },
  {
    id: "AP-PAR-207-2",
    stateCode: "AP",
    stateName: "Andhra Pradesh",
    district: "Guntur",
    taluk: "Thullur Mandal",
    village: "Rayapudi",
    surveyNo: "207/2",
    pattaNo: "Khata # 811",
    owner: "Muvva Lakshmi Kanthamma & Heirs",
    aadhaarLinked: true,
    totalAreaHa: 1.95,
    acquiredAreaHa: 1.60,
    landType: "Jaribu Double Crop (Paddy & Black Gram)",
    status: "possession",
    stageText: "Section 38 - Full Compensation Disbursed; Handed over for Seed Corridor",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹72,00,000",
    multiplier: "1.5x",
    baseComp: "₹1,72,80,000",
    solatium: "₹1,72,80,000 (100%)",
    interest: "₹20,73,600",
    totalAward: "₹3,66,33,600",
    dbtStatus: "✅ 100% DBT Transferred to State Bank of India",
    dbtDate: "04-Feb-2026",
    surveyDate: "28-Nov-2024",
    treesAssessed: "8 Guava, 4 Coconut",
    structureVal: "Nil",
    polygon: [
      [16.5390, 80.5270],
      [16.5420, 80.5290],
      [16.5410, 80.5335],
      [16.5380, 80.5315]
    ]
  }
];

// Amaravati Seed Access Expressway Alignment
const AP_EXPRESSWAY_ALIGNMENT = {
  name: "Amaravati Seed Access Core Expressway & Outer Ring Road (ORR) - Guntur Package",
  widthMeters: 60,
  centerline: [
    [16.5370, 80.5150],
    [16.5405, 80.5200],
    [16.5435, 80.5250],
    [16.5460, 80.5300],
    [16.5485, 80.5350]
  ],
  bufferPolygon: [
    [16.5378, 80.5145],
    [16.5413, 80.5195],
    [16.5443, 80.5245],
    [16.5468, 80.5295],
    [16.5493, 80.5345],
    [16.5477, 80.5355],
    [16.5452, 80.5305],
    [16.5427, 80.5255],
    [16.5397, 80.5205],
    [16.5362, 80.5155]
  ]
};

// =========================================================================
// 3. MAHARASHTRA (MH) CADASTRAL DATASET (Retained for Pan-India view)
// =========================================================================
const MH_CADASTRAL_PARCELS = [
  {
    id: "MH-PAR-142-1",
    stateCode: "MH",
    stateName: "Maharashtra",
    district: "Palghar",
    taluk: "Dahanu",
    village: "Kasa Khurd",
    surveyNo: "142/1",
    pattaNo: "7/12 Gat # 142",
    owner: "Kisan Ramji Vartha & Smt. Parvati Vartha",
    aadhaarLinked: true,
    totalAreaHa: 2.45,
    acquiredAreaHa: 1.82,
    landType: "Irrigated Agricultural (Jirayat Class I)",
    status: "possession",
    stageText: "Section 38 - Physical Possession Handed Over to NHAI",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹52,00,000",
    multiplier: "1.5x",
    baseComp: "₹1,41,96,000",
    solatium: "₹1,41,96,000",
    interest: "₹17,03,520",
    totalAward: "₹3,00,95,520",
    dbtStatus: "✅ Paid 100% via PFMS to SBI A/c ...4921",
    dbtDate: "14-Jan-2026",
    surveyDate: "03-Nov-2024",
    treesAssessed: "14 Teak, 6 Mango",
    structureVal: "1 Farm Borewell with Shed",
    polygon: [
      [19.9710, 72.9120],
      [19.9735, 72.9135],
      [19.9728, 72.9170],
      [19.9702, 72.9152]
    ]
  },
  {
    id: "MH-PAR-142-2",
    stateCode: "MH",
    stateName: "Maharashtra",
    district: "Palghar",
    taluk: "Dahanu",
    village: "Kasa Khurd",
    surveyNo: "142/2",
    pattaNo: "7/12 Gat # 143",
    owner: "Dhondu Somaji Mengal",
    aadhaarLinked: true,
    totalAreaHa: 1.35,
    acquiredAreaHa: 0.94,
    landType: "Single Crop Agricultural (Jirayat II)",
    status: "award",
    stageText: "Section 23 - Award Declared (DBT Queued)",
    statusBadge: "Award Declared",
    statusColor: "#f59e0b",
    guidelineValuePerHa: "₹48,00,000",
    multiplier: "1.5x",
    baseComp: "₹67,68,000",
    solatium: "₹67,68,000",
    interest: "₹8,12,160",
    totalAward: "₹1,43,48,160",
    dbtStatus: "⏳ PFMS Token Generated",
    dbtDate: "Expected 12-Sep-2026",
    surveyDate: "05-Nov-2024",
    treesAssessed: "4 Neem Trees",
    structureVal: "Nil",
    polygon: [
      [19.9735, 72.9135],
      [19.9760, 72.9150],
      [19.9752, 72.9185],
      [19.9728, 72.9170]
    ]
  }
];

const MH_EXPRESSWAY_ALIGNMENT = {
  name: "Delhi-Mumbai Expressway (NE-4) Package 17",
  widthMeters: 60,
  centerline: [
    [19.9660, 72.9100],
    [19.9695, 72.9150],
    [19.9725, 72.9200],
    [19.9750, 72.9250]
  ],
  bufferPolygon: [
    [19.9668, 72.9095],
    [19.9703, 72.9145],
    [19.9733, 72.9195],
    [19.9758, 72.9245],
    [19.9742, 72.9255],
    [19.9717, 72.9205],
    [19.9687, 72.9155],
    [19.9652, 72.9105]
  ]
};

// Ground Control Points for AP and TN
const AP_TN_SURVEY_GCPS = [
  { id: "GCP-TN-01", lat: 12.9920, lng: 79.9480, code: "TN-GCP-101", elev: "32.4m", type: "TNRDC Boundary Stone (Nemili)" },
  { id: "GCP-TN-02", lat: 12.9948, lng: 79.9495, code: "TN-GCP-102", elev: "33.1m", type: "DGPS Triangulation Benchmark" },
  { id: "GCP-TN-03", lat: 12.9965, lng: 79.9552, code: "TN-GCP-103", elev: "34.8m", type: "CPRR Centerline Control Peg" },
  { id: "GCP-AP-01", lat: 16.5410, lng: 80.5180, code: "AP-GCP-201", elev: "18.6m", type: "APCRDA Survey Benchmark (Mandadam)" },
  { id: "GCP-AP-02", lat: 16.5440, lng: 80.5200, code: "AP-GCP-202", elev: "19.2m", type: "Krishna Flood Bank Milestone" },
  { id: "GCP-AP-03", lat: 16.5430, lng: 80.5245, code: "AP-GCP-203", elev: "20.1m", type: "Seed Axis Road GCP #7" }
];

// Area calculation helper
function calculatePolygonAreaHa(coords) {
  let area = 0;
  for (let i = 0; i < coords.length; i++) {
    const j = (i + 1) % coords.length;
    area += coords[i][1] * coords[j][0] - coords[j][1] * coords[i][0];
  }
  area = Math.abs(area) * 0.5;
  const sqMeters = area * 110700 * 104600;
  return parseFloat((sqMeters / 10000).toFixed(2));
}

// =========================================================================
// 4. PAN-INDIA STATE MASTER DIRECTORY (ALL 28 STATES & 8 UNION TERRITORIES)
// =========================================================================
const PAN_INDIA_STATES = [
  { code: "TN", name: "Tamil Nadu", capital: "Chennai", zone: "South", lat: 11.1271, lng: 78.6569, zoom: 7, projects: 324, landHa: "18,420 Ha", compCr: "₹7,940 Cr", slaBreaches: 1, portal: "Tamil Nilam (e-Patta)", corridorKey: "TN" },
  { code: "AP", name: "Andhra Pradesh", capital: "Amaravati", zone: "South", lat: 15.9129, lng: 79.7400, zoom: 7, projects: 286, landHa: "16,840 Ha", compCr: "₹6,850 Cr", slaBreaches: 2, portal: "Meebhoomi / Webland 1B", corridorKey: "AP" },
  { code: "UP", name: "Uttar Pradesh", capital: "Lucknow", zone: "North", lat: 26.8467, lng: 80.9462, zoom: 7, projects: 412, landHa: "38,920 Ha", compCr: "₹18,450 Cr", slaBreaches: 3, portal: "UP Bhulekh (Khasra/Khatauni)", corridorKey: "UP" },
  { code: "MH", name: "Maharashtra", capital: "Mumbai", zone: "West", lat: 19.7515, lng: 75.7139, zoom: 7, projects: 388, landHa: "31,450 Ha", compCr: "₹15,220 Cr", slaBreaches: 2, portal: "MahaBhumi (7/12 Extract)", corridorKey: "MH" },
  { code: "KA", name: "Karnataka", capital: "Bengaluru", zone: "South", lat: 15.3173, lng: 75.7139, zoom: 7, projects: 264, landHa: "15,310 Ha", compCr: "₹8,430 Cr", slaBreaches: 1, portal: "Bhoomi (RTC / Pahani)", corridorKey: "KA" },
  { code: "GJ", name: "Gujarat", capital: "Gandhinagar", zone: "West", lat: 22.2587, lng: 71.1924, zoom: 7, projects: 298, landHa: "22,640 Ha", compCr: "₹11,600 Cr", slaBreaches: 1, portal: "AnyRoR (7/12 & 8A)", corridorKey: "GJ" },
  { code: "WB", name: "West Bengal", capital: "Kolkata", zone: "East", lat: 22.9868, lng: 87.8550, zoom: 7, projects: 194, landHa: "11,840 Ha", compCr: "₹5,890 Cr", slaBreaches: 4, portal: "BanglarBhumi (Khatian/Dag)", corridorKey: "WB" },
  { code: "OD", name: "Odisha", capital: "Bhubaneswar", zone: "East", lat: 20.9517, lng: 85.0985, zoom: 7, projects: 178, landHa: "14,210 Ha", compCr: "₹4,950 Cr", slaBreaches: 1, portal: "Bhulekh Odisha (RoR)", corridorKey: "OD" },
  { code: "MP", name: "Madhya Pradesh", capital: "Bhopal", zone: "Central", lat: 22.9734, lng: 78.6569, zoom: 7, projects: 245, landHa: "26,180 Ha", compCr: "₹9,120 Cr", slaBreaches: 2, portal: "MP Bhulekh", corridorKey: "MP" },
  { code: "RJ", name: "Rajasthan", capital: "Jaipur", zone: "North", lat: 27.0238, lng: 74.2179, zoom: 7, projects: 231, landHa: "29,450 Ha", compCr: "₹8,760 Cr", slaBreaches: 2, portal: "Apna Khata (Jamabandi)", corridorKey: "RJ" },
  { code: "BR", name: "Bihar", capital: "Patna", zone: "East", lat: 25.0961, lng: 85.3131, zoom: 7, projects: 168, landHa: "9,820 Ha", compCr: "₹4,320 Cr", slaBreaches: 5, portal: "Bihar Bhumi (Dakhil Kharij)", corridorKey: "BR" },
  { code: "TS", name: "Telangana", capital: "Hyderabad", zone: "South", lat: 18.1124, lng: 79.0193, zoom: 7, projects: 215, landHa: "12,940 Ha", compCr: "₹6,230 Cr", slaBreaches: 1, portal: "Dharani Portal", corridorKey: "TS" },
  { code: "KL", name: "Kerala", capital: "Thiruvananthapuram", zone: "South", lat: 10.8505, lng: 76.2711, zoom: 7, projects: 142, landHa: "4,620 Ha", compCr: "₹6,890 Cr", slaBreaches: 3, portal: "e-Rekha (Thandapper)", corridorKey: "KL" },
  { code: "PB", name: "Punjab", capital: "Chandigarh", zone: "North", lat: 31.1471, lng: 75.3412, zoom: 7, projects: 128, landHa: "11,240 Ha", compCr: "₹6,150 Cr", slaBreaches: 2, portal: "PLRS (Fard Jamabandi)", corridorKey: "PB" },
  { code: "HR", name: "Haryana", capital: "Chandigarh", zone: "North", lat: 29.0588, lng: 76.0856, zoom: 7, projects: 156, landHa: "14,890 Ha", compCr: "₹9,430 Cr", slaBreaches: 1, portal: "Jamabandi Haryana", corridorKey: "HR" },
  { code: "AS", name: "Assam", capital: "Dispur", zone: "North-East", lat: 26.2006, lng: 92.9376, zoom: 7, projects: 112, landHa: "8,940 Ha", compCr: "₹3,180 Cr", slaBreaches: 1, portal: "Dharitree (ILRMS)", corridorKey: "AS" },
  { code: "JH", name: "Jharkhand", capital: "Ranchi", zone: "East", lat: 23.6102, lng: 85.2799, zoom: 7, projects: 134, landHa: "10,450 Ha", compCr: "₹3,920 Cr", slaBreaches: 2, portal: "Jharbhoomi", corridorKey: "JH" },
  { code: "CG", name: "Chhattisgarh", capital: "Raipur", zone: "Central", lat: 21.2787, lng: 81.8661, zoom: 7, projects: 148, landHa: "13,620 Ha", compCr: "₹4,150 Cr", slaBreaches: 1, portal: "Bhuiyan (Khasra)", corridorKey: "CG" },
  { code: "UK", name: "Uttarakhand", capital: "Dehradun", zone: "North", lat: 30.0668, lng: 79.0193, zoom: 7, projects: 88, landHa: "3,890 Ha", compCr: "₹2,450 Cr", slaBreaches: 0, portal: "Bhulekh Uttarakhand", corridorKey: "UK" },
  { code: "HP", name: "Himachal Pradesh", capital: "Shimla", zone: "North", lat: 31.1048, lng: 77.1734, zoom: 7, projects: 76, landHa: "2,940 Ha", compCr: "₹2,180 Cr", slaBreaches: 1, portal: "Himbhoomi", corridorKey: "HP" },
  { code: "GA", name: "Goa", capital: "Panaji", zone: "West", lat: 15.2993, lng: 74.1240, zoom: 8, projects: 42, landHa: "1,120 Ha", compCr: "₹1,420 Cr", slaBreaches: 0, portal: "Dharani Goa (Form I & XIV)", corridorKey: "GA" },
  { code: "TR", name: "Tripura", capital: "Agartala", zone: "North-East", lat: 23.9408, lng: 91.9882, zoom: 8, projects: 38, landHa: "1,450 Ha", compCr: "₹620 Cr", slaBreaches: 0, portal: "Jami Tripura", corridorKey: "TR" },
  { code: "ML", name: "Meghalaya", capital: "Shillong", zone: "North-East", lat: 25.4670, lng: 91.3662, zoom: 8, projects: 34, landHa: "1,280 Ha", compCr: "₹540 Cr", slaBreaches: 0, portal: "Meghalaya Land Records", corridorKey: "ML" },
  { code: "MN", name: "Manipur", capital: "Imphal", zone: "North-East", lat: 24.6637, lng: 93.9063, zoom: 8, projects: 29, landHa: "980 Ha", compCr: "₹410 Cr", slaBreaches: 1, portal: "Louchapathap", corridorKey: "MN" },
  { code: "NL", name: "Nagaland", capital: "Kohima", zone: "North-East", lat: 26.1584, lng: 94.5624, zoom: 8, projects: 26, landHa: "840 Ha", compCr: "₹380 Cr", slaBreaches: 0, portal: "Nagaland Land Admin", corridorKey: "NL" },
  { code: "MZ", name: "Mizoram", capital: "Aizawl", zone: "North-East", lat: 23.1645, lng: 92.9376, zoom: 8, projects: 24, landHa: "760 Ha", compCr: "₹320 Cr", slaBreaches: 0, portal: "Mizoram Land Revenue", corridorKey: "MZ" },
  { code: "AR", name: "Arunachal Pradesh", capital: "Itanagar", zone: "North-East", lat: 28.2180, lng: 94.7278, zoom: 7, projects: 45, landHa: "2,350 Ha", compCr: "₹1,120 Cr", slaBreaches: 1, portal: "Arunachal Land Portal", corridorKey: "AR" },
  { code: "SK", name: "Sikkim", capital: "Gangtok", zone: "North-East", lat: 27.5330, lng: 88.5122, zoom: 8, projects: 22, landHa: "620 Ha", compCr: "₹480 Cr", slaBreaches: 0, portal: "Sikkim Land Records", corridorKey: "SK" },
  // Union Territories
  { code: "DL", name: "Delhi (NCT)", capital: "New Delhi", zone: "North", lat: 28.6139, lng: 77.2090, zoom: 9, projects: 68, landHa: "2,450 Ha", compCr: "₹7,250 Cr", slaBreaches: 0, portal: "Delhi Bhulekh (Indraprastha)", corridorKey: "DL" },
  { code: "JK", name: "Jammu & Kashmir", capital: "Srinagar / Jammu", zone: "North", lat: 33.7782, lng: 76.5762, zoom: 7, projects: 84, landHa: "4,820 Ha", compCr: "₹3,450 Cr", slaBreaches: 1, portal: "Apki Zameen Apki Nigrani", corridorKey: "JK" },
  { code: "LA", name: "Ladakh", capital: "Leh", zone: "North", lat: 34.1526, lng: 77.5771, zoom: 7, projects: 28, landHa: "3,120 Ha", compCr: "₹890 Cr", slaBreaches: 0, portal: "Ladakh Revenue Portal", corridorKey: "LA" },
  { code: "CH", name: "Chandigarh", capital: "Chandigarh", zone: "North", lat: 30.7333, lng: 76.7794, zoom: 11, projects: 14, landHa: "310 Ha", compCr: "₹920 Cr", slaBreaches: 0, portal: "Chandigarh Land Portal", corridorKey: "CH" },
  { code: "PY", name: "Puducherry", capital: "Puducherry", zone: "South", lat: 11.9416, lng: 79.8083, zoom: 10, projects: 18, landHa: "420 Ha", compCr: "₹380 Cr", slaBreaches: 0, portal: "Nilamagal Puducherry", corridorKey: "PY" },
  { code: "AN", name: "Andaman & Nicobar", capital: "Port Blair", zone: "South", lat: 11.7401, lng: 92.6586, zoom: 8, projects: 16, landHa: "540 Ha", compCr: "₹290 Cr", slaBreaches: 0, portal: "A&N Islands Revenue", corridorKey: "AN" },
  { code: "DN", name: "Dadra, Nagar Haveli & Daman & Diu", capital: "Daman", zone: "West", lat: 20.4283, lng: 72.8397, zoom: 9, projects: 19, landHa: "480 Ha", compCr: "₹450 Cr", slaBreaches: 0, portal: "Daman & Diu Bhulekh", corridorKey: "DN" },
  { code: "LD", name: "Lakshadweep", capital: "Kavaratti", zone: "South", lat: 10.5667, lng: 72.6417, zoom: 9, projects: 8, landHa: "95 Ha", compCr: "₹110 Cr", slaBreaches: 0, portal: "Lakshadweep Land Desk", corridorKey: "LD" }
];

// =========================================================================
// 5. UTTAR PRADESH (UP) CADASTRAL DATASET: GANGA EXPRESSWAY & JEWAR AIRPORT
// Location: Jewar / Gautam Buddha Nagar & Bulandshahr Corridor, UP
// Terminology: Khasra No, Khatauni No, Fasli Year, Pukhta Bigha, Gata No
// =========================================================================
const UP_CADASTRAL_PARCELS = [
  {
    id: "UP-PAR-842-1",
    stateCode: "UP",
    stateName: "Uttar Pradesh",
    district: "Gautam Buddha Nagar",
    taluk: "Jewar",
    village: "Ranhera (Noida Airport Corridor)",
    surveyNo: "Khasra #842/1",
    pattaNo: "Khatauni #00184",
    owner: "Chaudhary Virender Singh & Sukhbir Singh",
    aadhaarLinked: true,
    totalAreaHa: 2.80,
    acquiredAreaHa: 2.10,
    landType: "Irrigated Agricultural (Nahar Sinchit - Tube Well)",
    status: "possession",
    stageText: "Section 38 - Physical Possession Handed Over to YEDA / Noida International Airport",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹72,00,000",
    multiplier: "2.0x (Rural Distance Factor)",
    baseComp: "₹3,02,40,000",
    solatium: "₹3,02,40,000 (100% Solatium Sec 30(1))",
    interest: "₹36,28,800 (12% Sec 30(3))",
    totalAward: "₹6,41,08,800",
    dbtStatus: "✅ 100% Disbursed via PFMS to PNB Jewar Branch A/c ...7741",
    dbtDate: "05-Jan-2026",
    surveyDate: "20-Oct-2024",
    treesAssessed: "22 Sheesham, 8 Jamun Trees (Valued ₹3,80,000)",
    structureVal: "Borewell & Tubewell Room (Valued ₹2,10,000)",
    polygon: [
      [28.1620, 77.5680],
      [28.1652, 77.5700],
      [28.1640, 77.5742],
      [28.1608, 77.5720]
    ]
  },
  {
    id: "UP-PAR-843-2",
    stateCode: "UP",
    stateName: "Uttar Pradesh",
    district: "Gautam Buddha Nagar",
    taluk: "Jewar",
    village: "Ranhera",
    surveyNo: "Khasra #843/2",
    pattaNo: "Khatauni #00185",
    owner: "Smt. Shanti Devi & Rajesh Kumar Sharma",
    aadhaarLinked: true,
    totalAreaHa: 1.65,
    acquiredAreaHa: 1.25,
    landType: "Fertile Double-Crop (Do-Fasli Wheat/Paddy)",
    status: "award",
    stageText: "Section 23 - Award Declared (PFMS Token Queued)",
    statusBadge: "Award Declared",
    statusColor: "#f59e0b",
    guidelineValuePerHa: "₹72,00,000",
    multiplier: "2.0x",
    baseComp: "₹1,80,00,000",
    solatium: "₹1,80,00,000",
    interest: "₹21,60,000",
    totalAward: "₹3,81,60,000",
    dbtStatus: "⏳ PFMS DBT Batch #UP-JWR-843 Scheduled for Credit",
    dbtDate: "Expected 14-Sep-2026",
    surveyDate: "24-Oct-2024",
    treesAssessed: "12 Guava Trees, 4 Neem Trees",
    structureVal: "Cattle Shed with Tin Roof",
    polygon: [
      [28.1652, 77.5700],
      [28.1684, 77.5720],
      [28.1672, 77.5760],
      [28.1640, 77.5742]
    ]
  }
];

const UP_EXPRESSWAY_ALIGNMENT = {
  name: "Ganga Expressway & Jewar International Airport Link",
  widthMeters: 60,
  centerline: [
    [28.1580, 77.5640],
    [28.1630, 77.5700],
    [28.1670, 77.5750],
    [28.1710, 77.5800]
  ],
  bufferPolygon: [
    [28.1588, 77.5635],
    [28.1638, 77.5695],
    [28.1678, 77.5745],
    [28.1718, 77.5795],
    [28.1702, 77.5805],
    [28.1662, 77.5755],
    [28.1622, 77.5705],
    [28.1572, 77.5645]
  ]
};

// =========================================================================
// 6. KARNATAKA (KA) CADASTRAL DATASET: BENGALURU SATELLITE TOWN RING ROAD (STRR)
// Location: Hoskote & Doddaballapur Corridor, Bengaluru Rural, Karnataka
// Terminology: Survey No, Hissa No, RTC / Pahani (Bhoomi), Bagayat, Kushki
// =========================================================================
const KA_CADASTRAL_PARCELS = [
  {
    id: "KA-PAR-58-1",
    stateCode: "KA",
    stateName: "Karnataka",
    district: "Bengaluru Rural",
    taluk: "Hoskote",
    village: "Devanahalli Border (Kollur)",
    surveyNo: "Sy #58/1",
    pattaNo: "RTC Pahani #882",
    owner: "B. M. Muniyappa & M. Narayanaswamy",
    aadhaarLinked: true,
    totalAreaHa: 2.10,
    acquiredAreaHa: 1.60,
    landType: "Bagayat (Irrigated Horticulture - Mulberry/Eucalyptus)",
    status: "possession",
    stageText: "Section 38 - Possession Handed Over to NHAI (STRR NH-948A)",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹85,00,000",
    multiplier: "1.5x",
    baseComp: "₹2,04,00,000",
    solatium: "₹2,04,00,000 (100% Solatium Sec 30(1))",
    interest: "₹24,48,000",
    totalAward: "₹4,32,48,000",
    dbtStatus: "✅ Paid 100% via K2 IFMIS / PFMS to Canara Bank Hoskote",
    dbtDate: "18-Jan-2026",
    surveyDate: "12-Nov-2024",
    treesAssessed: "45 Mulberry Shrubs, 16 Silver Oak",
    structureVal: "Drip Irrigation Pump House",
    polygon: [
      [13.0820, 77.7850],
      [13.0850, 77.7870],
      [13.0840, 77.7915],
      [13.0810, 77.7895]
    ]
  },
  {
    id: "KA-PAR-58-2",
    stateCode: "KA",
    stateName: "Karnataka",
    district: "Bengaluru Rural",
    taluk: "Hoskote",
    village: "Kollur",
    surveyNo: "Sy #58/2",
    pattaNo: "RTC Pahani #883",
    owner: "C. Venkatesh Reddy & Smt. V. Lakshmi",
    aadhaarLinked: true,
    totalAreaHa: 1.75,
    acquiredAreaHa: 1.30,
    landType: "Kushki (Dry Agricultural Ragi Land)",
    status: "award",
    stageText: "Section 23 - Award Declared by Special DC (LA)",
    statusBadge: "Award Declared",
    statusColor: "#f59e0b",
    guidelineValuePerHa: "₹85,00,000",
    multiplier: "1.5x",
    baseComp: "₹1,65,75,000",
    solatium: "₹1,65,75,000",
    interest: "₹19,89,000",
    totalAward: "₹3,51,39,000",
    dbtStatus: "⏳ Treasury Token Assigned",
    dbtDate: "Expected 15-Sep-2026",
    surveyDate: "15-Nov-2024",
    treesAssessed: "8 Tamarind Trees, 6 Coconut Palms",
    structureVal: "Nil",
    polygon: [
      [13.0850, 77.7870],
      [13.0880, 77.7890],
      [13.0870, 77.7935],
      [13.0840, 77.7915]
    ]
  }
];

const KA_EXPRESSWAY_ALIGNMENT = {
  name: "Bengaluru Satellite Town Ring Road (STRR NH-948A)",
  widthMeters: 60,
  centerline: [
    [13.0780, 77.7810],
    [13.0830, 77.7880],
    [13.0870, 77.7930],
    [13.0910, 77.7980]
  ],
  bufferPolygon: [
    [13.0788, 77.7805],
    [13.0838, 77.7875],
    [13.0878, 77.7925],
    [13.0918, 77.7975],
    [13.0902, 77.7985],
    [13.0862, 77.7935],
    [13.0822, 77.7885],
    [13.0772, 77.7815]
  ]
};

// =========================================================================
// 7. GUJARAT (GJ) CADASTRAL DATASET: DHOLERA SIR & EXPRESSWAY
// Location: Dholera Special Investment Region & Ahmedabad-Dholera Expressway
// Terminology: Survey / Block No, Khata No, AnyRoR 7/12 & 8A, Jirayat, Bagayat
// =========================================================================
const GJ_CADASTRAL_PARCELS = [
  {
    id: "GJ-PAR-312-1",
    stateCode: "GJ",
    stateName: "Gujarat",
    district: "Ahmedabad",
    taluk: "Dholera",
    village: "Bhimtalav (Dholera SIR Activation Zone)",
    surveyNo: "Block #312/1",
    pattaNo: "Khata #412 (AnyRoR)",
    owner: "Patel Ramanbhai Ishwarbhai & Sons",
    aadhaarLinked: true,
    totalAreaHa: 3.20,
    acquiredAreaHa: 2.50,
    landType: "Jirayat Class I (Cotton / Cumin Farming)",
    status: "possession",
    stageText: "Section 38 - Final Possession to DICDL (Dholera Industrial City)",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹45,00,000",
    multiplier: "1.5x",
    baseComp: "₹1,68,75,000",
    solatium: "₹1,68,75,000",
    interest: "₹20,25,000",
    totalAward: "₹3,57,75,000",
    dbtStatus: "✅ Disbursed via PFMS / Gujarat State Treasury to Bank of Baroda",
    dbtDate: "22-Dec-2025",
    surveyDate: "10-Oct-2024",
    treesAssessed: "15 Prosopis, 6 Neem",
    structureVal: "Farm Tubewell",
    polygon: [
      [22.2420, 72.1880],
      [22.2455, 72.1905],
      [22.2442, 72.1950],
      [22.2407, 72.1925]
    ]
  }
];

const GJ_EXPRESSWAY_ALIGNMENT = {
  name: "Ahmedabad-Dholera Expressway (NE-5) Corridor",
  widthMeters: 60,
  centerline: [
    [22.2380, 72.1840],
    [22.2430, 72.1910],
    [22.2470, 72.1970],
    [22.2510, 72.2030]
  ],
  bufferPolygon: [
    [22.2388, 72.1835],
    [22.2438, 72.1905],
    [22.2478, 72.1965],
    [22.2518, 72.2025],
    [22.2502, 72.2035],
    [22.2462, 72.1975],
    [22.2422, 72.1915],
    [22.2372, 72.1845]
  ]
};

// =========================================================================
// 8. WEST BENGAL (WB) CADASTRAL DATASET: EASTERN FREIGHT & KOLKATA HIGHWAY
// Location: Dankuni - Durgapur Industrial Corridor, West Bengal
// Terminology: Mouza, Khatian No, Dag No, Sali (Agricultural), Bastu (Homestead)
// =========================================================================
const WB_CADASTRAL_PARCELS = [
  {
    id: "WB-PAR-412-1",
    stateCode: "WB",
    stateName: "West Bengal",
    district: "Hooghly",
    taluk: "Dankuni",
    village: "Mouza Chamrail (BanglarBhumi)",
    surveyNo: "Dag #412",
    pattaNo: "Khatian #624",
    owner: "Subhash Chandra Ghosh & Anirban Ghosh",
    aadhaarLinked: true,
    totalAreaHa: 1.85,
    acquiredAreaHa: 1.40,
    landType: "Sali (Fertile Aman Paddy Agricultural Land)",
    status: "possession",
    stageText: "Section 38 - Civil Handover to Dedicated Freight Corridor (DFCCIL)",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹62,00,000",
    multiplier: "1.5x",
    baseComp: "₹1,30,20,000",
    solatium: "₹1,30,20,000",
    interest: "₹15,62,400",
    totalAward: "₹2,76,02,400",
    dbtStatus: "✅ Paid 100% via PFMS to UCO Bank Dankuni Branch",
    dbtDate: "08-Jan-2026",
    surveyDate: "18-Nov-2024",
    treesAssessed: "8 Mango, 4 Betel Nut Palms",
    structureVal: "Concrete Boundary Pillar & Pump",
    polygon: [
      [22.6820, 88.2850],
      [22.6850, 88.2872],
      [22.6840, 88.2915],
      [22.6810, 88.2893]
    ]
  }
];

const WB_EXPRESSWAY_ALIGNMENT = {
  name: "Eastern Dedicated Freight Corridor (EDFC Dankuni Terminal)",
  widthMeters: 60,
  centerline: [
    [22.6780, 88.2810],
    [22.6830, 88.2880],
    [22.6870, 88.2930],
    [22.6910, 88.2980]
  ],
  bufferPolygon: [
    [22.6788, 88.2805],
    [22.6838, 88.2875],
    [22.6878, 88.2925],
    [22.6918, 88.2975],
    [22.6902, 88.2985],
    [22.6862, 88.2935],
    [22.6822, 88.2885],
    [22.6772, 88.2815]
  ]
};

// =========================================================================
// 9. ASSAM & NORTH-EAST (AS) CADASTRAL DATASET: GUWAHATI RING ROAD
// Location: Kamrup Metro / Guwahati Bypass & Brahmaputra Corridor
// Terminology: Mouza, Patta No, Dag No (Dharitree), Myadi Patta, Faringati
// =========================================================================
const AS_CADASTRAL_PARCELS = [
  {
    id: "AS-PAR-105-1",
    stateCode: "AS",
    stateName: "Assam",
    district: "Kamrup Metro",
    taluk: "Azara",
    village: "Dharapur (Guwahati Ring Road)",
    surveyNo: "Dag #105/1",
    pattaNo: "Periodic Myadi Patta #312",
    owner: "Bhaben Kalita & Mukul Hazarika",
    aadhaarLinked: true,
    totalAreaHa: 1.50,
    acquiredAreaHa: 1.15,
    landType: "Sali Paddy Agricultural / Tea Border",
    status: "possession",
    stageText: "Section 38 - Possession Handed to NHIDCL",
    statusBadge: "Possession Complete",
    statusColor: "#22c55e",
    guidelineValuePerHa: "₹42,00,000",
    multiplier: "1.5x",
    baseComp: "₹72,45,000",
    solatium: "₹72,45,000",
    interest: "₹8,69,400",
    totalAward: "₹1,53,59,400",
    dbtStatus: "✅ Paid 100% via PFMS to Assam Gramin Vikash Bank",
    dbtDate: "14-Feb-2026",
    surveyDate: "20-Dec-2024",
    treesAssessed: "12 Areca Nut Palms, 4 Bamboo Clumps",
    structureVal: "Nil",
    polygon: [
      [26.1220, 91.6180],
      [26.1250, 91.6205],
      [26.1240, 91.6250],
      [26.1210, 91.6225]
    ]
  }
];

const AS_EXPRESSWAY_ALIGNMENT = {
  name: "Guwahati Ring Road & Brahmaputra Link (NHIDCL)",
  widthMeters: 60,
  centerline: [
    [26.1180, 91.6140],
    [26.1230, 91.6210],
    [26.1270, 91.6270],
    [26.1310, 91.6330]
  ],
  bufferPolygon: [
    [26.1188, 91.6135],
    [26.1238, 91.6205],
    [26.1278, 91.6265],
    [26.1318, 91.6325],
    [26.1302, 91.6335],
    [26.1262, 91.6275],
    [26.1222, 91.6215],
    [26.1172, 91.6145]
  ]
};

// Unified Master Collection of all Cadastral Parcels across India
const ALL_INDIA_CADASTRAL_PARCELS = [
  ...TN_CADASTRAL_PARCELS,
  ...AP_CADASTRAL_PARCELS,
  ...MH_CADASTRAL_PARCELS,
  ...UP_CADASTRAL_PARCELS,
  ...KA_CADASTRAL_PARCELS,
  ...GJ_CADASTRAL_PARCELS,
  ...WB_CADASTRAL_PARCELS,
  ...AS_CADASTRAL_PARCELS
];

