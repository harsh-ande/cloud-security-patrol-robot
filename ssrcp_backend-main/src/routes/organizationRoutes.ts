import express from 'express';
import { Request } from 'express';
import organizationController from '../controller/organization';
export const organizationRoutes = express.Router();
import { getAllActiveOrganizations } from '../dao/OrganizationDao';

organizationRoutes.post('/createOrganization', async (req: Request, res) => {
    console.log({ req, res });

    const data = await organizationController.organizationController(req.body);
    res.send({ data });
});

organizationRoutes.get('/Organizations', async (req: Request, res) => {
    const data = await getAllActiveOrganizations();
    res.send({ data });
});

organizationRoutes.put('/Organization', async (req: Request, res) => {
    console.log({ EditOrganization: req.body });
    const data = await organizationController.udpateOrganization(req.body);
    res.send({ data });
});
