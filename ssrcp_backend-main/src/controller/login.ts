// import { UserRole } from '../enums/userEnums';
// import hashFunction from './../config/hashFunction';
import { addUserSession } from '../dao/mongoose/sessionManager';
import { getUserByEmail } from './../dao/userDao';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const loginController = async (cred) => {
    console.log({ cred });
    const { email, password } = cred;

    try {
        const rows = await getUserByEmail(email);

        console.log({ rows: rows[0] });
        // console.log({ rows: rows[0] });
        var payload = {
            userId: email,
            email: email,
        };
        var user = email;
        if (rows[0].length === 0) {
            // If the user doesn't exist, send an error response
            console.log('Invalid email/password');
            // throw new Error('Invalid email or password');
        } else {
            user = rows[0]; // Assuming only one user is returned based on the email
            console.log({ password });
            console.log({ password1: user.password });
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password,
            );
            console.log({ isPasswordValid });
            if (!isPasswordValid) {
                // If the password doesn't match, send an error response
                throw new Error('Invalid email or password');
            }
            console.log({ isPasswordValid });

            payload = {
                userId: user.id,
                email: user.email,
            };
        }

        console.log({ payload });
        // You can adjust the JWT secret and expiration as needed
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h',
        });
        console.log({ token });
        // MongoDB
        const addSession = await addUserSession({
            userId: payload.userId,
            userEmail: payload.email,
            sessionID: token, // Store JWT token in session (optional, can also store session metadata)
        });

        user.sessionID = addSession.sessionID;
        return user;
    } catch (e) {
        throw new Error('Internal Server Error :  ' + e);
    }
};

// Verification of JWT
const validateSession = (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

    console.log({ req: req.headers });
    try {
        const token = req.header(tokenHeaderKey)?.split(' ')[1];
        const verified = jwt.verify(token, jwtSecretKey);
        console.log({ verified });
        if (verified) {
            return;
        } else {
            console.log(' Access Denied!!!!!!! ');
            // return res.status(401).send('Access Denied !!');
        }
    } catch (error) {
        console.log('Error - ' + error);
        console.log(' Access Denied!!!!!!!! ');
        // return res.status(401).send(error);
    }
    return;
};

export { loginController, validateSession };
