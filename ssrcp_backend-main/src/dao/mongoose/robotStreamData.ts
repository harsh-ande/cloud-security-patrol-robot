import { getMongoConnection } from '../../config';
import mongoose from 'mongoose';
const robotSchema = new mongoose.Schema(
    {
        id: Number,
        userId: String,
        mysqlRobotId: String,
        velocity: Number,
        location: {
            x: Number,
            y: Number,
            z: Number,
        },
        acceleration: Number,
        throttle: Number,
        steering: Number,
        brake: Number,
        gear: Number,
        orientation: {
            pitch: Number,
            yaw: Number,
            roll: Number,
        },
        time: Date,
    },
    { collection: 'robot' },
);

export const fetchLast10Entries = async (params) => {
    try {
        const connection = await getMongoConnection();
        const robots = await connection.model('robot', robotSchema);

        try {
            // Query to find the last 10 entries matching the criteria
            let entries = await robots
                .find({
                    mysqlRobotId: params.robotId, // Add field if necessary in your schema
                    id: params.actorId,
                    userId: params.userId.toString(),
                })
                .sort({ time: -1 }) // Sort by time in descending order (most recent first)
                .limit(10);
            // Create and save a new session
            console.log({
                inpuit: {
                    mysqlRobotId: params.robotId, // Add field if necessary in your schema
                    id: params.actorId,
                    userId: params.userId.toString(),
                },
                entries,
            });
            entries = entries.reverse();
            const locData = entries.map((item) => ({
                loc_X: item.location.x,
                loc_Y: item.location.y,
            }));

            const pitchData = entries.map((item) => item.orientation.pitch);
            const yawData = entries.map((item) => item.orientation.yaw);
            const rollData = entries.map((item) => item.orientation.roll);
            const throttleData = entries.map((item) => item.throttle);
            const accelerationData = entries.map((item) => item.acceleration);
            const velocityData = entries.map((item) => item.velocity);
            return {
                locData,
                pitchData,
                yawData,
                rollData,
                throttleData,
                accelerationData,
                velocityData,
            };

            /**
             * 
             
             * 
             */
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    } catch (e) {
        console.log({ e });
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

export const fetchLast10EntriesLogs = async (params) => {
    try {
        const connection = await getMongoConnection();
        const robots = await connection.model('robot', robotSchema);

        try {
            // Query to find the last 10 entries matching the criteria
            let entries = await robots
                .find({
                    mysqlRobotId: params.robotId, // Add field if necessary in your schema
                    id: params.actorId,
                    userId: params.userId.toString(),
                })
                .sort({ time: -1 }) // Sort by time in descending order (most recent first)
                .limit(10);
            // Create and save a new session
            console.log({
                inpuit: {
                    mysqlRobotId: params.robotId, // Add field if necessary in your schema
                    id: params.actorId,
                    userId: params.userId.toString(),
                },
                entries,
            });
            entries = entries.reverse();
            console.log({ entries });
            return entries;
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    } catch (e) {
        console.log({ e });
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};
