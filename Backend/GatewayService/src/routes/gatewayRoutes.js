// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardAuthRequests } from '../controllers/gatewayController.js';

const router = Router();

// Forward all /auth/* requests
router.use('/auth', forwardAuthRequests);

export default router;
