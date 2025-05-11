import {
    getOrganizationCountDAO,
    getUserCountDAO,
    getRobotCountDAO,
    getAlertCountDAO,
} from '../dao/statsDAO';

const getOrganizationCount = async (_req, res, next) => {
    try {
        const count = await getOrganizationCountDAO();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching organization count:', error);
        next(error);
    }
};

const getUserCount = async (_req, res, next) => {
    try {
        const count = await getUserCountDAO();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching user count:', error);
        next(error);
    }
};

const getRobotCount = async (_req, res, next) => {
    try {
        const count = await getRobotCountDAO();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching robot count:', error);
        next(error);
    }
};

const getAlertCount = async (_req, res, next) => {
    try {
        const count = await getAlertCountDAO();

        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching alert count:', error);
        next(error);
    }
};

export default {
    getOrganizationCount,
    getUserCount,
    getRobotCount,
    getAlertCount,
};
