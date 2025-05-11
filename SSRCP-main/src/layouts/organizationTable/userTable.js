import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CreateUserPopup from "examples/popup/createUser";
import ExportUserPopup from "examples/popup/exportuser";

import data from "layouts/organizationTable/data/userTableData";
import { setCommonHeaders } from "apiRoutes/apiClient";

export default function UserTable() {
  let { columns, rows } = data();
  setCommonHeaders();
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
                      User Table
                    </MDTypography>
                  </Grid>
                  <Grid className="App" item xs={12} xm={6} xl={6} textAlign={"right"}>
                    <CreateUserPopup />
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
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
