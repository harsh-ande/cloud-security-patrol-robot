import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import MDSnackbar from "components/MDSnackbar";
import { getOrganizations } from "apiRoutes/organizationRoute";
import { updateUserRoute } from "apiRoutes/userRoute";
import { deleteRobot } from "apiRoutes/robotRoute";
const EditRobotPopup = ({ robot }) => {
  console.log({ robot });
  const [orgs, setOrgs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const [editUserForm, setEditUserForm] = useState(robot);

  const getOrganizationEffectFunc = async () => {
    let organizations = await getOrganizations();
    organizations = organizations.data[0];
    setOrgs(organizations);
    console.log({ organizations });
  };

  useEffect(() => {
    getOrganizationEffectFunc();
    return;
  }, []);

  const updateField = (key, value) => {
    setEditUserForm((prevState) => ({
      ...prevState, // spread in the previous state
      [key]: value, // update only the specified key
    }));
    console.log({ editUserForm });
  };
  const updateUser = async () => {
    console.log({ editUserForm });
    const resp = await updateUserRoute(editUserForm);
    console.log({ resp });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    await updateUser();
    window.location.reload();
    setOpen(false);
  };
  const handleAlertOpen = () => {
    setOpenAlertBox(true);
  };

  const handleAlertClose = async () => {
    const deleteRoute = await deleteRobot(robot.robotId, robot.robot_id);
    openSuccessSB(true);
    setOpenAlertBox(false);
    // window.location.reload();
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully Deleted"
      content={`The user (${robot.robot_modelName}) has been successfully deleted !`}
      dateTime=""
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
    />
  );

  return (
    <div>
      <Grid container spacing={1} justifyContent="center">
        {/* <Grid item>
          <MDButton color="info" onClick={handleClickOpen}>
            Edit
          </MDButton>
        </Grid> */}
        <Grid item>
          <MDButton
            color="primary"
            onClick={() => {
              setOpenAlertBox(true);
            }}
          >
            Delete
          </MDButton>
          {/* <Grid item>
            <MDButton color="secondary" onClick={handleClickOpen}>
              Info
            </MDButton>
          </Grid> */}
        </Grid>
      </Grid>

      <Dialog open={openAlertBox} onClose={handleClose}>
        <DialogTitle>{"Require Confirmation !"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please agree to permanently delete the{" "}
            <u>
              <b>{robot.robot_modelName}</b>
            </u>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAlertBox(false);
            }}
            color="secondary"
          >
            Disagree
          </Button>
          <Button onClick={handleAlertClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} sx={{ m: "auto" }}>
        <MDButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          Close
        </MDButton>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="User Name"
                    onChange={(e) => updateField("userName", e.target.value)}
                    defaultValue={robot.robot_modelName}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="User Email"
                    onChange={(e) => updateField("email", e.target.value)}
                    defaultValue={robot.email}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="User password"
                    onChange={(e) => updateField("password", e.target.value)}
                    defaultValue=""
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "14px" }}>Select userType</label>
                  <select
                    style={{ width: "100%", height: "30px" }}
                    id="org_Id"
                    name="org_Id"
                    // value={editUserForm.userType}
                    onChange={(e) => updateField("userType", e.target.value)}
                    defaultValue={robot.userType}
                    fullWidth
                    helperText="Please select the type"
                    variant="standard"
                  >
                    <option key={"SUPER_ADMIN"} value={1}>
                      {"SUPER_ADMIN"}
                    </option>
                    <option key={"ORGANIZATION ADMIN"} value={2}>
                      {"ORGANIZATION ADMIN"}
                    </option>
                    <option key={"STAFF USER"} value={3}>
                      {"STAFF USER"}
                    </option>
                  </select>
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "14px" }}>Select Organization</label>
                  <select
                    style={{ width: "100%", height: "30px" }}
                    id="org_Id"
                    name="org_Id"
                    // value={editUserForm.org_Id}
                    onChange={(e) => updateField("org_Id", e.target.value)}
                    defaultValue={robot.org_Id}
                    fullWidth
                    helperText="Please select the organization"
                    variant="standard"
                  >
                    {orgs.map((option) => (
                      <option key={option.organizationName} value={option.id}>
                        {option.organizationName}
                      </option>
                    ))}
                  </select>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" onClick={handleClose} fullWidth>
                    Edit
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditRobotPopup;
