// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardAuthRequests, getTechSup, delOneTicket } from '../controllers/gatewayController.js';

const router = Router();

// Forward all /auth/* requests
router.use('/auth', forwardAuthRequests);
router.get('/techsupport', getTechSup);
router.delete('/techsupportdel', delOneTicket);

export default router;
