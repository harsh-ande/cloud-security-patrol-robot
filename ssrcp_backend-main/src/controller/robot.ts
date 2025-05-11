// import { UserRole } from '../enums/userEnums';
// import hashFunction from './../config/hashFunction';

import axios from 'axios';

import {
    createEmptyRobot,
    inActiveRobot,
    updateRobotAfterSucessVehicleCreation,
} from '../dao/robotDao';

const createRobot = async (data) => {
    const { model, id } = data;
    console.log({ wow: 'WWWOOOWW' });
    try {
        const params = {
            id: id, // Vehicle ID
            car_model: model, // Car model
        };

        // create Empty Model
        const newRobotId = await createEmptyRobot(params);
        params['robotId'] = newRobotId;
        // call flask API
        console.log({ helloparams: params });
        const response = await axios.get(
            'http://localhost:5000/control/createVehicle',
            { params },
        );
        if (response.status != 200) {
            console.log({ response });
            await inActiveRobot(newRobotId);
            throw new Error('ERROR while createing Vehicle in Carla');
        }
        //id | modelName | simulationSession | version | healthStatus | isActive | ownerId
        const data = response.data;
        console.log({ data });
        const mysqlDBParams = {
            modelName: data.car_type,
            robotId: newRobotId,
            vehicleId: data.vehicle,
            cameraFront: data.cameraFront,
            cameraTop: data.cameraTop,
            ownerId: id,
        };
        const insertRobot =
            await updateRobotAfterSucessVehicleCreation(mysqlDBParams);
        return insertRobot;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }

    // if flask API success
    // use flask data and api data togather into DB and mongo
};

export { createRobot };
