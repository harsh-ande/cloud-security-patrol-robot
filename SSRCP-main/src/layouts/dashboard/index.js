import React, { useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import PieChart from "examples/Charts/PieChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import piechartData from "./data/piechartData";
import MDTypography from "components/MDTypography";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { lazy, Suspense, useState } from "react";
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
              title="# Organization"
              description="Status of Organizations"
              chart={piechartData}
            />
          </MDBox>
        </Grid>
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
              title="# Alerts"
              description="Alerts in Each Organization"
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

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(event);
  setCommonHeaders();

  // State for statistics
  const [statistics, setStatistics] = useState({
    organizations: 0,
    users: 0,
    robots: 0,
    alerts: 0,
  });

  // Fetch statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const orgResponse = await axios.get("/count/organizations");
        const userResponse = await axios.get("/count/users");
        const robotResponse = await axios.get("/count/robots");
        const alertResponse = await axios.get("/count/alerts");

        setStatistics({
          organizations: orgResponse.data.count,
          users: userResponse.data.count,
          robots: robotResponse.data.count,
          alerts: alertResponse.data.count,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);


  useEffect(() => {
    const fetchStream = async () => {
      const response = await fetch("http://localhost:5000/control/createCar");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        console.log("Chunk received:", chunk);
      }
    };

    fetchStream().catch(console.error);
  }, []);

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
                  color="dark"
                  icon="business"
                  title="# Organizations"
                  count={statistics.organizations}
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
                  title="# Users"
                  count={statistics.users}
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
                  count={statistics.robots}
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
                  title="# Alerts"
                  count={statistics.alerts}
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <AppBar position="static">
          <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
            <Tab
              p={10}
              m={10}
              label="Pie Charts Analytics"
              onClick={() => {
                handleSetTabValue(0);
              }}
            />
            <Tab
              label="Bar Chart Analytics"
              p={10}
              m={10}
              onClick={() => {
                handleSetTabValue(1);
              }}
            />
            <Tab
              label="Security Threats Analytics"
              p={10}
              m={10}
              onClick={() => {
                handleSetTabValue(2);
              }}
            />
          </Tabs>
        </AppBar>
      </MDBox>
      {/* ENDING of 4 rectangular counting */}
      {tabValue == 0
        ? pieChartsComponent()
        : tabValue == 1
        ? lineChartComponent()
        : securityThreatsLogs()}

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
