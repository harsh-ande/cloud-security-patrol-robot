import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CreateOrganizationPopup from "examples/popup/createOrganization";
import ExportOrgPopup from "../../examples/popup/exportorg";
import MDButton from "components/MDButton";
// Data
import { useState, useEffect, useMemo } from "react";
import { getOrganizations } from "apiRoutes/organizationRoute";
import MDBadge from "./../../components/MDBadge";
import EditOrganizationPopup from "./../../examples/popup/editOrganization";
import { getAllUsers } from "apiRoutes/userRoute";
import { Link } from "react-router-dom";
import MoreInfoButton from "examples/icons/icons";
import { setCommonHeaders } from "apiRoutes/apiClient";

const Author = ({ image, name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);

const Job = ({ title, description }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
      <a href="/">{title}</a>
    </MDTypography>
    <MDTypography variant="caption">{description}</MDTypography>
  </MDBox>
);

function OrganizationTable() {
  setCommonHeaders();

  let columns = [
    { Header: "Organization", accessor: "organization", align: "left" },
    { Header: "Admin", accessor: "Admin", align: "left" },
    { Header: "created At", accessor: "createdAt", align: "left" },
    { Header: "status", accessor: "status", align: "left" },
    { Header: "# Staff", accessor: "users", align: "left" },

    { Header: "Edit Detail", accessor: "action", align: "left" },
    { Header: "View Analysis", accessor: "orgAnalysis", align: "left" },
  ];
  let [rows, setRows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  let tempAllUserData = [];
  const [isExportPopupOpen, setIsExportPopupOpen] = useState(false); // State for Export Popup

  const openExportPopup = () => setIsExportPopupOpen(true); // Open Export Popup
  const closeExportPopup = () => setIsExportPopupOpen(false); // Close Export Popup

  const useEffectFunction = async () => {
    const getAllUserFunc = async () => {
      try {
        const response = await getAllUsers();
        console.log("awaited getAllUsers");
        console.log({ response });
        if (response != null) {
          tempAllUserData = response.data.data[0];
          setAllUsers(response.data.data[0]);
        }
      } catch (err) {
        throw new Error(err);
      }
    };
    await getAllUserFunc();

    let organizations = await getOrganizations();
    organizations = organizations.data[0];
    let row = [];
    for (let org of organizations) {
      console.log({ org });
      row.push({
        Admin: <Author name={org.userName} email={org.email} />,
        organization: (
          <Job title={org.organizationName} description={org.id + " : " + org.organizationName} />
        ),
        status: (
          <MDBox ml={-1}>
            {/* <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" /> */}
            <MDBadge
              badgeContent={org.organizationIsActive == 1 ? "Active" : "Inactive"}
              color={org.organizationIsActive == 1 ? "success" : "error"}
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        users: org.userCount,
        action: <EditOrganizationPopup org={org} allUsers={tempAllUserData} />,

        orgAnalysis: (
          <Link to={`/organization/${org.id}`}>
            <MoreInfoButton />
          </Link>
        ),
      });
    }
    setRows(row);

    return () => {};
  };
  useEffect(() => {
    useEffectFunction();
    return;
  }, [2]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container spacing={6}>
                  <Grid item xs={12} xm={6} xl={6}>
                    <MDTypography variant="h3" color="white">
                      Organization Table
                    </MDTypography>
                  </Grid>
                  <Grid className="App" item xs={6} xm={3} xl={3} textAlign={"right"}>
                    <CreateOrganizationPopup allUsers={allUsers} />
                  </Grid>
                  {/* Export Organization Button */}
                  <Grid item xs={6} xm={3} xl={3} textAlign={"right"}>
                    <MDButton variant="contained" color="white" onClick={openExportPopup}>
                      Export Organization
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
      {/* Export Organization Popup */}
      {isExportPopupOpen && <ExportOrgPopup open={isExportPopupOpen} onClose={closeExportPopup} />}
    </DashboardLayout>
  );
}

export default OrganizationTable;
