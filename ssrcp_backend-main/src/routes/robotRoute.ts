import express = require('express');
import { Response, Request } from 'express';
import { getAllRobots, getRobotById, inActiveRobot } from '../dao/robotDao';
import { createRobot } from '../controller/robot';
import {
    fetchLast10Entries,
    fetchLast10EntriesLogs,
} from '../dao/mongoose/robotStreamData';
export const robotRoutes = express.Router();
import axios from 'axios';

robotRoutes.get('/getAllRobots', async (req, res) => {
    const data = await getAllRobots();
    console.log({ DATA: data });
    res.send({ data });
});

robotRoutes.get('/getRobot/:id', async (req, res) => {
    try {
        const robotId = req.params.id; // Extract the ID from the route parameter
        console.log({ robotId });
        const robotData = await getRobotById(robotId); // Fetch the robot data by ID
        if (!robotData) {
            res.status(404).send({ error: 'Robot not found' });
        }
        res.send({ data: robotData });
    } catch (error) {
        console.error('Error fetching robot:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

robotRoutes.delete('/deleteRobot/:robotId', async (req, res) => {
    try {
        const robotId = req.params.robotId; // Extract the ID from the route parameter
        const robotData = await inActiveRobot(robotId); // Fetch the robot data by ID
        if (!robotData) {
            res.status(404).send({ error: 'Robot not found' });
        }
        res.send({ data: robotData });
    } catch (error) {
        console.error('Error fetching robot:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

robotRoutes.post('/createRobot', async (req, res) => {
    const data = await createRobot(req.body);
    res.send({ data });
});

robotRoutes.post('/streamLast10VehicleData', async (req, res) => {
    try {
        console.log('called get streamLast10VehicleData');
        console.log(req.body);
        console.log({ req });
        const data = await fetchLast10Entries(req.body);
        return res.send({ data });
    } catch (e) {
        console.log({ e });
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

robotRoutes.post('/streamLast10VehicleDataLogs', async (req, res) => {
    try {
        console.log('called get streamLast10VehicleDataLogs');
        console.log(req.body);
        console.log({ req });
        const data = await fetchLast10EntriesLogs(req.body);
        return res.send({ data });
    } catch (e) {
        console.log({ e });
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

/**
 *  This api will create the robot and start streaming the data
 *  for infinite time.
 */

// Stream data from createCar endpoint to frontend
robotRoutes.get('/streamRobot', async (req, res) => {
    // Set SSE headers
    // res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('Connection', 'keep-alive');

    const fetchDataAndStream = async (id, carModel, weather) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/control/createCar?id=${id}&car_model=${carModel}&weather=${weather}`,
                {
                    headers: {
                        Accept: 'text/event-stream', // Request streaming data
                    },
                    responseType: 'stream', // Important for handling streams
                },
            );

            console.log('Connected to stream. Logging data...');
            response.data.on('data', (chunk) => {
                try {
                    console.log({ chunk });
                    const chunkString = chunk.toString();
                    const jsonStr = chunkString
                        .match(/data:\s*(.*)/)?.[1]
                        ?.trim();
                    console.log(JSON.parse(jsonStr));
                } catch (err) {
                    console.error('Error parsing data chunk:', err.message);
                }
            });
            response.data.on('end', () => {
                console.log('Stream ended.');
            });
        } catch (error) {
            console.error('Error fetching streaming data:', error.message);
        }
    };
    const id = req?.query?.id || '1';
    const carModel = req?.query?.car_model || 'vehicle.audi.a2';
    const weather = req?.query?.weather || 'ClearNoon';
    await fetchDataAndStream(id, carModel, weather);
});
