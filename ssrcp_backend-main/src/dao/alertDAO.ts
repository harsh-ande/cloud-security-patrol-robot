import { getDbConnection } from '../index';

// Create Alert
export const createAlertDAO = async ({
    robot_id,
    alert_type,
    description,
    severity,
}) => {
    const connection = await getDbConnection();
    const query = `
        INSERT INTO Alert (robot_id, alert_type, description, severity)
        VALUES (?, ?, ?, ?);
    `;
    try {
        const [result]: any = await connection.execute(query, [
            robot_id,
            alert_type,
            description,
            severity,
        ]);
        return { alert_id: result.insertId };
    } catch (error) {
        console.error(`Error in createAlertDAO: ${error.message}`, error);
        throw new Error(`Database Error: Unable to create alert`);
    } finally {
        if (connection) connection.release();
    }
};

// Get All Alerts
export const getAllAlertsDAO = async () => {
    const connection = await getDbConnection();
    const query = `
        SELECT 
            alert_id,
            robot_id,
            alert_type,
            description,
            severity,
            status,
            timestamp,
            resolved_by,
            resolution_time
        FROM Alert;
    `;
    try {
        const [rows] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.error(`Error in getAllAlertsDAO: ${error.message}`, error);
        throw new Error(`Database Error: Unable to fetch alerts`);
    } finally {
        if (connection) connection.release();
    }
};

// Get Alert By ID
export const getAlertByIdDAO = async (alertId: number) => {
    const connection = await getDbConnection();
    const query = `
        SELECT 
            alert_id,
            robot_id,
            alert_type,
            description,
            severity,
            status,
            timestamp,
            resolved_by,
            resolution_time
        FROM Alert
        WHERE alert_id = ?;
    `;
    try {
        const [rows] = await connection.execute(query, [alertId]);
        return rows[0];
    } catch (error) {
        console.error(`Error in getAlertByIdDAO: ${error.message}`, error);
        throw new Error(
            `Database Error: Unable to fetch alert with ID ${alertId}`,
        );
    } finally {
        if (connection) connection.release();
    }
};

// Update Alert
export const updateAlertStatusDAO = async (
    alertId: number,
    status: string,
    resolved_by: number,
) => {
    const connection = await getDbConnection();
    const query = `
        UPDATE Alert 
        SET 
            status = ?, 
            resolved_by = ?, 
            resolution_time = NOW()
        WHERE alert_id = ?;
    `;
    try {
        const [result]: any = await connection.execute(query, [
            status,
            resolved_by,
            alertId,
        ]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error in updateAlertStatusDAO: ${error.message}`, error);
        throw new Error(
            `Database Error: Unable to update alert with ID ${alertId}`,
        );
    } finally {
        if (connection) connection.release();
    }
};

// Delete Alert
export const deleteAlertDAO = async (alertId: number) => {
    const connection = await getDbConnection();
    const query = `DELETE FROM Alert WHERE alert_id = ?;`;
    try {
        const [result]: any = await connection.execute(query, [alertId]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error in deleteAlertDAO: ${error.message}`, error);
        throw new Error(
            `Database Error: Unable to delete alert with ID ${alertId}`,
        );
    } finally {
        if (connection) connection.release();
    }
};
