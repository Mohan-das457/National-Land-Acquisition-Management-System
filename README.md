# 🏛️ NLAMS — National Land Acquisition & Management System
### PRITHVI-SETU 360 · Smart India Hackathon 2026 · Problem Statement #26016

[![SIH 2026](https://img.shields.io/badge/SIH-2026%20Finalist-ff9900?style=flat-square&logo=data:image/svg+xml;base64,)](https://www.sih.gov.in/)
[![Node.js](https://img.shields.io/badge/Node.js-v26-green?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-13%20Passed-success?style=flat-square)]()

> **SANDBOX / HACKATHON PROTOTYPE — NOT PRODUCTION GOVERNMENT SOFTWARE.**
> All land records, compensation figures, Aadhaar references, survey numbers, and officer names in this codebase are **fully synthetic, anonymised demo data** generated for SIH 2026 evaluation. They do not represent real government records, real people, or real land acquisitions.

---

## 📋 Table of Contents

- [Problem Statement & Solution](#-problem-statement--solution)
- [Architecture Overview](#-architecture-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started (macOS)](#-getting-started-macos)
- [Demo Credentials](#-demo-credentials)
- [API Reference](#-api-reference)
- [Test Suite](#-test-suite)
- [Feature Matrix](#-feature-matrix)
- [RFCTLARR Act 2013 Compliance](#-rfctlarr-act-2013-compliance)
- [Security Model](#-security-model)
- [Project Structure](#-project-structure)
- [Hackathon Context](#-hackathon-context)

---

## 🎯 Problem Statement & Solution

**PS #26016 — National Land Acquisition Management System**
Ministry: Ministry of Land Resources (DoLR), Government of India

| Pain Point | NLAMS Solution |
|---|---|
| No single digital register for notified acquisition parcels | Unified cadastral parcel DB (SQLite / MySQL adaptive engine) |
| Manual, paper-based award calculations prone to error | `rfctlarrCalculator.js` — First Schedule statutory math with 100% Solatium & 12% p.a. interest |
| Citizens unaware of acquisition affecting their land | Public Khasra/Survey number self-check portal on homepage |
| No enforceable Section 25 deadline tracking | Live countdown radar and `deadlineService.js` for statutory 12-month proviso |
| Compensation disbursements without audit trail | ACID PFMS DBT sandbox adapter with immutable `audit_logs` table |
| No role-based jurisdiction enforcement | Server-side RBAC: Central / State / CALA / Surveyor / Citizen with JWT httpOnly cookies |

This prototype is part of **PRITHVI-SETU 360** — a triple-problem-statement command suite that also addresses:
- 🌾 **Kisan-Setu** (SIH #26033) — Farmer D2C agri market linkage
- ⛰️ **Drishti-NER** (SIH #26049) — NER landslide early warning with IoT sensors

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Browser (HTML + JS)                           │
│  index.html · login.html · dashboard.html · projects.html          │
│  gis-map.html · workflow.html · compensation.html · documents.html  │
│  reports.html · farmer-d2c.html · landslide-ner.html               │
│                   └── shared-auth.js (API client layer)             │
└─────────────────────┬───────────────────────────────────────────────┘
                      │ HTTP (JWT Bearer / httpOnly Cookie)
┌─────────────────────▼───────────────────────────────────────────────┐
│                   Express.js API  :8000                             │
│  /api/v1 ── auth · projects · parcels · workflow                   │
│           ── compensation · signatures · documents                  │
│           ── citizen · deadlines · /health                         │
│                                                                     │
│  Middleware: auth.js · rbac.js · audit.js · errorHandler.js        │
│  Services: rfctlarrCalculator · signingAdapter · paymentAdapter     │
│            deadlineService                                          │
│  Swagger docs: /api/docs                                            │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
          ┌───────────▼────────────┐
          │  Adaptive DB Engine    │
          │  MySQL2 (primary)      │
          │     ↓ fallback         │
          │  better-sqlite3 (local)│
          │  ./storage/nlams.sqlite│
          └────────────────────────┘
```

Static frontend is served by the same Express server from the project root directory.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v26 (LTS) |
| Framework | Express.js 4.x |
| Primary DB | MySQL 8.x (via `mysql2`) |
| Fallback DB | SQLite (via `better-sqlite3`) — zero-config offline mode |
| Auth | JWT (HS256) + httpOnly cookies + bcryptjs password hashing |
| File uploads | `multer` — SHA-256 checksums for document vault integrity |
| Rate limiting | `express-rate-limit` — 100 req / 15 min on auth endpoints |
| Security headers | `helmet` |
| API docs | Swagger UI (`swagger-ui-express`) at `/api/docs` |
| Testing | Jest + Supertest (13 tests, 5 suites) |
| Dev server | `nodemon` |
| GIS/Maps | Leaflet.js 1.9.4 + Cadastral GeoJSON layers |
| Charts | Chart.js 4.4 |
| Fonts | Inter + Rajdhani (Google Fonts) |

---

## 🚀 Getting Started (macOS)

### Prerequisites

- **Node.js v18+** (tested on v26.7.0) — `node -v`
- **npm** — bundled with Node.js
- **MySQL 8** *(optional)* — install via Homebrew: `brew install mysql`
  - If MySQL credentials are not configured, the app automatically falls back to a local SQLite file. No configuration needed for demo.

### 1. Clone & Install

```bash
git clone https://github.com/Mohan-das457/National-Land-Acquisition-Management-System.git
cd National-Land-Acquisition-Management-System

# Switch to the upgraded full-stack branch
git checkout feature/fullstack-nlams-upgrade

npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env only if you want to use MySQL (see .env.example for fields)
# For demo / offline use, no changes needed — SQLite auto-activates
```

### 3. Start the Server

```bash
npm start
# → Server starts at http://localhost:8000
# → Swagger API docs at http://localhost:8000/api/docs
# → Frontend portal at http://localhost:8000
```

On first run, the server auto-migrates the schema and seeds the demo dataset (CPRR Tamil Nadu + Amaravati Andhra Pradesh corridors, 15 parcels, 5 users, compensation cases, statutory deadlines).

### 4. Development Mode (hot-reload)

```bash
npm run dev
```

### 5. Open the App

| URL | Description |
|---|---|
| `http://localhost:8000` | Public portal (citizen Khasra search, role gateway) |
| `http://localhost:8000/login.html` | Glassmorphic login page (JWT sessions) |
| `http://localhost:8000/dashboard.html` | Donezo-design executive dashboard |
| `http://localhost:8000/gis-map.html` | Tri-layer GIS map (CPRR + Amaravati + NER) |
| `http://localhost:8000/projects.html` | Project pipeline (API-synced) |
| `http://localhost:8000/compensation.html` | RFCTLARR award calculator + PFMS DBT |
| `http://localhost:8000/workflow.html` | 6-stage workflow + digital signature |
| `http://localhost:8000/documents.html` | Document vault (SHA-256 integrity) |
| `http://localhost:8000/reports.html` | MIS reports + live API stats |
| `http://localhost:8000/api/docs` | Interactive Swagger API documentation |
| `http://localhost:8000/api/v1/health` | Health check endpoint |

---

## 🔑 Demo Credentials

All passwords: **`Password@123`**

> These accounts are seeded automatically from `src/db/seed.js`. They are synthetic personas for SIH 2026 evaluation only.

| Role | Email | Jurisdiction |
|---|---|---|
| **Central Ministry** (DoLR Secretary) | `ramesh.kumar@dolr.gov.in` | All-India |
| **State Officer** (TN Revenue Secretary) | `anita.sharma@tn.gov.in` | Tamil Nadu |
| **District CALA** (Tiruvallur Collector) | `dr.alby.john@tiruvallur.tn.gov.in` | Tiruvallur District |
| **Surveyor** | `k.muthukumar@survey.tn.gov.in` | Sriperumbudur Taluk |
| **Citizen / Landowner** | `ramu.gowda@gmail.com` | Public self-check only |

---

## 📡 API Reference

Interactive Swagger documentation is available at **`http://localhost:8000/api/docs`** once the server is running.

### Base URL
```
http://localhost:8000/api/v1
```

### Key Endpoints

#### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Login with email + password → JWT token |
| `POST` | `/auth/logout` | Invalidate session |
| `GET` | `/auth/me` | Current user profile |
| `POST` | `/auth/refresh` | Refresh JWT token |

#### Projects
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/projects` | List projects (jurisdiction-filtered by role) |
| `POST` | `/projects` | Create new project (CALA/Central only) |
| `GET` | `/projects/:id` | Project detail with parcels + deadlines + workflow |
| `GET` | `/projects/stats` | Dashboard KPI aggregates |

#### Cadastral Parcels (GIS)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/parcels` | List parcels (filter: `stateCode`, `district`, `village`, `search`) |
| `GET` | `/parcels?geojson=true` | GeoJSON FeatureCollection for Leaflet layers |
| `GET` | `/parcels/:id` | Parcel detail with compensation case + objections |

#### Workflow
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/workflow/pipeline/:projectId` | Full 6-stage pipeline status |
| `POST` | `/workflow/transition` | Advance to next stage (role-gated) |
| `GET` | `/workflow/approvals/pending` | Pending approvals for current user |

#### Compensation
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/compensation/calculate` | RFCTLARR First Schedule award calculation |
| `GET` | `/compensation/cases` | List compensation cases |
| `POST` | `/compensation/disburse` | PFMS DBT sandbox disbursement (ACID) |

#### Signatures
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signatures/sign` | DSC sign a workflow stage (SHA-256 payload integrity) |

#### Documents
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/documents/upload` | Upload document to vault (SHA-256 checksum) |
| `GET` | `/documents/vault` | List vault documents |

#### Citizen Portal (Public)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/citizen/khasra-search` | Public Khasra/Survey number lookup (no Aadhaar/bank exposed) |
| `POST` | `/citizen/objection` | Submit RFCTLARR Section 15 objection petition |
| `GET` | `/citizen/objection/:id` | Track objection status |

#### Statutory Deadlines
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/deadlines` | List all statutory deadlines with countdown |
| `POST` | `/deadlines/extend` | Apply Section 25 proviso extension |

---

## 🧪 Test Suite

```bash
npm test
```

Expected output:
```
Test Suites: 5 passed, 5 total
Tests:       13 passed, 13 total
Time:        ~1.4s
```

| Suite | Tests | Coverage |
|---|---|---|
| `auth.test.js` | 4 | Login, wrong password, /me, unauthorized access |
| `workflow.test.js` | 3 | Pipeline fetch, stage-skip prevention, role RBAC |
| `compensation.test.js` | 2 | RFCTLARR math, duplicate payment prevention |
| `deadlines.test.js` | 2 | Countdown radar listing, Section 25 proviso extension |
| `documents.test.js` | 2 | Vault listing, SHA-256 upload checksum verification |

Tests use the SQLite adaptive engine automatically (no MySQL required).

---

## 📊 Feature Matrix

| Feature | Status | Notes |
|---|---|---|
| Multi-role authentication (JWT) | ✅ Complete | 5 roles, httpOnly cookies |
| RBAC jurisdiction enforcement | ✅ Complete | Server-side; no localStorage auth |
| Project creation & management | ✅ Complete | API-backed with fallback UI |
| 6-stage workflow pipeline | ✅ Complete | Stage-skip prevention enforced |
| RFCTLARR First Schedule calculator | ✅ Complete | Solatium, interest, market multipliers |
| PFMS DBT sandbox disbursement | ✅ Complete | ACID, duplicate prevention |
| Digital signature adapter (DSC) | ✅ Complete | SHA-256 payload integrity |
| Document vault (SHA-256) | ✅ Complete | multer + checksum verification |
| Section 25 statutory countdown | ✅ Complete | 12-month proviso engine |
| Cadastral GIS map (Leaflet) | ✅ Complete | CPRR TN + Amaravati AP + 36 states |
| GeoJSON / CSV export | ✅ Complete | API-backed + offline fallback |
| KML / Shapefile export | ✅ Demo | Alert placeholder (real file gen TBD) |
| Citizen Khasra self-check | ✅ Complete | Privacy-by-design, no Aadhaar exposure |
| Objection petition (Sec 15) | ✅ Complete | API-backed submission + status tracking |
| Immutable audit logs | ✅ Complete | All state changes logged |
| Swagger API docs | ✅ Complete | `/api/docs` |
| Automated test suite | ✅ Complete | 13/13 passing |
| MySQL + SQLite adaptive engine | ✅ Complete | Zero-config SQLite fallback |
| Kisan-Setu Farmer D2C | ✅ Complete | Separate module (SIH #26033) |
| Drishti-NER Landslide AI | ✅ Complete | Separate module (SIH #26049) |
| README & documentation | ✅ Complete | This file |

---

## ⚖️ RFCTLARR Act 2013 Compliance

The `rfctlarrCalculator.js` service implements the statutory compensation formula:

```
Total Award = Market Value × Rural Distance Multiplier
            + 100% Solatium (Section 30(1))
            + 12% per annum interest from notification date (Section 30(3))
            + R&R entitlement (Schedule II lump sum)
```

**Rural Distance Multipliers** (First Schedule, Section 26):
- Urban / within 5 km: 1.0×
- 5–10 km: 1.25×
- 10–20 km: 1.5×
- Beyond 20 km: 2.0×

**Statutory Deadlines** (Section 25):
- Award must be declared within **12 months** of Section 19 Final Declaration notification
- Extension available under Proviso if delay caused by stay order or force majeure (documented)

---

## 🔐 Security Model

| Control | Implementation |
|---|---|
| Password storage | bcryptjs (cost factor 12) |
| Session tokens | JWT HS256, 8-hour expiry, stored in httpOnly `nlams_session` cookie |
| SQL injection | 100% parameterized queries (`?` placeholders) — no string concatenation |
| Role enforcement | Server-side RBAC in `middleware/rbac.js` — client cannot escalate privileges |
| Jurisdiction check | `checkJurisdiction()` validates state_code / district against JWT claims |
| Rate limiting | 100 requests / 15 min on `/api/v1/auth/*` endpoints |
| Security headers | `helmet` (HSTS, X-Frame-Options, CSP, etc.) |
| Document integrity | SHA-256 checksum computed server-side on upload, stored in `documents` table |
| Audit trail | Every state-changing action logged to immutable `audit_logs` table |
| CSRF | SameSite=Strict cookies; Bearer token for programmatic API access |

---

## 📁 Project Structure

```
land-acquisition-system/
├── src/
│   ├── app.js                 # Express app factory
│   ├── server.js              # HTTP server entry point
│   ├── config/index.js        # Environment configuration
│   ├── db/
│   │   ├── index.js           # Dual-engine adapter (MySQL2 + SQLite)
│   │   ├── schema.sql         # 12-table normalized schema
│   │   ├── migrate.js         # Schema runner
│   │   └── seed.js            # Synthetic demo dataset (CPRR + Amaravati)
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   ├── rbac.js            # Role & jurisdiction enforcement
│   │   ├── audit.js           # Immutable audit logging
│   │   └── errorHandler.js    # Centralized error sanitization
│   ├── services/
│   │   ├── rfctlarrCalculator.js  # First Schedule statutory math
│   │   ├── signingAdapter.js      # DSC + SHA-256 integrity
│   │   ├── paymentAdapter.js      # PFMS DBT sandbox
│   │   └── deadlineService.js     # Section 25 countdown engine
│   ├── controllers/           # Request handlers (auth, projects, parcels, ...)
│   ├── routes/                # Express routers
│   └── swagger/swagger.json   # OpenAPI 3.0 spec
├── tests/
│   ├── auth.test.js
│   ├── workflow.test.js
│   ├── compensation.test.js
│   ├── deadlines.test.js
│   └── documents.test.js
├── storage/
│   ├── nlams_local.sqlite     # Auto-created SQLite DB (gitignored)
│   └── vault/                 # Document upload directory (gitignored)
├── js/                        # Client-side data & AI engine helpers
├── shared-auth.js             # Frontend API client (apiFetch, apiLogin)
├── style.css                  # Design system (dark mode, glassmorphism, Donezo tokens)
├── index.html                 # Public portal + citizen Khasra search
├── login.html                 # Glassmorphic auth page (JWT sessions)
├── dashboard.html             # Executive dashboard (Donezo design)
├── projects.html              # Project pipeline (API-synced)
├── gis-map.html               # Tri-layer GIS map + GeoJSON/CSV export
├── workflow.html              # 6-stage workflow + DSC signing
├── compensation.html          # RFCTLARR calculator + PFMS DBT
├── documents.html             # Document vault + SHA-256
├── reports.html               # MIS reports + live API stats
├── farmer-d2c.html            # Kisan-Setu D2C portal (SIH #26033)
├── landslide-ner.html         # Drishti-NER AI dashboard (SIH #26049)
├── unified-platform.html      # PRITHVI-SETU 360 command suite
├── cadastral-data.js          # Synthetic CPRR + Amaravati parcel dataset
├── package.json
├── .env.example
└── README.md
```

---

## 🏆 Hackathon Context

| Field | Value |
|---|---|
| Event | Smart India Hackathon (SIH) 2026 — Grand Finale |
| Problem Statement | #26016 — National Land Acquisition & Management System |
| Ministry | Ministry of Land Resources (DoLR), Government of India |
| Theme | Smart Governance |
| Team | Mohan-das457 |
| Branch | `feature/fullstack-nlams-upgrade` |

### Scoring Areas Addressed
- ✅ **Completeness**: Full-stack end-to-end implementation (not a mockup)
- ✅ **Innovation**: RFCTLARR statutory calculator, Section 25 live countdown, GeoJSON export
- ✅ **Security**: JWT, RBAC, parameterized queries, SHA-256 document hashing, audit logs
- ✅ **Scalability**: Adaptive DB engine (MySQL in prod, SQLite in dev/test)
- ✅ **User Experience**: Glassmorphic design, Donezo dashboard tokens, responsive layout
- ✅ **GIS / Spatial**: Leaflet.js cadastral map, GeoJSON/CSV export, 36-state corridor coverage
- ✅ **Citizen Services**: Public Khasra self-check, privacy-by-design, objection petition portal
- ✅ **Testing**: 13 automated tests, 5 suites, 100% pass rate

---

> **Disclaimer**: This is a hackathon prototype. All data, credentials, and government integrations shown are simulated for demonstration purposes. PFMS, DigiLocker, and DSC integrations are sandbox stubs only. Do not use in production without formal security audit and government approval.
