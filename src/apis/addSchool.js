import { db } from '../config/dbConfig.js';

export async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;

    db.query(query, [name, address, latitude, longitude], (err, result) => {
      if (err) {
        console.error('Error inserting school:', err.message);
        return res.status(500).json({ error: err.message });
      }

      // Return inserted data and message
      return res.status(201).json({
        message: 'School added successfully',
        school: {
          id: result.insertId, // Get the inserted ID
          name,
          address,
          latitude,
          longitude
        }
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
