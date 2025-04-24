// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { getTechSup, delOneTicket, addOneTicket, editOneTicket } from '../controllers/gatewayController.js'; // tech-sup
import { forwardAuthRequests, ping } from '../controllers/gatewayController.js';

const router = Router();

// Forward all /auth/* requests
router.use('/auth', forwardAuthRequests);
router.get('/ping', ping);

// tech-sup.
router.get('/techsupport', getTechSup);
router.post('/techsupportadd', addOneTicket);
router.patch('/techsupportedit', editOneTicket);
router.delete('/techsupportdel', delOneTicket);

export default router;
