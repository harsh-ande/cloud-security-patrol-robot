import express from 'express';
// import helmet = require('helmet');
// import multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// import bodyParser from 'body-parser';
import { loginRoute } from './routes/loginRoutes';
import { organizationRoutes } from './routes/organizationRoutes';
import { userRoutes } from './routes/userRoutes';
import alertRoutes from './routes/alertRoutes';
import statsRoutes from './routes/statsRoutes';

const app = express();
import cors from 'cors';
import { robotRoutes } from './routes/robotRoute';
import { streamRoute } from './routes/streamRoute';
import { validateSession } from './controller/login';
const port = 3000;
app.use(express.json());

// app.use(cors);
// app.use(helmet());
// Enable CORS for requests from localhost:3001
app.use(
    cors({
        origin: '*',
        // credentials: true, // Optional, if you need to send cookies or other credentials
    }),
);

// Middleware function to run on every API call
app.use((req, res, next) => {
    console.log('API call received:', req.method, req.url);

    if (req.path === '/login') {
        console.log('Login endpoint hit');
    } else {
        // Perform your custom logic here
        validateSession(req, res);
        console.log({ DATA: 'WOWOWOWOWOW' });
    }
    next(); // Pass control to the next middleware or route handler
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});
app.use('/stream/', streamRoute);
app.use('/count', statsRoutes);
app.use('/', loginRoute);
app.use('/', organizationRoutes);
app.use('/', alertRoutes);
app.use('/', userRoutes);
app.use('/', robotRoutes);

app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
