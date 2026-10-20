/**
 * RFCTLARR Act 2013 Statutory Compensation Engine
 * Implements Section 26, 29, 30(1) Solatium, and 30(3) 12% Per Annum Interest.
 */

function calculateCompensation(params) {
  const {
    acquiredAreaHa,
    guidelineValuePerHa,
    distanceFromUrbanKm = 10,
    isUrban = false,
    treesValuation = 0,
    structuresValuation = 0,
    sec11Date = null,
    awardDate = new Date()
  } = params;

  const area = parseFloat(acquiredAreaHa);
  const rate = parseFloat(guidelineValuePerHa);
  const trees = parseFloat(treesValuation) || 0;
  const structures = parseFloat(structuresValuation) || 0;

  if (isNaN(area) || area <= 0) throw new Error('Invalid acquired area');
  if (isNaN(rate) || rate <= 0) throw new Error('Invalid guideline rate');

  // 1. Multiplier determination under Section 26(2) & First Schedule
  let multiplier = 1.00;
  if (!isUrban) {
    if (distanceFromUrbanKm <= 5) {
      multiplier = 1.20;
    } else if (distanceFromUrbanKm <= 15) {
      multiplier = 1.50;
    } else if (distanceFromUrbanKm <= 30) {
      multiplier = 1.75;
    } else {
      multiplier = 2.00;
    }
  }

  // Raw Market Value
  const rawMarketValue = Math.round(area * rate * 100) / 100;

  // Base Compensation with Statutory Rural Multiplier
  const baseLandValue = Math.round(rawMarketValue * multiplier * 100) / 100;

  // Assets attached to land under Section 29
  const totalAssetsValue = Math.round((trees + structures) * 100) / 100;

  // Total Land and Asset Base
  const totalLandAndAssets = Math.round((baseLandValue + totalAssetsValue) * 100) / 100;

  // 2. 100% Solatium under Section 30(1)
  const solatium = Math.round(totalLandAndAssets * 1.00 * 100) / 100;

  // 3. 12% per annum Additional Compensation under Section 30(3)
  let additionalInterest = 0;
  let elapsedDays = 0;
  if (sec11Date) {
    const s11 = new Date(sec11Date);
    const award = new Date(awardDate);
    const diffTime = Math.max(0, award - s11);
    elapsedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const elapsedYears = elapsedDays / 365.25;
    additionalInterest = Math.round(rawMarketValue * 0.12 * elapsedYears * 100) / 100;
  }

  // 4. Total Statutory Award
  const totalAward = Math.round((totalLandAndAssets + solatium + additionalInterest) * 100) / 100;

  return {
    rawMarketValue,
    multiplier,
    baseLandValue,
    assetsValuation: {
      treesValuation: trees,
      structuresValuation: structures,
      totalAssetsValue
    },
    totalLandAndAssets,
    solatium,
    additionalInterest,
    elapsedDays,
    totalAward,
    statutoryRule: 'RFCTLARR_ACT_2013_SCHEDULE_1'
  };
}

module.exports = {
  calculateCompensation
};
