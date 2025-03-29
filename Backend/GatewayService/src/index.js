// gateway-service/index.js
import 'dotenv/config';
import express, { json } from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import gatewayRoutes from './routes/gatewayRoutes.js';
import cors from 'cors'; 


const app = express();
const PORT = process.env.PORT || 4000;

app.use(json());
app.use(cors());

// Gateway routes
app.use('/', gatewayRoutes);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Gateway service running on port: ${PORT}`);
});
