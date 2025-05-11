import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { createOrganization } from "apiRoutes/organizationRoute";
import MDSnackbar from "components/MDSnackbar";

const CreateOrganizationPopup = ({ allUsers }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    organizationName: "",
    adminId: "",
  });
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmitOrganization = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
    try {
      // const data = await createOrganization(form);
      setSuccessSB(true);
    } catch (e) {
      setErrorSB(true);

      alert("Server Error :");
    }
    // Reset the form fields if desired
    setForm({
      organizationName: "",
      adminId: "",
    });
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to update a specific key in the formData object
  const updateField = (key, value) => {
    setForm((prevState) => ({
      ...prevState, // spread in the previous state
      [key]: value, // update only the specified key
    }));
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully Created"
      content={`The Organization is successfully created !`}
      dateTime=""
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="close"
      title="Internal Server Error"
      content={`Organization didn't created successfully !`}
      dateTime=""
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
    />
  );

  return (
    <div>
      {renderSuccessSB}
      {renderErrorSB}
      <MDButton variant="contained" onClick={handleClickOpen}>
        create Organization
      </MDButton>
      <Dialog open={open} sx={{ m: "auto" }}>
        <MDButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          Close
        </MDButton>
        <DialogTitle>Create Organization</DialogTitle>
        {/* <MDTypography variant="h6" fontWeight="light" color="error" sx={{ mx: 3 }}>
          User not in Admin dropDown? <br></br> Please{" "}
          <a href="">
            <u>create User</u>
          </a>{" "}
          and then come back to create the organization.
        </MDTypography> */}
        <DialogContent>
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={form.organizationName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                    label="Organization Name"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "14px" }}>Select Admin</label>
                  <select
                    select
                    style={{ width: "100%", height: "30px" }}
                    id="adminId"
                    name="adminId"
                    value={form.adminId}
                    onChange={(e) => updateField("adminId", e.target.value)}
                    required
                    label="Select Admin"
                    fullWidth
                    variant="standard"
                  >
                    {allUsers.map((option) => (
                      <option key={option.email} value={option.id}>
                        {option.userName} : {option.email}
                      </option>
                    ))}
                  </select>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={handleSubmitOrganization}
                    fullWidth
                  >
                    create
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

export default CreateOrganizationPopup;
