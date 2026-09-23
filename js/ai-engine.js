// ============================================================
// ai-engine.js — Simulated AI/ML Risk Prediction Engine
// ============================================================

const AIEngine = (function () {
  // Weights for multi-factor risk model
  const WEIGHTS = {
    rainfall: 0.28,
    soilMoisture: 0.22,
    slope: 0.20,
    historicalFrequency: 0.15,
    seismicActivity: 0.10,
    soilType: 0.05
  };

  // Soil type vulnerability scores (0-1)
  const SOIL_VULNERABILITY = {
    'Laterite': 0.75,
    'Sandy Loam': 0.65,
    'Alluvial': 0.50,
    'Clay': 0.80,
    'Rocky': 0.40,
    'Loamy': 0.55
  };

  // Rainfall intensity scoring (mm/day → 0-100)
  function rainfallScore(mm) {
    if (mm <= 30) return mm * 0.5;
    if (mm <= 64) return 15 + (mm - 30) * 0.8;
    if (mm <= 115) return 42 + (mm - 64) * 0.7;
    if (mm <= 204) return 78 + (mm - 115) * 0.15;
    return Math.min(100, 91 + (mm - 204) * 0.04);
  }

  // Soil moisture scoring (% → 0-100)
  function soilMoistureScore(pct) {
    if (pct <= 30) return pct * 0.3;
    if (pct <= 60) return 9 + (pct - 30) * 0.9;
    if (pct <= 80) return 36 + (pct - 60) * 2.2;
    return Math.min(100, 80 + (pct - 80) * 1.0);
  }

  // Slope angle scoring (degrees → 0-100)
  function slopeScore(deg) {
    if (deg <= 15) return deg * 0.6;
    if (deg <= 30) return 9 + (deg - 15) * 1.8;
    if (deg <= 45) return 36 + (deg - 30) * 2.6;
    if (deg <= 60) return 75 + (deg - 45) * 1.67;
    return 100;
  }

  // Historical frequency scoring
  function historicalScore(count) {
    return Math.min(100, count * 5);
  }

  // Seismic proximity scoring
  function seismicScore(lat, lng) {
    let maxScore = 0;
    const recentSeismic = window.DataModule.SEISMIC_DATA;
    recentSeismic.forEach(event => {
      const dist = Math.sqrt(
        Math.pow(lat - event.lat, 2) + Math.pow(lng - event.lng, 2)
      );
      const proximityScore = Math.max(0, 100 - dist * 40);
      const magMultiplier = event.magnitude / 5;
      maxScore = Math.max(maxScore, proximityScore * magMultiplier);
    });
    return Math.min(100, maxScore);
  }

  // Soil type scoring
  function soilTypeScore(type) {
    return (SOIL_VULNERABILITY[type] || 0.5) * 100;
  }

  // Main risk calculation
  function calculateRiskScore(zone) {
    const factors = {
      rainfall: rainfallScore(zone.rainfall),
      soilMoisture: soilMoistureScore(zone.soilMoisture),
      slope: slopeScore(zone.slope),
      historicalFrequency: historicalScore(zone.historicalCount),
      seismicActivity: seismicScore(zone.lat, zone.lng),
      soilType: soilTypeScore(zone.soilType)
    };

    let score = 0;
    Object.keys(WEIGHTS).forEach(key => {
      score += factors[key] * WEIGHTS[key];
    });

    // Add some realistic noise (-3 to +3)
    score += (Math.random() - 0.5) * 6;
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  // Get risk severity label
  function getRiskLevel(score) {
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'moderate';
    return 'low';
  }

  // Get risk color
  function getRiskColor(score) {
    if (score >= 80) return '#ff3b5c';
    if (score >= 60) return '#ff8c42';
    if (score >= 40) return '#ffd166';
    return '#4ecdc4';
  }

  // Trend analysis (simulated 24-hour trend)
  function getTrend(zone) {
    const history = [];
    let simRain = zone.rainfall;
    let simMoist = zone.soilMoisture;
    for (let i = 23; i >= 0; i--) {
      simRain = window.DataModule.randomFluctuation(simRain, 20, 20, 400);
      simMoist = window.DataModule.randomFluctuation(simMoist, 3, 20, 100);
      const simZone = { ...zone, rainfall: simRain, soilMoisture: simMoist };
      const s = calculateRiskScore(simZone);
      history.push({ hour: `-${i}h`, score: s });
    }
    history.push({ hour: 'Now', score: zone.riskScore });

    const recent = history.slice(-6);
    const avgRecent = recent.reduce((a, b) => a + b.score, 0) / recent.length;
    const older = history.slice(0, 6);
    const avgOlder = older.reduce((a, b) => a + b.score, 0) / older.length;

    let direction = 'stable';
    if (avgRecent - avgOlder > 5) direction = 'rising';
    else if (avgOlder - avgRecent > 5) direction = 'falling';

    return { history, direction };
  }

  // Prediction: next 6 hours
  function predict(zone) {
    const predictions = [];
    let simRain = zone.rainfall;
    let simMoist = zone.soilMoisture;
    for (let h = 1; h <= 6; h++) {
      // Simulate slight increase during monsoon
      simRain = window.DataModule.randomFluctuation(simRain, 25, 20, 450);
      simMoist = Math.min(100, simMoist + Math.random() * 3);
      const simZone = { ...zone, rainfall: simRain, soilMoisture: simMoist };
      predictions.push({
        hour: `+${h}h`,
        predictedScore: calculateRiskScore(simZone),
        predictedRainfall: Math.round(simRain),
        predictedMoisture: Math.round(simMoist)
      });
    }
    return predictions;
  }

  // Update all zones' risk scores
  function updateAllRiskScores() {
    const alerts = [];
    window.DataModule.NER_ZONES.forEach(zone => {
      const prevScore = zone.riskScore;
      const prevLevel = getRiskLevel(prevScore);
      zone.riskScore = calculateRiskScore(zone);
      const newLevel = getRiskLevel(zone.riskScore);

      // Check for threshold crossing
      if (newLevel !== prevLevel) {
        if (['critical', 'high'].includes(newLevel) && !['critical', 'high'].includes(prevLevel)) {
          alerts.push({
            type: 'threshold_crossed',
            zone: zone,
            prevLevel,
            newLevel,
            score: zone.riskScore,
            timestamp: Date.now()
          });
        }
      }

      // Critical alert for very high scores
      if (zone.riskScore >= 85 && Math.random() < 0.3) {
        alerts.push({
          type: 'critical_warning',
          zone: zone,
          score: zone.riskScore,
          timestamp: Date.now()
        });
      }
    });
    return alerts;
  }

  return {
    calculateRiskScore,
    getRiskLevel,
    getRiskColor,
    getTrend,
    predict,
    updateAllRiskScores,
    WEIGHTS
  };
})();

window.AIEngine = AIEngine;
