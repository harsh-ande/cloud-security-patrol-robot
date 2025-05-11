import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { getOrganizations } from "apiRoutes/organizationRoute";
import { createUser } from "apiRoutes/userRoute";
const CreateUserPopup = () => {
  const [open, setOpen] = useState(false);
  // const user = JSON.parse(localStorage.getItem(user));
  const [orgs, setOrgs] = useState([]);
  const getOrganizationEffectFunc = async () => {
    let organizations = await getOrganizations();
    console.log({ organizations });
    organizations = organizations;
    setOrgs(organizations);
    console.log({ organizations });
  };
  useEffect(() => {
    getOrganizationEffectFunc();
    return;
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    // userType: "",
    // org_Id: "",
  });

  const handleUserCreateChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createUser(formData);
      console.log({ data });
    } catch (e) {
      alert("Server Error");
    }
    setFormData({
      userName: "",
      email: "",
      password: "",
      userType: "",
      org_Id: "",
    });
  };

  const handleClickOpen = () => {
    // if (user && user.userType == "ADMIN" && user.userType == "SUPER_ADMIN") {
    setOpen(true);
    // } else {
    //   alert("Invalid user Access !");
    // }
  };
  // Function to update a specific key in the formData object
  const updateField = (key, value) => {
    setFormData((prevState) => ({
      ...prevState, // spread in the previous state
      [key]: value, // update only the specified key
    }));
  };

  const handleClose = async () => {
    console.log({ formData });
    await handleUserCreateSubmit();
    setOpen(false);
  };

  return (
    <div>
      <MDButton variant="contained" onClick={handleClickOpen}>
        create User
      </MDButton>
      <Dialog open={open} sx={{ m: "auto" }}>
        <MDButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          Close
        </MDButton>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="User Name"
                    id="userName"
                    name="userName"
                    onChange={(e) => updateField("userName", e.target.value)}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="User Email"
                    id="email"
                    name="email"
                    onChange={(e) => updateField("email", e.target.value)}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="User password"
                    id="password"
                    name="password"
                    onChange={(e) => updateField("password", e.target.value)}
                    fullWidth
                  />
                </MDBox>

                {/* <MDBox mb={2}>
                  <label style={{ fontSize: "14px" }}>Select userType</label>
                  <select
                    style={{ width: "100%", height: "30px" }}
                    id="org_Id"
                    name="org_Id"
                    value={formData.userType}
                    onChange={(e) => updateField("userType", e.target.value)}
                    label="Select userType"
                    defaultValue=""
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
                </MDBox> */}
                {/* <MDBox mb={2}>
                  <label style={{ fontSize: "14px" }}>Select Organization</label>
                  <select
                    style={{ width: "100%", height: "30px" }}
                    id="org_Id"
                    name="org_Id"
                    value={formData.org_Id}
                    onChange={(e) => updateField("org_Id", e.target.value)}
                    label=""
                    defaultValue=""
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
                </MDBox> */}
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" onClick={handleClose} fullWidth>
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

export default CreateUserPopup;
