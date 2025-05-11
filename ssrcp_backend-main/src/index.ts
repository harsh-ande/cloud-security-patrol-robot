import express, { Application } from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

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
