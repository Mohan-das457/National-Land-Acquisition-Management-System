// ============================================================
// data.js — Simulated Sensor Data, NER Locations, Historical Records
// ============================================================

const NER_ZONES = [
  // ASSAM (8 zones)
  { id: 'AS01', name: 'Haflong', state: 'Assam', lat: 25.1667, lng: 93.0167, slope: 42, soilType: 'Laterite', elevation: 680, rainfall: 185, soilMoisture: 78, historicalCount: 12, riskScore: 0, road: 'open', population: 34000 },
  { id: 'AS02', name: 'Lumding', state: 'Assam', lat: 25.7500, lng: 93.1667, slope: 35, soilType: 'Alluvial', elevation: 140, rainfall: 142, soilMoisture: 65, historicalCount: 7, riskScore: 0, road: 'open', population: 28000 },
  { id: 'AS03', name: 'Dima Hasao', state: 'Assam', lat: 25.4833, lng: 93.0500, slope: 48, soilType: 'Laterite', elevation: 920, rainfall: 210, soilMoisture: 82, historicalCount: 18, riskScore: 0, road: 'partial', population: 15000 },
  { id: 'AS04', name: 'Karbi Anglong', state: 'Assam', lat: 26.1000, lng: 93.5000, slope: 38, soilType: 'Sandy Loam', elevation: 450, rainfall: 165, soilMoisture: 71, historicalCount: 9, riskScore: 0, road: 'open', population: 42000 },
  { id: 'AS05', name: 'Cachar Hills', state: 'Assam', lat: 24.8333, lng: 92.7833, slope: 44, soilType: 'Clay', elevation: 580, rainfall: 195, soilMoisture: 76, historicalCount: 14, riskScore: 0, road: 'open', population: 22000 },
  { id: 'AS06', name: 'Barak Valley', state: 'Assam', lat: 24.6800, lng: 92.7600, slope: 30, soilType: 'Alluvial', elevation: 120, rainfall: 230, soilMoisture: 85, historicalCount: 6, riskScore: 0, road: 'partial', population: 55000 },
  { id: 'AS07', name: 'Guwahati Hills', state: 'Assam', lat: 26.1445, lng: 91.7362, slope: 33, soilType: 'Laterite', elevation: 340, rainfall: 155, soilMoisture: 68, historicalCount: 8, riskScore: 0, road: 'open', population: 120000 },
  { id: 'AS08', name: 'Silchar', state: 'Assam', lat: 24.8333, lng: 92.7789, slope: 28, soilType: 'Alluvial', elevation: 90, rainfall: 240, soilMoisture: 88, historicalCount: 5, riskScore: 0, road: 'open', population: 85000 },

  // MEGHALAYA (5 zones)
  { id: 'ML01', name: 'Cherrapunji', state: 'Meghalaya', lat: 25.2700, lng: 91.7200, slope: 52, soilType: 'Laterite', elevation: 1484, rainfall: 320, soilMoisture: 92, historicalCount: 22, riskScore: 0, road: 'closed', population: 12000 },
  { id: 'ML02', name: 'Shillong Peak', state: 'Meghalaya', lat: 25.5600, lng: 91.8800, slope: 45, soilType: 'Sandy Loam', elevation: 1965, rainfall: 210, soilMoisture: 79, historicalCount: 15, riskScore: 0, road: 'partial', population: 45000 },
  { id: 'ML03', name: 'Jaintia Hills', state: 'Meghalaya', lat: 25.3500, lng: 92.2000, slope: 40, soilType: 'Laterite', elevation: 1100, rainfall: 250, soilMoisture: 84, historicalCount: 11, riskScore: 0, road: 'open', population: 18000 },
  { id: 'ML04', name: 'Garo Hills', state: 'Meghalaya', lat: 25.5167, lng: 90.2167, slope: 36, soilType: 'Clay', elevation: 580, rainfall: 180, soilMoisture: 72, historicalCount: 8, riskScore: 0, road: 'open', population: 32000 },
  { id: 'ML05', name: 'Mawsynram', state: 'Meghalaya', lat: 25.2969, lng: 91.5826, slope: 55, soilType: 'Laterite', elevation: 1400, rainfall: 350, soilMoisture: 95, historicalCount: 25, riskScore: 0, road: 'closed', population: 8000 },

  // MIZORAM (4 zones)
  { id: 'MZ01', name: 'Aizawl', state: 'Mizoram', lat: 23.7307, lng: 92.7173, slope: 50, soilType: 'Sandy Loam', elevation: 1132, rainfall: 195, soilMoisture: 77, historicalCount: 16, riskScore: 0, road: 'partial', population: 95000 },
  { id: 'MZ02', name: 'Lunglei', state: 'Mizoram', lat: 22.8900, lng: 92.7300, slope: 46, soilType: 'Laterite', elevation: 850, rainfall: 175, soilMoisture: 73, historicalCount: 10, riskScore: 0, road: 'open', population: 28000 },
  { id: 'MZ03', name: 'Champhai', state: 'Mizoram', lat: 23.4567, lng: 93.3261, slope: 43, soilType: 'Clay', elevation: 920, rainfall: 160, soilMoisture: 69, historicalCount: 7, riskScore: 0, road: 'open', population: 15000 },
  { id: 'MZ04', name: 'Serchhip', state: 'Mizoram', lat: 23.3000, lng: 92.8500, slope: 47, soilType: 'Sandy Loam', elevation: 980, rainfall: 185, soilMoisture: 75, historicalCount: 9, riskScore: 0, road: 'open', population: 12000 },

  // MANIPUR (3 zones)
  { id: 'MN01', name: 'Imphal East', state: 'Manipur', lat: 24.8170, lng: 94.0089, slope: 32, soilType: 'Alluvial', elevation: 786, rainfall: 145, soilMoisture: 64, historicalCount: 6, riskScore: 0, road: 'open', population: 68000 },
  { id: 'MN02', name: 'Ukhrul', state: 'Manipur', lat: 25.1200, lng: 94.3600, slope: 48, soilType: 'Laterite', elevation: 1662, rainfall: 190, soilMoisture: 78, historicalCount: 13, riskScore: 0, road: 'partial', population: 22000 },
  { id: 'MN03', name: 'Churachandpur', state: 'Manipur', lat: 24.3300, lng: 93.6800, slope: 44, soilType: 'Clay', elevation: 920, rainfall: 175, soilMoisture: 74, historicalCount: 11, riskScore: 0, road: 'open', population: 35000 },

  // NAGALAND (3 zones)
  { id: 'NL01', name: 'Kohima', state: 'Nagaland', lat: 25.6700, lng: 94.1200, slope: 46, soilType: 'Sandy Loam', elevation: 1444, rainfall: 170, soilMoisture: 72, historicalCount: 14, riskScore: 0, road: 'partial', population: 55000 },
  { id: 'NL02', name: 'Dimapur', state: 'Nagaland', lat: 25.8700, lng: 93.7300, slope: 28, soilType: 'Alluvial', elevation: 260, rainfall: 140, soilMoisture: 62, historicalCount: 5, riskScore: 0, road: 'open', population: 78000 },
  { id: 'NL03', name: 'Mokokchung', state: 'Nagaland', lat: 26.3200, lng: 94.5200, slope: 42, soilType: 'Laterite', elevation: 1325, rainfall: 165, soilMoisture: 70, historicalCount: 9, riskScore: 0, road: 'open', population: 25000 },

  // TRIPURA (2 zones)
  { id: 'TR01', name: 'Agartala Hills', state: 'Tripura', lat: 23.8315, lng: 91.2868, slope: 34, soilType: 'Alluvial', elevation: 180, rainfall: 195, soilMoisture: 76, historicalCount: 7, riskScore: 0, road: 'open', population: 45000 },
  { id: 'TR02', name: 'Jampui Hills', state: 'Tripura', lat: 24.0500, lng: 92.2700, slope: 40, soilType: 'Laterite', elevation: 920, rainfall: 210, soilMoisture: 80, historicalCount: 10, riskScore: 0, road: 'partial', population: 12000 },

  // ARUNACHAL PRADESH (3 zones)
  { id: 'AR01', name: 'Itanagar', state: 'Arunachal Pradesh', lat: 27.0844, lng: 93.6053, slope: 38, soilType: 'Sandy Loam', elevation: 440, rainfall: 175, soilMoisture: 73, historicalCount: 11, riskScore: 0, road: 'open', population: 48000 },
  { id: 'AR02', name: 'Tawang', state: 'Arunachal Pradesh', lat: 27.5860, lng: 91.8696, slope: 52, soilType: 'Rocky', elevation: 3048, rainfall: 145, soilMoisture: 65, historicalCount: 15, riskScore: 0, road: 'partial', population: 12000 },
  { id: 'AR03', name: 'Bomdila', state: 'Arunachal Pradesh', lat: 27.2645, lng: 92.4159, slope: 50, soilType: 'Sandy Loam', elevation: 2415, rainfall: 160, soilMoisture: 68, historicalCount: 13, riskScore: 0, road: 'open', population: 8000 },

  // SIKKIM (3 zones)
  { id: 'SK01', name: 'Gangtok', state: 'Sikkim', lat: 27.3389, lng: 88.6065, slope: 45, soilType: 'Laterite', elevation: 1650, rainfall: 200, soilMoisture: 80, historicalCount: 17, riskScore: 0, road: 'partial', population: 65000 },
  { id: 'SK02', name: 'Mangan', state: 'Sikkim', lat: 27.5100, lng: 88.5300, slope: 54, soilType: 'Rocky', elevation: 1280, rainfall: 220, soilMoisture: 83, historicalCount: 20, riskScore: 0, road: 'closed', population: 10000 },
  { id: 'SK03', name: 'Namchi', state: 'Sikkim', lat: 27.1667, lng: 88.3500, slope: 40, soilType: 'Sandy Loam', elevation: 1675, rainfall: 180, soilMoisture: 74, historicalCount: 12, riskScore: 0, road: 'open', population: 18000 }
];

// Sensor network — 50+ simulated sensors
const SENSORS = [];
(function generateSensors() {
  const types = ['rain_gauge', 'soil_moisture', 'tilt_meter', 'seismograph', 'gps_station'];
  const statuses = ['active', 'active', 'active', 'active', 'active', 'active', 'active', 'offline', 'maintenance'];
  NER_ZONES.forEach((zone, i) => {
    const count = zone.historicalCount > 12 ? 3 : 2;
    for (let s = 0; s < count; s++) {
      SENSORS.push({
        id: `SEN-${zone.id}-${s + 1}`,
        zoneId: zone.id,
        type: types[(i + s) % types.length],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        lat: zone.lat + (Math.random() - 0.5) * 0.05,
        lng: zone.lng + (Math.random() - 0.5) * 0.05,
        lastReading: Date.now() - Math.random() * 3600000,
        battery: Math.floor(50 + Math.random() * 50),
        value: 0
      });
    }
  });
})();

// Historical landslide events
const HISTORICAL_EVENTS = [
  { id: 'HE01', date: '2024-06-28', location: 'Haflong', state: 'Assam', lat: 25.17, lng: 93.02, severity: 'critical', casualties: 12, displaced: 450, description: 'Major debris flow along NH-54 triggered by 72hr continuous rainfall' },
  { id: 'HE02', date: '2024-07-15', location: 'Cherrapunji', state: 'Meghalaya', lat: 25.27, lng: 91.72, severity: 'critical', casualties: 8, displaced: 320, description: 'Rock slide blocking Sohra-Shillong road, multiple villages cut off' },
  { id: 'HE03', date: '2024-08-02', location: 'Aizawl', state: 'Mizoram', lat: 23.73, lng: 92.72, severity: 'high', casualties: 3, displaced: 180, description: 'Slope failure in residential area after monsoon surge' },
  { id: 'HE04', date: '2024-06-10', location: 'Gangtok', state: 'Sikkim', lat: 27.34, lng: 88.61, severity: 'critical', casualties: 15, displaced: 600, description: 'Flash flood and landslide on Teesta River valley road' },
  { id: 'HE05', date: '2024-07-22', location: 'Kohima', state: 'Nagaland', lat: 25.67, lng: 94.12, severity: 'high', casualties: 4, displaced: 210, description: 'NH-29 blocked by massive mudslide near Kohima' },
  { id: 'HE06', date: '2023-09-14', location: 'Mangan', state: 'Sikkim', lat: 27.51, lng: 88.53, severity: 'critical', casualties: 22, displaced: 1200, description: 'Glacial lake outburst flood causing catastrophic landslides' },
  { id: 'HE07', date: '2023-07-11', location: 'Dima Hasao', state: 'Assam', lat: 25.48, lng: 93.05, severity: 'critical', casualties: 6, displaced: 500, description: 'Railway line damaged, multiple hill collapses along Lumding-Badarpur section' },
  { id: 'HE08', date: '2023-08-05', location: 'Ukhrul', state: 'Manipur', lat: 25.12, lng: 94.36, severity: 'high', casualties: 2, displaced: 150, description: 'Road collapse isolating 3 villages in hill district' },
  { id: 'HE09', date: '2023-06-30', location: 'Jampui Hills', state: 'Tripura', lat: 24.05, lng: 92.27, severity: 'moderate', casualties: 0, displaced: 90, description: 'Minor slope failure affecting tea plantation area' },
  { id: 'HE10', date: '2024-09-01', location: 'Itanagar', state: 'Arunachal Pradesh', lat: 27.08, lng: 93.61, severity: 'high', casualties: 5, displaced: 280, description: 'Urban landslide in capital city after record rainfall' },
  { id: 'HE11', date: '2023-07-28', location: 'Mawsynram', state: 'Meghalaya', lat: 25.30, lng: 91.58, severity: 'critical', casualties: 9, displaced: 400, description: 'Multiple debris flows in wettest region during peak monsoon' },
  { id: 'HE12', date: '2024-08-18', location: 'Tawang', state: 'Arunachal Pradesh', lat: 27.59, lng: 91.87, severity: 'high', casualties: 3, displaced: 120, description: 'High-altitude rockfall blocking strategic road' },
  { id: 'HE13', date: '2023-09-05', location: 'Lunglei', state: 'Mizoram', lat: 22.89, lng: 92.73, severity: 'moderate', casualties: 1, displaced: 75, description: 'Soil erosion causing partial building collapse' },
  { id: 'HE14', date: '2024-07-05', location: 'Garo Hills', state: 'Meghalaya', lat: 25.52, lng: 90.22, severity: 'moderate', casualties: 0, displaced: 60, description: 'Agricultural land lost to hill slope failure' },
  { id: 'HE15', date: '2024-06-20', location: 'Cachar Hills', state: 'Assam', lat: 24.83, lng: 92.78, severity: 'high', casualties: 2, displaced: 200, description: 'Bridge approach road washed away' },
  { id: 'HE16', date: '2023-08-22', location: 'Churachandpur', state: 'Manipur', lat: 24.33, lng: 93.68, severity: 'high', casualties: 4, displaced: 250, description: 'Multiple slides along hill road after seismic activity' },
  { id: 'HE17', date: '2024-05-15', location: 'Bomdila', state: 'Arunachal Pradesh', lat: 27.26, lng: 92.42, severity: 'moderate', casualties: 1, displaced: 100, description: 'Pre-monsoon slide blocking Bomdila pass' },
  { id: 'HE18', date: '2024-08-30', location: 'Namchi', state: 'Sikkim', lat: 27.17, lng: 88.35, severity: 'moderate', casualties: 0, displaced: 85, description: 'Small debris flow near monastery area' },
  { id: 'HE19', date: '2023-10-02', location: 'Dimapur', state: 'Nagaland', lat: 25.87, lng: 93.73, severity: 'low', casualties: 0, displaced: 30, description: 'Minor soil slip along railway embankment' },
  { id: 'HE20', date: '2024-07-10', location: 'Shillong Peak', state: 'Meghalaya', lat: 25.56, lng: 91.88, severity: 'high', casualties: 3, displaced: 175, description: 'Rock fall near tourist viewpoint after heavy rain' },
  { id: 'HE21', date: '2024-09-08', location: 'Barak Valley', state: 'Assam', lat: 24.68, lng: 92.76, severity: 'high', casualties: 2, displaced: 300, description: 'Flood-induced slope collapse along Barak river' },
  { id: 'HE22', date: '2023-06-15', location: 'Serchhip', state: 'Mizoram', lat: 23.30, lng: 92.85, severity: 'moderate', casualties: 0, displaced: 55, description: 'Retaining wall failure in hill town' }
];

// Road network data
const ROAD_NETWORKS = [
  { id: 'RD01', name: 'NH-54 (Haflong–Silchar)', state: 'Assam', status: 'partial', riskLevel: 'high', length: 220, coords: [[25.17, 93.02], [24.83, 92.78]] },
  { id: 'RD02', name: 'NH-44 (Shillong–Cherrapunji)', state: 'Meghalaya', status: 'closed', riskLevel: 'critical', length: 56, coords: [[25.56, 91.88], [25.27, 91.72]] },
  { id: 'RD03', name: 'NH-306 (Aizawl–Lunglei)', state: 'Mizoram', status: 'open', riskLevel: 'moderate', length: 260, coords: [[23.73, 92.72], [22.89, 92.73]] },
  { id: 'RD04', name: 'NH-10 (Siliguri–Gangtok)', state: 'Sikkim', status: 'partial', riskLevel: 'high', length: 114, coords: [[26.71, 88.43], [27.34, 88.61]] },
  { id: 'RD05', name: 'NH-29 (Dimapur–Kohima)', state: 'Nagaland', status: 'partial', riskLevel: 'high', length: 74, coords: [[25.87, 93.73], [25.67, 94.12]] },
  { id: 'RD06', name: 'NH-13 (Itanagar–Bomdila)', state: 'Arunachal Pradesh', status: 'open', riskLevel: 'moderate', length: 320, coords: [[27.08, 93.61], [27.26, 92.42]] },
  { id: 'RD07', name: 'NH-8 (Agartala–Jampui)', state: 'Tripura', status: 'open', riskLevel: 'low', length: 180, coords: [[23.83, 91.29], [24.05, 92.27]] },
  { id: 'RD08', name: 'NH-37 (Imphal–Ukhrul)', state: 'Manipur', status: 'partial', riskLevel: 'high', length: 83, coords: [[24.82, 94.01], [25.12, 94.36]] },
  { id: 'RD09', name: 'NH-13 (Tawang–Bomdila)', state: 'Arunachal Pradesh', status: 'partial', riskLevel: 'high', length: 180, coords: [[27.59, 91.87], [27.26, 92.42]] },
  { id: 'RD10', name: 'NH-510 (Mangan–Lachung)', state: 'Sikkim', status: 'closed', riskLevel: 'critical', length: 45, coords: [[27.51, 88.53], [27.69, 88.75]] }
];

// Weather simulation data (7-day)
function generateWeatherData() {
  const days = [];
  const labels = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
    days.push({
      date: labels[labels.length - 1],
      avgRainfall: 80 + Math.random() * 200,
      maxRainfall: 150 + Math.random() * 250,
      avgHumidity: 70 + Math.random() * 25,
      avgTemp: 18 + Math.random() * 12
    });
  }
  return { days, labels };
}

// Seismic activity (recent)
const SEISMIC_DATA = [
  { date: '2024-09-10', magnitude: 3.2, depth: 15, lat: 25.5, lng: 93.1, location: 'Near Haflong' },
  { date: '2024-09-08', magnitude: 2.8, depth: 22, lat: 27.3, lng: 88.6, location: 'Near Gangtok' },
  { date: '2024-09-05', magnitude: 4.1, depth: 10, lat: 25.2, lng: 94.3, location: 'Near Ukhrul' },
  { date: '2024-09-01', magnitude: 2.5, depth: 30, lat: 23.7, lng: 92.7, location: 'Near Aizawl' },
  { date: '2024-08-28', magnitude: 3.6, depth: 12, lat: 27.5, lng: 88.5, location: 'Near Mangan' }
];

// Dynamic data update functions
function randomFluctuation(value, range, min = 0, max = 500) {
  const delta = (Math.random() - 0.5) * 2 * range;
  return Math.max(min, Math.min(max, value + delta));
}

function updateZoneData() {
  NER_ZONES.forEach(zone => {
    zone.rainfall = randomFluctuation(zone.rainfall, 15, 20, 400);
    zone.soilMoisture = randomFluctuation(zone.soilMoisture, 5, 20, 100);
    // Road status occasionally changes
    if (Math.random() < 0.05) {
      const statuses = ['open', 'partial', 'closed'];
      zone.road = statuses[Math.floor(Math.random() * statuses.length)];
    }
  });
}

function updateSensorData() {
  SENSORS.forEach(sensor => {
    if (sensor.status === 'active') {
      sensor.lastReading = Date.now();
      sensor.battery = Math.max(10, sensor.battery - Math.random() * 0.5);
      switch (sensor.type) {
        case 'rain_gauge': sensor.value = 50 + Math.random() * 300; break;
        case 'soil_moisture': sensor.value = 30 + Math.random() * 70; break;
        case 'tilt_meter': sensor.value = Math.random() * 15; break;
        case 'seismograph': sensor.value = Math.random() * 5; break;
        case 'gps_station': sensor.value = Math.random() * 0.1; break;
      }
    }
    // Randomly toggle sensor status
    if (Math.random() < 0.02) {
      sensor.status = sensor.status === 'active' ? 'offline' : 'active';
    }
  });
}

function getStateSummary() {
  const states = {};
  NER_ZONES.forEach(zone => {
    if (!states[zone.state]) {
      states[zone.state] = { zones: 0, avgRisk: 0, totalRisk: 0, maxRisk: 0, population: 0 };
    }
    states[zone.state].zones++;
    states[zone.state].totalRisk += zone.riskScore;
    states[zone.state].maxRisk = Math.max(states[zone.state].maxRisk, zone.riskScore);
    states[zone.state].population += zone.population;
  });
  Object.keys(states).forEach(s => {
    states[s].avgRisk = Math.round(states[s].totalRisk / states[s].zones);
  });
  return states;
}

function getSeverityDistribution() {
  const dist = { critical: 0, high: 0, moderate: 0, low: 0 };
  NER_ZONES.forEach(zone => {
    if (zone.riskScore >= 80) dist.critical++;
    else if (zone.riskScore >= 60) dist.high++;
    else if (zone.riskScore >= 40) dist.moderate++;
    else dist.low++;
  });
  return dist;
}

function getRoadStats() {
  const stats = { open: 0, partial: 0, closed: 0 };
  ROAD_NETWORKS.forEach(r => stats[r.status]++);
  NER_ZONES.forEach(z => stats[z.road]++);
  return stats;
}

function getActiveSensorCount() {
  return SENSORS.filter(s => s.status === 'active').length;
}

function getPopulationAtRisk() {
  return NER_ZONES
    .filter(z => z.riskScore >= 60)
    .reduce((sum, z) => sum + z.population, 0);
}

// Export for use
window.DataModule = {
  NER_ZONES,
  SENSORS,
  HISTORICAL_EVENTS,
  ROAD_NETWORKS,
  SEISMIC_DATA,
  generateWeatherData,
  updateZoneData,
  updateSensorData,
  getStateSummary,
  getSeverityDistribution,
  getRoadStats,
  getActiveSensorCount,
  getPopulationAtRisk,
  randomFluctuation
};
