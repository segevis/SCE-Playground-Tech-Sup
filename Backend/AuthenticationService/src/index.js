// authentication-service/src/index.js
import 'dotenv/config';
import express, { json } from 'express';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDb } from './data-access/db.js';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(json());

// Initialize the database connection
initDb()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });

// Authentication routes
app.use('/', authRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});
