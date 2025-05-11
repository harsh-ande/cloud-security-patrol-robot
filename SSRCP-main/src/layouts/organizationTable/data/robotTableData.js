import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import EditRobotPopup from "examples/popup/editRobot";
import Profile from "layouts/profile";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreInfoButton from "../../../examples/icons/icons";
import { getAllRobots } from "apiRoutes/robotRoute";
import Header from "layouts/profile/components/Header";
export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src ={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  let [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchRobot = async () => {
      const response = await getAllRobots();
      setRows(response.data.data[0]);
      console.log(response);
      console.log({ rows });
    };
    fetchRobot();
  }, []);

  useEffect(() => {
    return;
  }, []);

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        <a href="/">{title}</a>
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  /**
   * 
   * 
{
  "robot_id": 1,
  "robot_modelName": "Robot-X1",
  "simulationSession": 101,
  "version": 1.0,
  "healthStatus": 95,
  "robot_isActive": 1,
  "userId": 1,
  "userName": "JohnDoe",
  "email": "johndoe@example.com",
  "userType": "Admin",
  "organizationId": 1,
  "organizationName": "TechCorp"
}
   * 
   */
  return {
    columns: [
      { Header: "RobotId", accessor: "robot_id", align: "left" },
      { Header: "Name", accessor: "robot_modelName", align: "left" },
      { Header: "SimulatorId", accessor: "simulationSession", align: "left" },
      { Header: "Owner", accessor: "owner", align: "left" },
      { Header: "Organization", accessor: "organization", align: "center" },
      { Header: "version", accessor: "version", align: "left" },
      { Header: "isActive", accessor: "robot_isActive", align: "left" },
      { Header: "HealthStatus", accessor: "healthStatus", align: "left" },
      { Header: "Action", accessor: "action", align: "left" },
      { Header: "Info", accessor: "info", align: "left" },
    ],
    rows: rows.map((row) => {
      return {
        robot_id: String(row.robot_id).padStart(5, "0"),
        robot_modelName: row.robot_modelName,
        simulationSession: row.simulationSession,
        owner: `${row.userName} | ${row.email}`,
        organization: row.organizationName,
        version: row.version,

        robot_isActive: (
          <Icon color={row.robot_isActive ? "success" : "error"}>
            {row.robot_isActive ? <CheckCircleIcon /> : <CancelIcon />}
          </Icon>
        ),

        healthStatus: row.healthStatus,

        action: <EditRobotPopup robot={row}></EditRobotPopup>,
        info: (
          <Link to={`/robot/${row.robot_id}`}>
            <MoreInfoButton />
          </Link>
        ),
      };
    }),
  };
}

// rows: [
//   {
//     Admin: <Author name="John Michael" email="john@creative-tim.com" />,
//     organization: (
//       <Job
//         title="Manag                                                                                                                                                               er"
//         description="Organization"
//       />
//     ),
//     status: (
//       <MDBox ml={-1}>
//         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//       </MDBox>
//     ),
//     createdAt: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         23/04/18
//       </MDTypography>
//     ),
//     users: <>USeer Component to create</>,
//     action: <EditOrganizationPopup />,

//     orgAnalysis: <>organization detail page todo</>,
//   },
//   {
//     Admin: <Author name="Alexa Liras" email="alexa@creative-tim.com" />,
//     organization: <Job title="Programator" description="Developer" />,
//     status: (
//       <MDBox ml={-1}>
//         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//       </MDBox>
//     ),
//     createdAt: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         11/01/19
//       </MDTypography>
//     ),
//     users: <>USeer Component to create</>,
//     action: <EditOrganizationPopup />,

//     orgAnalysis: <>organization detail page todo</>,
//   },
//   {
//     Admin: <Author name="Laurent Perrier" email="laurent@creative-tim.com" />,
//     organization: <Job title="Executive" description="Projects" />,
//     status: (
//       <MDBox ml={-1}>
//         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//       </MDBox>
//     ),
//     createdAt: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         19/09/17
//       </MDTypography>
//     ),
//     users: <>USeer Component to create</>,
//     action: <EditOrganizationPopup />,

//     orgAnalysis: <>organization detail page todo</>,
//   },
//   {
//     Admin: <Author name="Michael Levi" email="michael@creative-tim.com" />,
//     organization: <Job title="Programator" description="Developer" />,
//     status: (
//       <MDBox ml={-1}>
//         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//       </MDBox>
//     ),
//     createdAt: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         24/12/08
//       </MDTypography>
//     ),
//     users: <>USeer Component to create</>,
//     action: <EditOrganizationPopup />,

//     orgAnalysis: <>organization detail page todo</>,
//   },
//   {
//     Admin: <Author name="Richard Gran" email="richard@creative-tim.com" />,
//     organization: <Job title="Manager" description="Executive" />,
//     status: (
//       <MDBox ml={-1}>
//         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//       </MDBox>
//     ),
//     createdAt: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         04/10/21
//       </MDTypography>
//     ),
//     users: <>USeer Component to create</>,
//     action: <EditOrganizationPopup />,

//     orgAnalysis: <>organization detail page todo</>,
//   },
//   {
//     Admin: <Author name="Miriam Eric" email="miriam@creative-tim.com" />,
//     organization: <Job title="Programator" description="Developer" />,
//     status: (
//       <MDBox ml={-1}>
//         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//       </MDBox>
//     ),
//     createdAt: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         14/09/20
//       </MDTypography>
//     ),
//     users: <>USeer Component to create</>,
//     action: <EditOrganizationPopup />,

//     orgAnalysis: <>organization detail page todo</>,
//   },
// ],
