// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardAuthRequests, getTechSup, delOneTicket, addOneTicket, editOneTicket } from '../controllers/gatewayController.js';

const router = Router();

// Forward all /auth/* requests
router.use('/auth', forwardAuthRequests);

// tech-sup.
router.get('/techsupport', getTechSup);
router.post('/techsupportadd', addOneTicket);
router.patch('/techsupportedit', editOneTicket);
router.delete('/techsupportdel', delOneTicket);

export default router;
