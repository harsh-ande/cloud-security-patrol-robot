import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import loginRoute from "apiRoutes/login";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Grid } from "@mui/material";

function Basic() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginRoute(formData);
      console.log("After await data");
      console.log({ data });
      if (data) {
        navigate("/dashboard");
      } else {
        // console.log({ data });
        // openSuccessSB(true);
        navigate("/dashboard");
      }
    } catch (e) {
      // alert("Server Error");
      openSuccessSB(true);
    }
  };

  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="error"
      icon="close"
      title="Error Log in "
      content={`The Username or password is incorrect`}
      dateTime=""
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
    />
  );

  return (
    <BasicLayout image={bgImage}>
      {renderSuccessSB}
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
                label="email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                color="info"
                fullWidth
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox>
              <Grid container ml={9} columnGap={10}>
                <Grid list>
                  <MDTypography variant="h6">
                    <a href=""> Forgot Password?</a>
                  </MDTypography>
                </Grid>
                <Grid list>
                  <MDTypography variant="h6">{/* <a href=""> New User?</a> */}</MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
