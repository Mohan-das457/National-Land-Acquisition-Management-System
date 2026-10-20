const db = require('../db');

async function getParcels(req, res, next) {
  try {
    const { projectId, stateCode, district, village, search, geojson } = req.query;

    let sql = 'SELECT * FROM cadastral_parcels WHERE 1=1';
    const params = [];

    if (projectId) {
      sql += ' AND project_id = ?';
      params.push(projectId);
    }
    if (stateCode) {
      sql += ' AND state_code = ?';
      params.push(stateCode.toUpperCase());
    }
    if (district) {
      sql += ' AND district = ?';
      params.push(district);
    }
    if (village) {
      sql += ' AND village LIKE ?';
      params.push(`%${village}%`);
    }
    if (search) {
      sql += ' AND (survey_number LIKE ? OR patta_khata_no LIKE ? OR owner_name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const rows = await db.query(sql, params);

    // If client requested GeoJSON format for Leaflet layers
    if (geojson === 'true') {
      const features = rows.map(r => {
        let coordinates = [];
        try {
          coordinates = JSON.parse(r.polygon_geojson);
          // Convert [lat, lng] to GeoJSON standard [lng, lat]
          coordinates = coordinates.map(pt => [pt[1], pt[0]]);
          if (coordinates.length > 0 && (coordinates[0][0] !== coordinates[coordinates.length - 1][0] || coordinates[0][1] !== coordinates[coordinates.length - 1][1])) {
            coordinates.push(coordinates[0]); // close polygon loop
          }
        } catch (e) {
          coordinates = [];
        }

        return {
          type: 'Feature',
          id: r.id,
          geometry: {
            type: 'Polygon',
            coordinates: [coordinates]
          },
          properties: {
            id: r.id,
            surveyNumber: r.survey_number,
            pattaKhataNo: r.patta_khata_no,
            ownerName: r.owner_name,
            totalAreaHa: r.total_area_ha,
            acquiredAreaHa: r.acquired_area_ha,
            landClassification: r.land_classification,
            totalAwardAmount: r.total_award_amount,
            disbursementStatus: r.disbursement_status,
            village: r.village,
            taluk: r.taluk,
            district: r.district,
            stateCode: r.state_code
          }
        };
      });

      return res.json({
        type: 'FeatureCollection',
        features
      });
    }

    return res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (err) {
    next(err);
  }
}

async function getParcelById(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await db.query('SELECT * FROM cadastral_parcels WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'PARCEL_NOT_FOUND', message: 'Parcel not found' });
    }

    const parcel = rows[0];
    const compCase = await db.query('SELECT * FROM compensation_cases WHERE parcel_id = ?', [id]);
    const objections = await db.query('SELECT * FROM objections WHERE parcel_id = ?', [id]);

    return res.json({
      success: true,
      data: {
        ...parcel,
        compensationCase: compCase.length > 0 ? compCase[0] : null,
        objections
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getParcels,
  getParcelById
};
