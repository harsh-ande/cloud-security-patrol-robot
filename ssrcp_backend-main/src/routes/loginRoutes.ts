import express = require('express');
import { Response, Request } from 'express';
import { loginController } from '../controller/login';
export const loginRoute = express.Router();

loginRoute.post('/login', async (req, res) => {
    console.log({ req, res });
    console.log({ req: req.data });
    const data = await loginController(req.body);
    res.status(200).send(data);
});
