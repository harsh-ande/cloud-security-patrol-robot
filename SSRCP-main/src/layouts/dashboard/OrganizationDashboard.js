import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import PieChart from "examples/Charts/PieChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import piechartData from "./data/piechartData";
import MDTypography from "components/MDTypography";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { lazy, Suspense, useState } from "react";
import RobotListing from "layouts/profile/RobotListing";
import profilesListData1 from "layouts/profile/data/profilesListData1";
import profilesListData2 from "layouts/profile/data/profilesListData2";
import profilesListData3 from "layouts/profile/data/profilesListData3";
import MDButton from "components/MDButton";
import { setCommonHeaders } from "apiRoutes/apiClient";

const Projects = lazy(() => import("layouts/dashboard/components/Projects"));

function securityThreatsLogs() {
  return (
    <MDBox>
      {/* <Grid container spacing={3}> */}
      {/* <Grid item xs={12} md={12} lg={12}> */}
      <Suspense>
        <Projects />
      </Suspense>
      {/* </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4}>
        <OrdersOverview />
      </Grid> */}
      {/* </Grid> */}
    </MDBox>
  );
}
function pieChartsComponent() {
  return (
    <MDBox mt={4.5}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={2}>
            <PieChart
              color="primary"
              title="# Users"
              description="Users In Each Organization"
              date="campaign sent 30 days ago"
              chart={piechartData}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <PieChart
              color="primary"
              title="# Robots"
              description="Robots in Each Organization"
              date="campaign sent 30 days ago"
              chart={piechartData}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <PieChart
              color="primary"
              title="# Simulations"
              description="Simulations in Each Organization"
              date="campaign sent 30 days ago"
              chart={piechartData}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <PieChart
              color="primary"
              title="# Security Threats"
              description="Security Threats in Each Organization"
              date="campaign sent 30 days ago"
              chart={piechartData}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <PieChart
              color="primary"
              title="# Robot Status"
              description="Robot status in each organization"
              date="campaign sent 30 days ago"
              chart={piechartData}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function lineChartComponent() {
  const { sales, tasks } = reportsLineChartData;
  return (
    <Suspense>
      <MDTypography variant="h2" textTransform="capitalize" fontWeight="bold" color="info">
        Robots TimeLine
      </MDTypography>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Organization TimeLine"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="success"
                title="Simulators Timeline"
                description={
                  <>
                    (<strong>+15%</strong>) increase in today sales.
                  </>
                }
                date="updated 4 min ago"
                chart={sales}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="Security Threats Timeline"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Suspense>
  );
}

function dashboardComponent() {
  return (
    <Suspense>
      <MDBox>
        <Grid container>
          <Grid item xs={12} xl={4}>
            <RobotListing
              title="Associated Simulators"
              profiles={profilesListData1}
              shadow={true}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <RobotListing title="Associated Robots" profiles={profilesListData2} shadow={true} />
          </Grid>
          <Grid item xs={12} xl={4}>
            <RobotListing
              title="Associated Work Tickets"
              profiles={profilesListData3}
              shadow={true}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Suspense>
  );
}

function OrganizationDashboard() {
  setCommonHeaders();
  const { sales, tasks } = reportsLineChartData;
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(event);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* STARTING of 4 rectangular counting */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="# Users"
                  count="2,300"
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="# Simulations"
                  count="91"
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="# Robots"
                  count="34k"
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  color="dark"
                  icon="business"
                  title="# Work Tickets"
                  count={10}
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="warning">Update Admin</MDButton>
          </Grid>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="warning">Update User</MDButton>
          </Grid>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="warning">Update Robot</MDButton>
          </Grid>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="success">Add Staff</MDButton>
          </Grid>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="success">Setup Simu.</MDButton>
          </Grid>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="success">Add Robot</MDButton>
          </Grid>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="error">Delete User</MDButton>
          </Grid>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="error">Delete Simu.</MDButton>
          </Grid>
          <Grid item xs={12} md={6} lg={1.2}>
            <MDButton color="error">Delete Robot</MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <AppBar position="static">
          <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
            <Tab
              p={10}
              m={10}
              label="Listings"
              onClick={() => {
                handleSetTabValue(0);
              }}
            />
            <Tab
              p={10}
              m={10}
              label="Pie Charts Analytics"
              onClick={() => {
                handleSetTabValue(1);
              }}
            />
            <Tab
              label="Bar Chart Analytics"
              p={10}
              m={10}
              onClick={() => {
                handleSetTabValue(2);
              }}
            />
            <Tab
              label="Security Threats Analytics"
              p={10}
              m={10}
              onClick={() => {
                handleSetTabValue(3);
              }}
            />
          </Tabs>
        </AppBar>
      </MDBox>
      {/* ENDING of 4 rectangular counting */}
      {tabValue == 0
        ? dashboardComponent()
        : tabValue == 1
        ? pieChartsComponent()
        : tabValue == 2
        ? lineChartComponent()
        : securityThreatsLogs()}

      <Footer />
    </DashboardLayout>
  );
}

export default OrganizationDashboard;
