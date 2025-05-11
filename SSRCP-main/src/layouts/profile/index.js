import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import RobotListing from "layouts/profile/RobotListing";
import Header from "layouts/profile/components/Header";
import profilesListData1 from "layouts/profile/data/profilesListData1";
import profilesListData2 from "layouts/profile/data/profilesListData2";
import profilesListData3 from "layouts/profile/data/profilesListData3";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "apiRoutes/userRoute";
import { setCommonHeaders } from "apiRoutes/apiClient";
function Overview() {
  setCommonHeaders();
  const userId = useParams().userId;
  let [user, setUser] = useState({});
  // let user = {};
  console.log({ userId });
  useEffect(() => {
    const getUserInfo = async () => {
      console.log({ user });
      let userInfo = await getUserById(userId);
      console.log({ user: userInfo.data.data });
      setUser(userInfo.data.data);
    };
    getUserInfo();
    return () => {};
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header user={user}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description=""
                info={{
                  fullName: user?.userName || "Mitansh",
                  email: user?.email || "mg@gmail.com",
                  lastUpdated: user?.last_updated || "10/10/2022",
                  organization: user?.organizationName || "SJSU",
                }}
                social={[]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
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
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
