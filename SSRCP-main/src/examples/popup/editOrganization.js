import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

import MDTypography from "components/MDTypography";
// import { getAllUsers } from "apiRoutes/userRoute";
import { editOrganizationRequest } from "apiRoutes/organizationRoute";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const EditOrganizationPopup = (props) => {
  let { org, allUsers } = props;
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(org.isActive);
  const [organizationName, setOrganizationName] = useState(org.organizationName);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editOrganizationDetail = async () => {
    await editOrganizationRequest(org, organizationName, isActive);
    handleClose();
  };

  return (
    <div style={{ border: "2px solid black" }}>
      <MDButton variant="contained" onClick={handleClickOpen}>
        Edit
      </MDButton>
      <Dialog open={open} sx={{ m: "auto" }} fullWidth>
        <MDButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          Close
        </MDButton>
        <DialogTitle>Edit Organization</DialogTitle>
        {/* <MDTypography variant="h6" fontWeight="light" color="error" sx={{ mx: 3 }}>
          User not in Admin dropDown? <br></br> Please{" "}
          <a href="">
            <u>create User</u>
          </a>{" "}
          and then come back to create the organization.
        </MDTypography> */}
        <DialogContent sx={{ borderColor: "error.main" }} fullWidth>
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Organization Name"
                    onChange={(e) => setOrganizationName(e.target.value)}
                    defaultValue={org.organizationName}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "14px" }}>Update Status</label>
                  <select
                    select
                    style={{ width: "100%", height: "30px" }}
                    id="isActive"
                    name="isActive"
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.value)}
                    required
                    label="Select status"
                    defaultValue=""
                    fullWidth
                    variant="standard"
                  >
                    <option key={true} value={1}>
                      True
                    </option>
                    <option key={false} value={0}>
                      False
                    </option>
                  </select>
                </MDBox>

                {/* <MDBox mb={2}>
                  <label style={{ fontSize: "14px" }}>Select Admin</label>
                  <select
                    select
                    style={{ width: "100%", height: "30px" }}
                    id="adminId"
                    name="adminId"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    required
                    label="Select Admin"
                    defaultValue=""
                    fullWidth
                    variant="standard"
                  >
                    {allUsers.map((option) => (
                      <option key={option.email} value={option.id}>
                        {option.userName} : {option.email}
                      </option>
                    ))}
                  </select>
                </MDBox> */}
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={editOrganizationDetail}
                    fullWidth
                  >
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

export default EditOrganizationPopup;
