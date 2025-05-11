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
import React, { Component, lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RobotListing from "layouts/profile/RobotListing";
import profilesListData1 from "layouts/profile/data/profilesListData1";
import profilesListData2 from "layouts/profile/data/profilesListData2";
import profilesListData3 from "layouts/profile/data/profilesListData3";
import MDButton from "components/MDButton";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import masterCardLogo from "assets/images/carImage.jpg";
import MapComponent from "components/GoogleMap/MapComponent";
import VideoPlayer from "components/VideoStream/videoStream";
import { setCommonHeaders } from "apiRoutes/apiClient";
import { fetchRobot } from "apiRoutes/robotRoute";
import { fetchLast10Entries } from "apiRoutes/robotRoute";
const Projects = lazy(() => import("layouts/dashboard/components/Projects"));

function mapsComponenet() {
  return (
    <MDBox>
      <MapComponent />
    </MDBox>
  );
}

function robotLogs() {
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

function videoStream() {
  return (
    <MDBox width={"100%"} height={"100%"}>
      <VideoPlayer videoId={1}></VideoPlayer>
    </MDBox>
  );
}

// const fetchStreamingData = async (userId,topCam,frontCam,carlaActorId) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/control/fetchVehicleInfo?userId=${userId}&topCam=${topCam}&frontCam=${frontCam}&vehicleId=${carlaActorId}`, {
//       headers: {
//         Accept: "text/event-stream", // Request streaming data
//       },
//       responseType: "stream", // Important for handling streams
//     });

//     console.log("Connected to stream. Logging data...");
//     let body = "";
//     const boundary = "--frame\r\n";

//     response.data.on("data", (chunk) => {
//       try {
//         body += chunk.toString();
//         console.log({ body });

//         const chunkString = chunk.toString();
//         console.log({ chunkString });
//       } catch (err) {
//         console.error("Error parsing data chunk:", err.message);
//       }
//     });

//     response.data.on("end", () => {
//       console.log("Stream ended.");
//     });
//   } catch (error) {
//     console.error("Error fetching streaming data:", error.message);
//   }
// };

function RobotDashboard() {
  console.log({ useParams: useParams() });
  const { id } = useParams();
  let mySqlRobotId = id;
  let [robotData, setRobotData] = useState({});
  let [count, setCount] = useState(0);
  let [dataObj, setDataObj] = useState({});

  const [locArray, setLocArray] = useState([]);
  const [pitchArray, setPitchArray] = useState([]);
  const [yawArray, setYawArray] = useState([]);
  const [rollArray, setRollArray] = useState([]);
  const [throttleArray, setThrottleArray] = useState([]);
  const [accelerationArray, setAccelerationArray] = useState([]);
  const [velocityArray, setVelocityArray] = useState([]);

  const fetchRobotStreamData = async (robotId, actorId, userId) => {
    console.log({ robotId, actorId, userId });
    let result = await fetchLast10Entries({ robotId, actorId, userId });
    result = result.data.data;
    console.log({ result });
    // Set state with extracted arrays
    setLocArray(result.locData);
    setPitchArray(result.pitchData);
    setYawArray(result.yawData);
    setRollArray(result.rollData);
    setThrottleArray(result.throttleData);
    setAccelerationArray(result.accelerationData);
    setVelocityArray(result.velocityData);
  };

  const fetchRobotData = async () => {
    let data = await fetchRobot(mySqlRobotId);
    setRobotData(data.data.data[0][0]);
    console.log({ mitansh: data.data.data[0][0] });
    await fetchRobotStreamData(
      mySqlRobotId,
      data.data.data[0][0].robotId,
      data.data.data[0][0].userId
    );
  };

  useEffect(() => {
    const fetchData = () => {
      fetchRobotData();
    };
    const interval = setInterval(fetchData, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  setCommonHeaders();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(event);
  const [places, setPlaces] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={1.5}>
            <MDBox mb={1.5} height={"6rem"}>
              <img
                style={{
                  borderRadius: "5 px",
                  width: "100%",
                  height: "100%",
                  // objectFit: "cover",
                  // objectPosition: "center",
                }}
                src={masterCardLogo}
              ></img>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2.2}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Name"
                  count={
                    "(" +
                    robotData.robot_id +
                    "-CS" +
                    robotData.robotId +
                    ") " +
                    robotData.robot_modelName
                  }
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  color={parseInt(robotData.healthStatus) > 75 ? "success" : "error"}
                  icon="info"
                  title="Health"
                  count={
                    parseInt(robotData.healthStatus) > 75
                      ? "success (" + robotData.healthStatus + ")"
                      : "error (" + robotData.healthStatus + ")"
                  }
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={1.5}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  color={parseInt(robotData.robot_isActive) == 1 ? "warning" : "error"}
                  icon="info"
                  title="Mode"
                  count={parseInt(robotData.robot_isActive) == 1 ? "Running" : "Resting"}
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  color="dark"
                  icon="business"
                  title="Owner"
                  count={robotData.userId + "-" + robotData.userName}
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={1.5}>
            <MDBox mb={1.5}>
              <Suspense>
                <ComplexStatisticsCard
                  color="light"
                  icon="work"
                  title="Organization"
                  count={"(02)SJSU"}
                  percentage={{}}
                />
              </Suspense>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
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
      </MDBox> */}
      <MDBox py={3}>
        <AppBar position="static">
          <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
            <Tab
              p={10}
              m={10}
              label="Dashboard Analysis"
              onClick={() => {
                handleSetTabValue(0);
              }}
            />
            <Tab
              p={10}
              m={10}
              label="Maps"
              onClick={() => {
                handleSetTabValue(1);
              }}
            />
            <Tab
              label="Logs"
              p={10}
              m={10}
              onClick={() => {
                handleSetTabValue(2);
              }}
            />
            <Tab
              label="Video Stream"
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
      {tabValue == 0 ? (
        <Suspense>
          {/* // Mater÷ial Dashboard 2 React Examples import DefaultLineChart from */}
          {/* "examples/Charts/LineCharts/DefaultLineChart"; */}
          <MDBox>
            <Grid container mt={"1rem"} mb={"3rem"}>
              <Grid item xs={12} lg={6} p={"10px"} height={"14rem"}>
                <DefaultLineChart
                  height={"100%"}
                  icon={{ color: "info", component: "speed" }}
                  title="Speed"
                  description="Speed Analysis"
                  chart={{
                    labels: ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0"],
                    datasets: [
                      {
                        label: "Direct",
                        color: "info",
                        data: velocityArray,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6} p={"10px"} height={"14rem"}>
                <DefaultLineChart
                  height={"100%"}
                  icon={{ color: "primary", component: "speed" }}
                  title="Acceleration"
                  description="Acceleration Analysis"
                  chart={{
                    labels: ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0"],
                    datasets: [
                      {
                        label: "Direct",
                        color: "primary",
                        data: accelerationArray
                          ? accelerationArray
                          : [40, 80, 70, 90, 30, 90, 140, 130, 200, 40],
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox>
            <Grid container mt={"1rem"} mb={"3rem"}>
              <Grid item xs={12} lg={6} p={"10px"} height={"14rem"}>
                <DefaultLineChart
                  height={"100%"}
                  icon={{ color: "secondary", component: "speed" }}
                  title="Yaw"
                  description="Yaw Analysis"
                  chart={{
                    labels: ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0"],
                    datasets: [
                      {
                        label: "Direct",
                        color: "secondary",
                        data: yawArray,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6} p={"10px"} height={"14rem"}>
                <DefaultLineChart
                  height={"100%"}
                  icon={{ color: "success", component: "speed" }}
                  title="Throttle"
                  description="Throttle Analysis"
                  chart={{
                    labels: ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0"],
                    datasets: [
                      {
                        label: "Direct",
                        color: "success",
                        data: throttleArray,
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox>
            <Grid container mt={"1rem"} mb={"3rem"}>
              <Grid item xs={12} lg={6} p={"10px"} height={"14rem"}>
                <DefaultLineChart
                  height={"100%"}
                  icon={{ color: "default", component: "speed" }}
                  title="Roll"
                  description="Roll Analysis"
                  chart={{
                    labels: ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0"],
                    datasets: [
                      {
                        label: "Direct",
                        color: "default",
                        data: rollArray,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6} p={"10px"} height={"14rem"}>
                <DefaultLineChart
                  height={"100%"}
                  icon={{ color: "warning", component: "speed" }}
                  title="Pitch"
                  description="Pitch Analysis"
                  chart={{
                    labels: ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0"],
                    datasets: [
                      {
                        label: "Direct",
                        color: "warning",
                        data: pitchArray,
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Suspense>
      ) : tabValue == 1 ? (
        mapsComponenet()
      ) : tabValue == 2 ? (
        robotLogs()
      ) : (
        videoStream()
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default RobotDashboard;

/*
  const [pitchArray, setPitchArray] = useState([]);
  const [yawArray, setYawArray] = useState([]);
  const [rollArray, setRollArray] = useState([]);
  const [throttleArray, setThrottleArray] = useState([]);
*/
