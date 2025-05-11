import { getDbConnection } from '../index';

export const getOrganizationCountDAO = async () => {
    const connection = await getDbConnection();
    const query =
        'SELECT COUNT(*) as count FROM Organization WHERE isActive = 1';
    try {
        const [rows]: any = await connection.execute(query);
        return rows[0]?.count || 0;
    } catch (error) {
        console.error(
            `Error in getOrganizationCountDAO: ${error.message}`,
            error,
        );
        throw new Error('Database Error: Unable to fetch organization count');
    } finally {
        if (connection) connection.release();
    }
};

export const getUserCountDAO = async () => {
    const connection = await getDbConnection();
    const query = 'SELECT COUNT(*) as count FROM User WHERE isActive = 1';
    try {
        const [rows]: any = await connection.execute(query);
        return rows[0]?.count || 0;
    } catch (error) {
        console.error(`Error in getUserCountDAO: ${error.message}`, error);
        throw new Error('Database Error: Unable to fetch user count');
    } finally {
        if (connection) connection.release();
    }
};

export const getRobotCountDAO = async () => {
    const connection = await getDbConnection();
    const query = 'SELECT COUNT(*) as count FROM Robot WHERE isActive = 1';
    try {
        const [rows]: any = await connection.execute(query);
        return rows[0]?.count || 0;
    } catch (error) {
        console.error(`Error in getRobotCountDAO: ${error.message}`, error);
        throw new Error('Database Error: Unable to fetch robot count');
    } finally {
        if (connection) connection.release();
    }
};

export const getAlertCountDAO = async () => {
    const connection = await getDbConnection();
    const query = 'SELECT COUNT(*) as count FROM Alert';
    try {
        const [rows]: any = await connection.execute(query);

        return rows[0]?.count || 0;
    } catch (error) {
        console.error(`Error in getAlertCountDAO: ${error.message}`, error);
        throw new Error('Database Error: Unable to fetch alert count');
    } finally {
        if (connection) connection.release();
    }
};
