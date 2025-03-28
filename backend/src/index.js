import express from 'express';
import cors from 'cors';
import { db } from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import { addSchool } from './apis/addSchool.js';
import { listSchools } from './apis/listSchools.js';

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: [
//     'https://school-finder-b73g.onrender.com', // Backend
//     'https://school-finder-theta.vercel.app/', // Frontend
//     'http://localhost:5173' // Local dev
//   ]
// };
// app.use(cors(corsOptions));

app.use(cors({ origin: '*' }));

app.post('/addSchool', addSchool);

app.get('/listSchools', listSchools);

app.get('/ping', (req, res) => {
  res.json({ message: 'Hello there...!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
      return;
    }
    console.log('Connected to AWS MySQL!');
    connection.release();
  });
});
