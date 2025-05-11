export const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    userType INT,
    org_Id INT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (userType) REFERENCES UserType(id)
);
`;
export const createUserTypeTableQuery1 = `
CREATE TABLE IF NOT EXISTS UserType (
    id INT PRIMARY KEY,
    typeName VARCHAR(50) NOT NULL
);
`;
export const createUserTypeTableQuery2 = `
INSERT INTO UserType (id, typeName) VALUES
    (1, 'Super Admin'),
    (2, 'Organization Admin'),
    (3, 'Staff Users')
ON DUPLICATE KEY UPDATE typeName=VALUES(typeName);
`;

export const createORganizationTable = `
CREATE TABLE IF NOT EXISTS Organization (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizationName VARCHAR(255) NOT NULL,
    adminId INT,
    isActive TINYINT(1) DEFAULT 1,
    FOREIGN KEY (adminId) REFERENCES user(id)
);

`;

export const createRobotTable = `
CREATE TABLE IF NOT EXISTS Robot (
    id INT PRIMARY KEY AUTO_INCREMENT,
    modelName varchar(100),
    simulationSession int,
    version double,
    healthStatus int,
    isActive int,
    ownerId int
);
`;

export const createSimulationTable = `
CREATE TABLE IF NOT EXISTS Organization (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organizationName VARCHAR(100) NOT NULL,
    adminId INT
);
`;

export const createAlertTableQuery = `
CREATE TABLE IF NOT EXISTS Alert (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    robot_id INT,
    alert_type VARCHAR(50) NOT NULL,
    description TEXT,
    severity ENUM('critical', 'warning', 'info') NOT NULL,
    status ENUM('generated', 'acknowledged', 'resolved') DEFAULT 'generated',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_by INT,
    resolution_time TIMESTAMP NULL,
    FOREIGN KEY (resolved_by) REFERENCES User(id)
);
`;
