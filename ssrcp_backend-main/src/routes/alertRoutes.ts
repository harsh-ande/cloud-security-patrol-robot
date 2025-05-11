import express from 'express';
import alertController from '../controller/alertController';

const alertRoutes = express.Router();

alertRoutes.get('/alerts', alertController.getAllAlerts);
alertRoutes.get('/alerts/:id', alertController.getAlertById);
alertRoutes.post('/alerts', alertController.createAlert);
alertRoutes.patch('/alerts/:id', alertController.updateAlertStatus);
alertRoutes.delete('/alerts/:id', alertController.deleteAlert);

export default alertRoutes;
