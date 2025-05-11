import {
    createAlertDAO,
    getAllAlertsDAO,
    getAlertByIdDAO,
    updateAlertStatusDAO,
    deleteAlertDAO,
} from '../dao/alertDAO';

const createAlert = async (req, res, next) => {
    try {
        const data = await createAlertDAO(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating alert:', error);
        next(error);
    }
};

const getAllAlerts = async (_req, res, next) => {
    try {
        const data = await getAllAlertsDAO();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching alerts:', error);
        next(error);
    }
};

const getAlertById = async (req, res, next) => {
    try {
        const alertId = parseInt(req.params.id, 10);
        const data = await getAlertByIdDAO(alertId);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Alert not found' });
        }
    } catch (error) {
        console.error('Error fetching alert by ID:', error);
        next(error);
    }
};

const updateAlertStatus = async (req, res, next) => {
    try {
        const alertId = parseInt(req.params.id, 10);
        const { status, resolved_by } = req.body;
        const updated = await updateAlertStatusDAO(
            alertId,
            status,
            resolved_by,
        );
        if (updated) {
            res.status(200).json({ message: 'Alert updated successfully' });
        } else {
            res.status(404).json({ error: 'Alert not found' });
        }
    } catch (error) {
        console.error('Error updating alert:', error);
        next(error);
    }
};

const deleteAlert = async (req, res, next) => {
    try {
        const alertId = parseInt(req.params.id, 10);
        const deleted = await deleteAlertDAO(alertId);
        if (deleted) {
            res.status(200).json({ message: 'Alert deleted successfully' });
        } else {
            res.status(404).json({ error: 'Alert not found' });
        }
    } catch (error) {
        console.error('Error deleting alert:', error);
        next(error);
    }
};

export default {
    createAlert,
    getAllAlerts,
    getAlertById,
    updateAlertStatus,
    deleteAlert,
};
