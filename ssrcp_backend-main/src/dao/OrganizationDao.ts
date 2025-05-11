import { getDbConnection } from '../config/index';
import { ResultSetHeader } from 'mysql2';
import mysql from 'mysql2/promise';
import organization from '../controller/organization';

export const createOrganizationLogin = async ({
    organizationName,
    adminId,
}) => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    const orgDetail = `INSERT INTO Organization (organizationName, adminId) VALUES
    ('${organizationName}', ${adminId});`;

    try {
        // Begin transaction
        await connection.beginTransaction();
        // Execute the table creation query
        const [rows] = await connection.execute(orgDetail);
        console.log({ rows });
        const insertId = (rows as mysql.ResultSetHeader).insertId;
        console.log('Inserted user with ID:', insertId);
        const updateAdminOrgId = `UPDATE User SET org_Id = ${insertId} WHERE id = ${adminId}`;

        const [adminUpdate] = await connection.execute(updateAdminOrgId);
        console.log({ adminUpdate });
        // Commit transaction
        await connection.commit();
        return {
            success: true,
            organizationCreated: true,
            userUpdated: true,
        };
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};

export const getAllActiveOrganizations = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    const getAllOrganizations = `
        SELECT 
    o.id AS id,
    o.organizationName,
    o.isActive AS organizationIsActive,
    u.id AS userId,
    u.userName AS userName,
    u.email,
    COUNT(staff.id) AS userCount
FROM 
    Organization AS o
LEFT JOIN 
    user AS u ON o.adminId = u.id
LEFT JOIN 
    user AS staff ON o.id = staff.org_Id
GROUP BY 
    o.id, o.organizationName, o.isActive, u.id, u.userName, u.email
LIMIT 10;

    `;

    try {
        const orgs = await connection.execute(getAllOrganizations);
        return orgs;
    } catch (error) {
        console.error('Error fetching Users :', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};

export const updateOrganization = async (
    org_Id,
    isActive,
    organizationName,
) => {
    let connection;
    try {
        connection = await getDbConnection(); // get connections
        const updateOrg = `update organization set organizationName = '${organizationName}', isActive = ${isActive} where id = ${org_Id}`;
        const orgResponse = await connection.execute(updateOrg);

        //     const getAllOrganizations = `
        //     SELECT
        //       o.id AS organizationId,
        //       o.organizationName,
        //       o.adminId,
        //       u.id AS userId,
        //       u.userName,
        //       u.email,
        //       u.password,
        //       u.userType,
        //       u.org_Id,
        //       u.last_updated,
        //       u.isActive
        //     FROM
        //       Organization AS o
        //     LEFT JOIN
        //       User AS u
        //     ON
        //       o.adminId = u.id
        //       AND o.id = ${org_Id};
        //   `;

        // let org = await connection.execute(getAllOrganizations);
        // org = org[0][0];
        // console.log('wwoowwoowwoowow : ', {
        //     org: org[0],
        //     adminId,
        //     organizationName,
        // });
        // if (org.organizationName == organizationName && org.adminId == adminId)
        //     return [];

        // const oldOrgOfNewUser = `select * from organization where userId = ${adminId};`;
        // let oldOrgNewUser = await connection.execute(oldOrgOfNewUser);
        // oldOrgNewUser = oldOrgNewUser[0][0];

        // const updateUser = `update user set org_id = ${org_Id}, userType = 2 where id = ${adminId}`;

        // try {
        //     await connection.beginTransaction();

        //     if (org.userId == null) {
        //         // the userId might be associated to any other org, remove that
        //         const removeOldUser = await connection.execute(`update organization set adminId = 0 where adminId = ${adminId}`);
        //         const OlduserUpdate = await connection.execute(`update user set userType = 3 where org_Id = ${org_Id};`)

        //         // add the userId in org
        //         // add the org and userType in userId
        //         const userUpdate = await connection.execute(updateUser);

        //     } else {
        //         // old user => replace new user (organization)
        //         // new user => old Org => admin = 0
        //         // old user => staff (user)
        //         // new user => admin (user)
        //     }
        //         //  old users setup for editing organization
        //         const oldUserId = org.userId;
        //         const updateOldOrg = `update organization set adminId = 0 where adminId = ${adminId};`;
        //         const updateOldUser = `update user set userType = 3 where id = ${oldUserId};`;
        //         await connection.execute(updateOldOrg);
        //         await connection.execute(updateOldUser);

        //         // user setup
        //     }

        //     const userResponse = await connection.execute(updateUser);

        //     console.log('COMMIT STARTED');
        //     await connection.commit();
        //     console.log({ orgResponse, userResponse });
        //     return {
        //         orgResponse: orgResponse[0],
        //         userResponse: userResponse[0],
        //     };
        // } catch (e) {
        //     console.log('ROLLBACK STARTED');
        //     await connection.rollback();
        //     console.error('Error fetching Users :', e);
        // }
        return {
            orgResponse: orgResponse[0],
        };
    } catch (error) {
        console.error('Error fetching Users :', error);
    } finally {
        // Close the database connection
        console.log('RELEASE CONNECTION STARTED');
        if (connection) connection.release();
    }
};

/**
                          {
      id: 1,
      userName: 'Mitansh',
      email: 'mitansh.gor@sjsu.edu',
      password: '$2b$10$osx4PwVEiquf9NfWB1dy2OQoDKLMsdhwRsy4OwrN6eki7ViJZyBL2',
      userType: 1,
      org_Id: 1,
      last_updated: 2024-11-06T02:32:19.000Z,
      isActive: 1,
      typeName: 'Super Admin',
      organizationName: 'Tech Corp'
    }  
         
        
         */
