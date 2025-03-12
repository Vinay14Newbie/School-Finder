import mysql from 'mysql2';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './serverConfig.js';

export const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});
