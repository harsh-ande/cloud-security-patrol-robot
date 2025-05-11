import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import EditOrganizationPopup from "examples/popup/editUser";
import Profile from "layouts/profile";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "apiRoutes/userRoute";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreInfoButton from "./../../../examples/icons/icons";
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
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setRows(response.data.data[0]);
      console.log({ rows });
    };
    fetchUsers();
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

  return {
    columns: [
      { Header: "userId", accessor: "userId", align: "left" },
      { Header: "name", accessor: "userName", align: "left" },
      { Header: "email", accessor: "email", align: "left" },
      { Header: "type", accessor: "typeName", align: "left" },
      { Header: "organization", accessor: "organizationName", align: "left" },
      { Header: "last updated", accessor: "last_updated", align: "left" },
      { Header: "Active Status", accessor: "isActive", align: "left" },
      { Header: "Edit Detail", accessor: "action", align: "center" },
      { Header: "Info", accessor: "info", align: "left" },
    ],
    rows: rows.map((row) => {
      return {
        userId: String(row.id).padStart(5, "0"),
        userName: row.userName,
        email: row.email,
        typeName: row.typeName,
        organizationName: row.organizationName,
        last_updated: new Date(row.last_updated).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        // isActive: row.isActive ? (
        //   <MDButton color="info">Active</MDButton>
        // ) : (
        //   <MDButton color="error">InActive</MDButton>
        // ),
        isActive: (
          <Icon color={row.isActive ? "success" : "error"}>
            {row.isActive ? <CheckCircleIcon /> : <CancelIcon />}
          </Icon>
        ),
        // isActive: row.isActive,
        action: <EditOrganizationPopup user={row} />,
        // info: <NavLink to="/user">More Info</NavLink>,
        info: (
          <Link to={`/user/${row.id}`}>
            <MoreInfoButton />
          </Link>
          // <Routes>
          //   <Route exact path="/user" element={<Profile />} key="more info">
          //     more info
          //   </Route>
          // </Routes>
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
