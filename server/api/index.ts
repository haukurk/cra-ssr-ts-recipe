import * as express from 'express';
import HealthEndpoint from './health';

const router = express.Router();

router.use('/healthy', HealthEndpoint);

export default router;