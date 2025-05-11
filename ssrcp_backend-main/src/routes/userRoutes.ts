import express = require('express');
import { Response, Request } from 'express';
import {
    getAllActiveUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
} from '../dao/userDao';
export const userRoutes = express.Router();

userRoutes.get('/getUsers', async (req: Request, res) => {
    const data = await getAllActiveUsers();
    console.log({ DATA: data });
    res.send({ data });
});

userRoutes.post('/user', async (req: Request, res) => {
    const data = await createUser(req.body);
    console.log({ DATA: data });
    res.send({ data });
});

userRoutes.put('/user', async (req: Request, res) => {
    const data = await updateUser(req.body);
    console.log({ DATA: data });
    res.send({ data });
});

userRoutes.delete('/user', async (req: Request, res) => {
    const query = req.query;
    const data = await deleteUser(query.id);
    res.send({ data });
});

userRoutes.get('/user', async (req: Request, res) => {
    let query = req.query;
    const data = await getUser(query.id);
    res.send({ data });
});
