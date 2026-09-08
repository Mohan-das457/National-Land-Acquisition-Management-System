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
