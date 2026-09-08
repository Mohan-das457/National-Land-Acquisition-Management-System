# Real-Time National Land Acquisition & Management System (NLAMS)
### Smart India Hackathon (SIH 2026) | Problem Statement #26016
**Department of Land Resources (DoLR), Ministry of Rural Development, Government of India**

[![Status](https://img.shields.io/badge/Status-Production%20Prototype-success.svg)](#)
[![Compliance](https://img.shields.io/badge/Compliance-RFCTLARR%20Act%202013-blue.svg)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%20%7C%20Leaflet%20%7C%20Chart.js-orange.svg)](#)
[![License](https://img.shields.io/badge/License-Government%20Open%20Data-green.svg)](#)

---

## 📌 Executive Overview
Land acquisition is a foundational pillar for national infrastructure (Highways, High-Speed Rail, Dedicated Freight Corridors, Solar Parks, River Interlinking). According to government data, **over 70% of infrastructure project delays and cost overruns in India are caused by land acquisition disputes and manual paper file routing**.

Furthermore, under **Section 25 of the RFCTLARR Act 2013**, if the Collector does not declare the compensation award within **exactly 12 months** of the Section 19 declaration, **the entire acquisition lapses automatically**, causing catastrophic financial loss.

**NLAMS** (*National Land Acquisition & Management System*) is a web-based, GIS-enabled decision support and end-to-end monitoring platform that digitizes the complete acquisition lifecycle from project proposal to physical possession.

---

## 🚀 Live Demo & Navigation Links

| Module | URL | Description |
|---|---|---|
| **🏛️ Public Portal & Login** | [`index.html`](index.html) | National statistics ticker, public Khasra search, and multi-role login |
| **📊 Executive Dashboard** | [`dashboard.html`](dashboard.html) | Real-time KPIs, RFCTLARR timeline radar, and state-wise metrics |
| **🗺️ Cadastral GIS Map** | [`gis-map.html`](gis-map.html) | Sub-meter parcel boundaries for Tamil Nadu & Andhra Pradesh corridors |
| **🔄 Digital Workflow & Approvals** | [`workflow.html`](workflow.html) | 6-stage funnel, e-Office green-noting, and cryptographic DSC e-Sign |
| **🏗️ Projects Pipeline** | [`projects.html`](projects.html) | Multi-parameter filtering, statutory stages, and proposal submission |
| **💰 DBT Compensation Tracker** | [`compensation.html`](compensation.html) | Family-wise ledger, 100% Solatium calculation, and PFMS tracking |
| **📈 MIS Reports & AI Radar** | [`reports.html`](reports.html) | Timeline compliance heatmaps, predictive dispute radar, PDF/Excel export |
| **📁 Document Vault** | [`documents.html`](documents.html) | Version-controlled gazette archives, JMS maps, and SHA-256 audit trail |

---

## 🗺️ High-Precision Cadastral GIS Corridors (AP & TN Focus)

Unlike generic map platforms that display pinpoints, NLAMS implements **sub-meter polygonal cadastral parcel boundaries** overlaid on high-resolution satellite imagery:

### 🌊 Tamil Nadu Corridor: Chennai Peripheral Ring Road (CPRR Package 2)
- **Location**: Sriperumbudur & Tiruvallur Taluks (Villages: Nemili, Thandalam, Mambakkam, Irungattukottai).
- **Accurate Tenures**: Real **Patta & Sub-division numbers** (`142/1A`, `142/1B`, `143/2`, `144/1`, `145/3`, `146/1`, `147/2A`).
- **Classification**: Nanja (Wet Irrigated) and Punja (Dry) guideline valuations.
- **Linear Footprint**: 60-meter centerline Right-of-Way (RoW) buffer corridor.
- **Inspector**: Official **Tamil Nadu Patta / Chitta Extract** with Special DRO (Land Acquisition) authentication.

### 🌾 Andhra Pradesh Corridor: Amaravati Core Seed Axis & Outer Ring Road
- **Location**: Thullur Mandal, Guntur District (Villages: Mandadam, Velagapudi, Thullur, Rayapudi - Krishna Floodplain).
- **Accurate Tenures**: Real **Webland 1B Survey & Khata numbers** (`204/1`, `204/2`, `205/A`, `206/1`, `207/2`).
- **Classification**: Jaribu (River Alluvial Soil) and Metta Bhoomi.
- **Inspector**: Official **AP Webland 1B Adangal Extract** with Joint Collector & CALA seal.

---

## ⚡ Innovative Workflow & Legal Decision Support Engine

1. **6-Stage Statutory State Machine**:
   $$\text{Proposal \& SIA} \rightarrow \text{Sec 11 Gazette} \rightarrow \text{Sec 15 Hearing} \rightarrow \text{Sec 19 Decl.} \rightarrow \text{Sec 23 Award} \rightarrow \text{Sec 38 Possession}$$
2. **e-Office Green-Noting Modal**:
   Statutory verification checklist ensuring Form 7/12 cross-verification, Gram Sabha consent (PESA), and bank escrow provisioning.
3. **Cryptographic Digital Signature (DSC / e-Sign)**:
   Simulates hardware DSC token authentication, stamping an official green seal with a **SHA-256 hash** and officer timestamp.
4. **Section 25 Statutory 12-Month Countdown Clock**:
   Live warning gauges alert officers before the legal 12-month acquisition lapse deadline.
5. **Section 15 Citizen Objections Docket**:
   Quasi-judicial hearing docket where the Collector records speaking orders on farmer objection petitions.

---

## 👥 Multi-Stakeholder Role Separation

| Role | Official Identity | Jurisdiction & Focus |
|---|---|---|
| **🏛️ Central Ministry** | Dr. Ramesh Kumar IAS | National overview (2,847 projects), union budget sanctions, cabinet briefs |
| **🏢 State Govt (TN)** | Thiru K. Phanindra Reddy IAS | Tamil Nadu corridor oversight, State Gazette notifications, CLA approvals |
| **🏢 State Govt (AP)** | Smt. R. P. Sisodia IAS | Amaravati Seed Axis & Polavaram, Webland 1B state digitization |
| **⚖️ District CALA (TN)** | Dr. Alby John IAS | Collector & CALA Tiruvallur (CPRR Section II corridor), Sec 15 hearings |
| **⚖️ District CALA (AP)** | Shri M. Venugopal Reddy IAS | Collector & CALA Guntur (Amaravati Capital Region), Sec 23 awards |
| **📐 Field Surveyor (TN)** | K. Soundararajan | Sriperumbudur Firka: DGPS ground truthing, Patta demarcation, tree counts |

---

## 🛠️ Local Development & Running

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Mohan-das457/land-acquisition-system.git
   cd land-acquisition-system
   ```

2. **Serve with any local static HTTP server**:
   ```bash
   # Python 3
   python3 -m http.server 8000

   # Or Node.js
   npx serve .
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:8000/` or `http://localhost:8000/dashboard.html`.

---

## ⚖️ Statutory & Compliance References
- Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR Act 2013)
- National Highways Act, 1956 (Section 3A to 3J)
- Railways Act, 1989 (Chapter IVA Special Railway Projects)
- PM GatiShakti National Master Plan (NMP) Geospatial Standards
- Public Financial Management System (PFMS) Direct Benefit Transfer (DBT) Directives

---
© 2026 Department of Land Resources (DoLR), Ministry of Rural Development, Government of India.
