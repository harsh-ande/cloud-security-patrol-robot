import { getDbConnection } from '../config/index';
import {
    createUserTableQuery,
    createUserTypeTableQuery1,
    createUserTypeTableQuery2,
    createORganizationTable,
    createRobotTable,
    createAlertTableQuery,
} from './seeder.scripts';

import {
    OrganizationSeederData,
    UserSeederData,
    robotSeederData,
    alertSeederData,
} from './seeder.data';

const userTableCreateSeed = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the table creation query
        await connection.execute(createUserTableQuery);
        console.log('User table created successfully.');
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};

const userTypeTableCreateSeed = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the table creation query
        await connection.execute(createUserTypeTableQuery1);
        await connection.execute(createUserTypeTableQuery2);
        console.log('User Type table created successfully.');
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};

const organizationTableCreateSeed = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the table creation query
        await connection.execute(createORganizationTable);
        console.log('Organization table created successfully.');
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};

const userSeederData = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the table creation query
        await connection.execute(UserSeederData);
        console.log('User Data  added successfully.');
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};

const RobotCreateTable = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the table creation query
        await connection.execute(createRobotTable);
        console.log('User table created successfully.');
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};

const RobotSeederData = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the table creation query
        await connection.execute(robotSeederData);
        console.log('User table created successfully.');
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};
const organizationSeederData = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the table creation query
        await connection.execute(OrganizationSeederData);
        console.log('Organization Data  added successfully.');
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};

// Run the seeder
organizationTableCreateSeed().catch((error) =>
    console.error('Seeding error:', error),
);
organizationSeederData().catch((error) =>
    console.error('Seeding error:', error),
);

userTableCreateSeed().catch((error) => console.error('Seeding error:', error));
userTypeTableCreateSeed().catch((error) =>
    console.error('Seeding error:', error),
);

userSeederData().catch((error) => console.error('Seeding errors:', error));

RobotCreateTable().catch((error) => console.error('Seeding error:', error));
RobotSeederData().catch((error) => console.error('Seeding error:', error));

const createAlertTable = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the table creation query
        await connection.execute(createAlertTableQuery);
        console.log('Alert table created successfully.');
    } catch (error) {
        console.error('Error creating Alert table:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};

const seedAlertData = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    try {
        // Execute the seeder data query
        await connection.execute(alertSeederData);
        console.log('Alert data seeded successfully.');
    } catch (error) {
        console.error('Error seeding Alert data:', error);
    } finally {
        // Close the database connection
        await connection.release();
    }
};

createAlertTable()
    .then(() => seedAlertData())
    .catch((error) => console.error('Error:', error));
