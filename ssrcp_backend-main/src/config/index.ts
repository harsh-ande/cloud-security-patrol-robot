import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import mongoose from 'mongoose';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'ssrcp',
    password: process.env.DB_PASSWORD || 'ssrcp',
    database: process.env.DB_NAME || 'ssrcp',
    waitForConnections: true,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to get a connection from the pool
export const getDbConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
        throw error;
    }
};

// This function connects to the MongoDB database using Mongoose
export const getMongoConnection = async () => {
    const mongoURI = 'mongodb://localhost:27017/SSRCP'; // Your MongoDB URI (local instance in this case)

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

// MongoDB URI (replace with your MongoDB URI)
// For MongoDB Atlas, use something like: 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase'

// Define a session schema
