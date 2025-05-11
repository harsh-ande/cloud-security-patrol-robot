import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
import { getMongoConnection } from '../../config';

const SessionDocument = new mongoose.Schema({
    userId: { type: String, required: true }, // User's ID
    userEmail: { type: String, required: true }, // User's Email
    signInTime: { type: Date, default: null }, // Time when the user signed in (default to now)
    signOutTime: { type: Date, default: null }, // Time when the user signed out (null by default)
    isActive: { type: Boolean, default: true }, // Session status (active or inactive)
    sessionID: { type: String, default: null }, // Session ID (usually the JWT token)
    time: { type: Date, default: Date.now },
});
export const addUserSession = async (user) => {
    try {
        // Create and save a new session
        const connection = await getMongoConnection();
        const Sessions = connection.model('sessions', SessionDocument);
        const newSession = new Sessions({
            userId: user.userId,
            userEmail: user.userEmail,
            signInTime: new Date(),
            sessionID: user.sessionID,
        });

        // Save the session to the database
        return await newSession.save();
    } catch (e) {
        console.log({ e });
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

// export const signoutUserSession = async (token) => {
//     //  // Bearer token
//     //
//     //  const token = req.header(process.env.TOKEN_HEADER_KEY)?.split(' ')[1];
//     if (!token) throw new Error('No token provided.');

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         const { userId, email } = decoded;

//         // Update the session to mark as inactive and set signOutTime
//         const session = await Session.findOne({
//             userId,
//             sessionID: token,
//             isActive: true,
//         }).sort({ time: -1 });

//         if (!session) {
//             return 'Session not found or already logged out.';
//         }

//         const newSession = new Session({
//             userId: userId,
//             userEmail: email,
//             isActive: false,
//             signInTime: session.signInTime,
//             signOutTime: new Date(),
//         });

//         // Save the session to the database
//         return await newSession.save();

//         return 'Logout successful.';
//     } catch (e) {
//         throw new Error('Internal server Error : ' + e);
//     }
// };

// export const checkUserSession = async (userId, sessionId) => {
//     try {
//         // Query to check if the session exists and is active

//         const session = await Session.findOne({
//             userId: userId,
//             sessionID: sessionId,
//             isActive: true, // Ensures we are checking for an active session
//         });

//         if (session) {
//             console.log('Session found:', session);
//             return session;
//         } else {
//             console.log('No active session found for userId:', userId);
//             return null; // No session found or inactive
//         }
//     } catch (error) {
//         console.error({ error });
//         throw new Error(error);
//     } finally {
//         await mongoose.connection.close();
//         console.log('MongoDB connection closed.');
//     }
// };
