import { getDbConnection } from '../config/index';
import mysql from 'mysql2/promise';
/**
       {
  "robot_id": 1,
  "robot_modelName": "Robot-X1",
  "simulationSession": 101,
  "version": 1.0,
  "healthStatus": 95,
  "robot_isActive": 1,
  "userId": 1,
  "userName": "JohnDoe",
  "email": "johndoe@example.com",
  "userType": "Admin",
  "organizationId": 1,
  "organizationName": "TechCorp"
}
       /**]
     
     o.id AS organizationId, 
    o.organizationName AS organizationName
   JOIN 
        organization o ON u.org_Id = o.id;
*/

export const getAllRobots = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    const getAllRobots = `
    SELECT 
    r.id AS robot_id, 
    r.modelName AS robot_modelName, 
    r.simulationSession, 
    r.version, 
    r.healthStatus, 
    r.isActive AS robot_isActive,
    u.id AS userId, 
    u.userName AS userName, 
    u.email AS email, 
    u.userType
    FROM 
        Robot r
    JOIN 
        user u ON r.ownerId = u.id
        `;
    try {
        const robots = await connection.execute(getAllRobots);
        return robots;
    } catch (error) {
        console.error('Error fetching Users :', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};

export const getRobotById = async (robotId) => {
    const connection = await getDbConnection(); // get connections

    const getAllRobots = `
    SELECT 
    r.id AS robot_id, 
    r.modelName AS robot_modelName, 
    r.simulationSession,
    r.version, 
    r.healthStatus, 
    r.isActive AS robot_isActive,
    u.id AS userId, 
    u.userName AS userName, 
    u.email AS email, 
    u.userType
    FROM 
        Robot r
    JOIN 
        user u ON r.ownerId = u.id
    where r.id=${robotId}
        `;
    try {
        const robots = await connection.execute(getAllRobots);
        return robots;
    } catch (error) {
        console.error('Error fetching Users :', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};

export const inActiveRobot = async (robotId) => {
    const connection = await getDbConnection(); //
    const insertRobot = `UPDATE robot
    SET isActive = 0
    WHERE id = ${robotId}
    `;
    try {
        const robot = await connection.execute(insertRobot);
        return robot;
    } catch (error) {
        console.error('Error fetching Users :', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};
export const createEmptyRobot = async (params) => {
    const connection = await getDbConnection(); //
    const insertRobot = `INSERT INTO robot 
    (modelName, simulationSession, version, healthStatus, isActive, ownerId)
    VALUES 
    ('${params.car_model}', 101, 1.0, 100, 1, ${params.id});
    `;
    try {
        const [robots] = await connection.execute(insertRobot);
        console.log({
            insertedNewrobot: (robots as mysql.ResultSetHeader).insertId,
        });
        return (robots as mysql.ResultSetHeader).insertId;
    } catch (error) {
        console.error('Error fetching Users :', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};

export const updateRobotAfterSucessVehicleCreation = async (params) => {
    const connection = await getDbConnection(); //
    const insertRobot = `UPDATE robot
    SET 
        cameraTop = ${params.cameraTop},
        cameraFront = ${params.cameraFront}
    WHERE 
        id = ${params.robotId}; `;
    try {
        const robots = await connection.execute(insertRobot);
        return robots;
    } catch (error) {
        console.error('Error fetching Users :', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};
