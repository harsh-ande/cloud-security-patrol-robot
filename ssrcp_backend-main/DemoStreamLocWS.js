const mongoose = require('mongoose');
const WebSocket = require('ws');
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
        img: Object, // Assuming img field is of type Object (or adjust based on your schema)
    },
    { collection: 'robot' },
);

const getMongoConnection = async () => {
    const mongoURI = 'mongodb://localhost:27017/SSRCP'; // MongoDB URI
    try {
        // Connect to MongoDB using Mongoose
        const connection = await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

const webSocketFuncMap = async () => {
    const connection = await getMongoConnection();
    const robots = connection.model('robot', robotSchema);
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', async (ws, req) => {
        console.log('WebSocket client connected');

        const params = new URL(req.url, `ws://${req.headers.host}`)
            .searchParams;
        const mysqlRobotId = params.get('robotId');
        const userId = params.get('userId');
        const id = parseInt(params.get('actorId'));
        const data = { mysqlRobotId: mysqlRobotId, id: id, userId: userId };

        let interval;

        interval = setInterval(async () => {
            const entries = await robots
                .find(data, {})
                .sort({ time: -1 })
                .limit(1);

            if (entries.length > 0) {
                console.log({ entries });
                ws.send(JSON.stringify(entries[0].location));
            }
        }, 1000);

        // Clean up on connection close
        ws.on('close', () => {
            console.log('WebSocket client disconnected');
            if (interval) {
                clearInterval(interval); // Clear the interval to stop periodic requests
            }
        });

        // Handle errors
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
};

const webSocketVideo = async () => {
    const connection = await getMongoConnection();
    const robots = connection.model('robot', robotSchema);
    const wss = new WebSocket.Server({ port: 8088 });

    wss.on('connection', async (ws, req) => {
        console.log('WebSocket client connected');

        const params = new URL(req.url, `ws://${req.headers.host}`)
            .searchParams;
        const mysqlRobotId = params.get('robotId');
        const userId = params.get('userId');
        const id = parseInt(params.get('actorId'));
        const data = { mysqlRobotId: mysqlRobotId, id: id, userId: userId };

        let interval;

        interval = setInterval(async () => {
            const entries = await robots
                .find(data, { img: 1, _id: 0 }) // Only fetch 'img' field
                .sort({ time: -1 })
                .limit(1);

            if (entries.length > 0) {
                console.log({ entries });
                ws.send(JSON.stringify(entries[0].img)); // Sending the img field
            }
        }, 1000);

        // Clean up on connection close
        ws.on('close', () => {
            console.log('WebSocket client disconnected');
            if (interval) {
                clearInterval(interval); // Clear the interval to stop periodic requests
            }
        });

        // Handle errors
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
};

webSocketVideo();
webSocketFuncMap();
