export const OrganizationSeederData = `
-- Insert organizations with isActive status
INSERT INTO Organization (organizationName, adminId, isActive) VALUES
('Tech Corp', 1, 1),
('Health Solutions', 2, 1),
('EduWorld', 3, 1),
('Green Energy', 4, 1),
('FinTech Solutions', 8, 1),
('EcoWorld', 10, 0),
('Smart Homes Inc.', 12, 1),
('AgriTech', 14, 1),
('FutureTech', 16, 1),
('Bright Minds', 18, 1),
('Medicare Plus', 20, 0),
('GreenFuture', 22, 1),
('Tech Innovations', 24, 1),
('Global Security Inc.', 26, 1);

`;

export const UserSeederData = `-- Insert users with userType 2 (Organization Admin) and 3 (Staff User)
INSERT INTO user (userName, email, password, userType, org_Id, last_updated, isActive) VALUES
('Mitansh Gor', 'mitansh.gor@sjsu.edu', 'Mitansh', 1, 0, '2024-11-11 22:11:43', 1),
('Pavithra', 'pavithra@sjsu.edu', 'Pavithra', 2, 2, '2024-11-11 00:48:12', 1),
('Deep', 'deep@sjsu.edu', 'Deep', 3, 0, '2024-11-13 12:44:01', 1),
('Lucy', 'lucy@eduworld.com', 'Lucy', 2, 4, '2024-11-11 00:48:12', 1),
('emma_staff', 'emma@greenenergy.com', 'greenpass', 3, 0, '2024-11-11 22:11:43', 0),
('John Doex', 'jd@gmail.com', 'JohnDoe', 3, 0, '2024-11-11 22:11:43', 0),
('Shruti Gor', 'shruti@gmail.com', 'Shruti', 3, 0, '2024-11-11 22:11:43', 0),
('Alex Brown', 'alex.brown@fintech.com', 'alex123', 2, 5, '2024-11-12 15:00:00', 1),
('Maya Singh', 'maya.singh@ecoworld.com', 'maya123', 2, 6, '2024-11-12 16:00:00', 1),
('Chris Stone', 'chris.stone@smarthomes.com', 'chris123', 2, 7, '2024-11-12 17:00:00', 1),
('Nina Patel', 'nina.patel@agritech.com', 'nina123', 2, 8, '2024-11-12 18:00:00', 1),
('Oliver Twist', 'oliver@futuretech.com', 'oliver123', 2, 9, '2024-11-12 19:00:00', 1),
('Emma Black', 'emma.black@brightminds.com', 'emma123', 2, 10, '2024-11-12 20:00:00', 1),
('Sara Lee', 'sara.lee@medicare.com', 'sara123', 2, 11, '2024-11-12 21:00:00', 1),
('Tom Hanks', 'tom.hanks@greenfuture.com', 'tom123', 2, 12, '2024-11-12 22:00:00', 1),
('Jake Roberts', 'jake@techinnovations.com', 'jake123', 2, 13, '2024-11-12 23:00:00', 1),
('Laura Kim', 'laura.kim@globalsecurity.com', 'laura123', 2, 14, '2024-11-12 14:00:00', 1),

-- Staff users
('Blake Lee', 'blake.lee@fintech.com', 'blakepass', 3, 5, '2024-11-12 15:10:00', 1),
('Rachel Green', 'rachel.green@ecoworld.com', 'rachelpass', 3, 6, '2024-11-12 16:10:00', 1),
('Tom Cruz', 'tom.cruz@smarthomes.com', 'tompass', 3, 7, '2024-11-12 17:10:00', 1),
('Sam Knight', 'sam.knight@agritech.com', 'sampass', 3, 8, '2024-11-12 18:10:00', 1),
('Ben Long', 'ben.long@futuretech.com', 'benpass', 3, 9, '2024-11-12 19:10:00', 1),
('Eli Potter', 'eli.potter@brightminds.com', 'elipass', 3, 10, '2024-11-12 20:10:00', 1),
('Zara Scott', 'zara.scott@medicare.com', 'zarapass', 3, 11, '2024-11-12 21:10:00', 1),
('Phil Cooper', 'phil.cooper@greenfuture.com', 'philpass', 3, 12, '2024-11-12 22:10:00', 1),
('Liam Jones', 'liam.jones@techinnovations.com', 'liampass', 3, 13, '2024-11-12 23:10:00', 1),
('Eve Summers', 'eve.summers@globalsecurity.com', 'evepass', 3, 14, '2024-11-12 14:10:00', 1);
`;

export const robotSeederData = `INSERT INTO Robot (modelName, simulationSession, version, healthStatus, isActive, ownerId) VALUES
('Robot-X1', 101, 1.0, 95, 1, 1),
('Robot-X2', 102, 1.1, 89, 1, 2),
('Robot-Y3', 103, 2.0, 76, 1, 3),
('Robot-A1', 104, 1.5, 85, 1, 4),
('Robot-B4', 105, 2.1, 98, 0, 5),
('Robot-C2', 106, 1.9, 65, 1, 1),
('Robot-D3', 107, 2.2, 80, 1, 2),
('Robot-E5', 108, 1.3, 92, 1, 3),
('Robot-F6', 109, 1.7, 60, 0, 4),
('Robot-G8', 110, 2.5, 99, 1, 5);`;

export const alertSeederData = `
INSERT INTO Alert (robot_id, alert_type, description, severity, status, resolved_by, resolution_time)
VALUES
(1, 'Battery Low', 'Battery level critical at 5%', 'critical', 'generated', NULL, NULL),
(2, 'Obstacle Detected', 'Large object detected in path', 'warning', 'acknowledged', 3, '2024-12-01 15:30:00'),
(3, 'System Overheating', 'Core temperature exceeding safe limits', 'critical', 'resolved', 2, '2024-12-01 18:00:00');
`;
