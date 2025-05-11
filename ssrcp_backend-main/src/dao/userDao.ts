import { getDbConnection } from '../config/index';

export const getUserByEmail = async (email) => {
    let connection;
    try {
        const connection = await getDbConnection(); // get connections
        const loginQuery = `
    SELECT 
        u.id AS id,
        u.userName,
        u.email,
        u.password,
        u.userType,
        u.org_Id,
        u.last_updated,
        u.isActive AS userIsActive,
        ut.id AS userTypeId,
        ut.typeName AS userTypeName,
        o.id AS organizationId,
        o.organizationName,

        o.adminId AS organizationAdminId
    FROM 
        User AS u
    LEFT JOIN 
        UserType AS ut ON u.userType = ut.id
    LEFT JOIN 
        Organization AS o ON u.org_Id = o.id
    WHERE 
        u.email = '${email}' 
        AND u.isActive = 1;
    `;

        const [rows, fields] = await connection.execute(loginQuery);
        return rows;
    } catch (error) {
        console.error('Error creating User table:', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};

export const getAllActiveUsers = async () => {
    // Create a connection to the database using environment variables
    const connection = await getDbConnection(); // get connections

    const getAllUsers = `
    SELECT 
    u.id,
    u.userName,
    u.email,
    u.password,
    u.userType,
    u.org_Id,
    o.organizationName,
    u.last_updated,
    u.isActive,
    ut.id AS userTypeId,
    ut.typeName 
    FROM 
        User AS u 
    LEFT JOIN 
        Organization as o on o.id= u.org_Id
    LEFT JOIN 
        UserType AS ut ON u.userType = ut.id ;
    `;
    try {
        const user = await connection.execute(getAllUsers);
        return user;
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
    } catch (error) {
        console.error('Error fetching Users :', error);
    } finally {
        // Close the database connection
        if (connection) connection.release();
    }
};

export const createUser = async (user) => {
    const connection = await getDbConnection(); // get connections
    try {
        await connection.beginTransaction();
        try {
            const createUserQuery = `INSERT INTO USER (userName,email,password,userType,org_Id,isActive)
        VALUES ('${user.userName}','${user.email}','${user.password}',3,0,1);`;

            console.log({ createUserQuery });
            const [userResp] = await connection.execute(createUserQuery);

            // if (user.userType == 2) {
            //     const updateUser = `update user set userType = 3 where org_Id = ${user.org_Id} and userType = 2;`;
            //     const updateUserRes = await connection.execute(updateUser);
            //     console.log({ updateUser, updateUserRes });
            // }

            // let adminId = (userResp as mysql.ResultSetHeader).insertId;
            // const updateOrganization = `Update Organization set adminId = ${adminId} where id = ${user.org_Id};`;
            // console.log({ updateOrganization });
            // const [orgResp] = await connection.execute(updateOrganization);
            await connection.commit();
            return { userResp };
        } catch (e) {
            throw new Error(e);
        } finally {
            await connection.rollback();
        }
    } catch (e) {
        console.log({ e });
        if (connection) connection.release();
    }
};

export const getUser = async (userId) => {
    const connection = await getDbConnection(); // get connections

    const getUserQuery = `
    SELECT 
        u.id, 
        u.userName, 
        u.email, 
        u.password, 
        u.userType, 
        u.org_id, 
        u.last_updated, 
        u.isActive, 
        o.organizationName AS organizationName, 
        ut.typeName AS userTypeName 
    FROM 
        user AS u
    JOIN 
        organization AS o ON o.id = u.org_id
    JOIN 
        userType AS ut ON ut.id = u.userType
    WHERE 
        u.id = ${userId};
    `;

    const user = await connection.query(getUserQuery);
    console.log({ getSingleUser: user[0][0] });
    return user[0][0];
};

export const updateUser = async (user) => {
    const connection = await getDbConnection(); // get connections
    console.log('RequestedUser :', user);
    await connection.beginTransaction();
    try {
        try {
            const userFromDB = await getUser(user.id);
            console.log({ userFromDB });
            const createUserQuery =
                user.password === ''
                    ? `UPDATE USER set userName = '${user.userName}' ,email = '${user.email}' ,isActive = 1 where id = ${user.id}`
                    : `UPDATE USER set userName = '${user.userName}' ,email = '${user.email}', password = '${user.password}' ,isActive = 1 where id = ${user.id}`;

            console.log({ createUserQuery });
            const [userUpdate] = await connection.execute(createUserQuery);
            // const oldOrgData = await connection.execute(
            //     `select * from organization as o join user as u on o.adminId = u.id where o.id = ${user.org_Id} and u.userType in (1,2);`,
            // );

            // const earlierUserAdminOrg = await getUser(oldOrgData[0][0].adminId);

            // if (user.userType == 2) {
            //     if (userFromDB.org_Id != user.org_Id) {
            //         // old user, make type = staff and set org as same
            //         // new user = make type = admin and new organization
            //         // new org => make admin = new user
            //         // old org => make admin = null
            //     } else {
            //         // old admin make him staff
            //         // new admin make him admin
            //         // organization update admin
            //     }
            //     const updateOrganization = `Update user set userType = ${3}  where id = ${oldOrgData[0][0].adminId};`;
            //     const updateAdminIdOfOrg = `Update Organization set adminId = ${user.id}  where id = ${user.org_Id};`;

            //     const updateOrganizationQ =
            //         await connection.execute(updateOrganization);
            //     const updateAdminIdOfOrgQ =
            //         await connection.execute(updateAdminIdOfOrg);

            //     console.log({ earlierUserAdminOrg: earlierUserAdminOrg });
            //     let oldAdminAssociatedToOrg = oldOrgData[0][0];
            // } else {
            //     if (userFromDB.org_Id != user.org_Id) {
            //     }
            // }

            // if(userFromDB.org_Id
            // const updateEarlierUser =
            // let adminId = (userCreate as mysql.ResultSetHeader).insertId;
            // const updateOrganization = `Update Organization set adminId = ${user.id} where id = ${user.org_Id};`;
            // const [orgResp] = await connection.execute(updateOrganization);
            await connection.commit();
            return { userUpdate };
        } catch (e) {
            throw new Error(e);
        } finally {
            await connection.rollback();
        }
    } catch (e) {
        throw new Error(e);
    } finally {
        if (connection) connection.release();
    }
};

export const deleteUser = async (id) => {
    const connection = await getDbConnection(); // get connections
    try {
        connection.beginTransaction();
        try {
            const deleteUser = `update user set isActive = 0, org_Id = 0 where id = ${id}`;
            const removeUser = `update organization set adminId = 0 where adminId = ${id};`;
            const delete1 = await connection.query(deleteUser);
            const delete2 = await connection.query(removeUser);
            connection.commit();
            return [delete1, delete2];
        } catch (e) {
            connection.rollback();
            throw new Error(e);
        }
    } catch (e) {
        throw new Error(e);
    } finally {
        if (connection) connection.release();
    }
};
