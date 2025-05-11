import express from 'express';
import statsController from '../controller/statsController';

const statsRoutes = express.Router();

statsRoutes.get('/organizations/', statsController.getOrganizationCount);
statsRoutes.get('/users/', statsController.getUserCount);
statsRoutes.get('/robots/', statsController.getRobotCount);
statsRoutes.get('/alerts/', statsController.getAlertCount);

export default statsRoutes;
