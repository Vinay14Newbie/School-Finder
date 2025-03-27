import { db } from '../config/dbConfig.js';

export async function listSchools(req, res) {
  try {
    const { latitude, longitude, page = 1, limit = 5 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: 'Latitude and Longitude are required' });
    }

    const query = `
      SELECT *, 
        ( 6371 * 
          acos(
            cos(radians(?)) * cos(radians(latitude)) * 
            cos(radians(longitude) - radians(?)) + 
            sin(radians(?)) * sin(radians(latitude))
          )
        ) AS distance 
      FROM SCHOOLS 
      ORDER BY distance ASC 
      LIMIT ? OFFSET ?;
    `;

    db.query(
      query,
      [latitude, longitude, latitude, limitNumber, offset],
      (err, results) => {
        if (err) {
          console.error('Error fetching schools:', err.message);
          return res.status(500).json({ error: err.message });
        }

        // Fetch total number of schools
        db.query(
          'SELECT COUNT(*) AS total FROM SCHOOLS',
          (err, countResult) => {
            if (err) {
              console.error('Error fetching school count:', err.message);
              return res.status(500).json({ error: err.message });
            }

            const totalSchools = countResult[0].total;
            const totalPages = Math.ceil(totalSchools / limitNumber);

            return res.status(200).json({
              message: 'Schools fetched successfully...',
              page: pageNumber,
              limit: limitNumber,
              totalSchools,
              totalPages,
              data: results
            });
          }
        );
      }
    );
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
