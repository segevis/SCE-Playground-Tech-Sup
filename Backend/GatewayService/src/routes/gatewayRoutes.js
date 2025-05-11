// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardTechSupportRequests } from '../controllers/gatewayController.js'; // tech-sup
import { forwardAuthRequests, ping } from '../controllers/gatewayController.js';

const router = Router();

// Forward all /auth/* requests
router.use('/auth', forwardAuthRequests);
router.get('/ping', ping);

// Forward all /ts/* requests - for tech support.
router.use('/ts', forwardTechSupportRequests);

export default router;
