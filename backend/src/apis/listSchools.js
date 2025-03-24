import { db } from '../config/dbConfig.js';

function findClosestLocation(target, locations) {
  // Function to calculate distance between two coordinates using Haversine formula

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const schools = locations.map((school) => ({
    ...school,
    distance: calculateDistance(
      target.latitude,
      target.longitude,
      school.latitude,
      school.longitude
    )
  }));

  // Sort by distance (ascending)
  schools.sort((a, b) => a.distance - b.distance);

  return schools;
}

export async function listSchools(req, res) {
  try {
    const { latitude, longitude, page, limit } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: 'Latitude and Longitude are required' });
    }

    //count total schools
    const countQuery = `SELECT COUNT(*) AS total FROM SCHOOLS`;
    db.query(countQuery, (err, countResult) => {
      if (err) {
        console.error('Error fetching school count:', err.message);
        return res.status(500).json({ error: err.message });
      }

      const totalSchools = countResult[0].total;
      const totalPages = Math.ceil(totalSchools / limitNumber);

      // Fetch paginated schools
      const query = `SELECT * FROM SCHOOLS LIMIT ? OFFSET ?`;
      db.query(query, [limitNumber, offset], (err, results) => {
        if (err) {
          console.error('Error fetching schools:', err.message);
          return res.status(500).json({ error: err.message });
        }

        // Find closest schools
        const closestSchools = findClosestLocation(
          { latitude, longitude },
          results
        );

        return res.status(200).json({
          message: 'Schools fetched successfully...',
          page: pageNumber,
          limit: limitNumber,
          totalSchools,
          totalPages,
          data: closestSchools
        });
      });
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
