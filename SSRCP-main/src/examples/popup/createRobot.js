import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { getOrganizations } from "apiRoutes/organizationRoute";
import { createRobot } from "apiRoutes/robotRoute";
import { Create } from "@mui/icons-material";

const CreateRobotPopup = () => {
  const vehcicleList = {
    audi: "vehicle.audi.a2",
    mercedes: "vehicle.mercedes.sprinter",
    chevrolet: "vehicle.chevrolet.impala",
    citroen: "vehicle.citroen.c3",
    tesla: "vehicle.tesla.model3",
  };
  const [open, setOpen] = useState(false);

  const [robotForm, setRobotForm] = useState({});

  const handleUserCreateSubmit = async (e) => {
    try {
      console.log({ robotForm });
      const data = await createRobot(robotForm);
      console.log({ data });
    } catch (e) {
      alert("Server Error");
    }
    setRobotForm({
      model: "",
      id: robotForm.id,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  // Function to update a specific key in the robotForm object
  useEffect(() => {
    // console.log("Updated formData:", formData);
    console.log("Updated robotForm:", robotForm);
  }, [robotForm]);
  const updateField = (key, value) => {
    console.log({ key, value });
    setRobotForm((prevState) => {
      const newdata = {
        ...prevState, // spread in the previous state
        [key]: value, // update only the specified key
        id: JSON.parse(localStorage.getItem("user"))?.id || "1",
      };
      return newdata;
    });
    console.log({ robotForm });
  };

  const handleClose = async () => {
    console.log({ robotForm });
    await handleUserCreateSubmit();
    setOpen(false);
  };

  return (
    <div>
      <MDButton variant="contained" onClick={handleClickOpen}>
        create Robot
      </MDButton>
      <Dialog open={open} sx={{ m: "auto" }}>
        <MDButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          Close
        </MDButton>
        <DialogTitle>Create Robot</DialogTitle>
        <DialogContent>
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                {/* <MDBox mb={2}>
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
                </MDBox> */}

                <MDBox mb={2}>
                  <label style={{ fontSize: "14px" }}>Select Vehicle Model</label>
                  <select
                    style={{ width: "100%", height: "30px" }}
                    id="model"
                    name="model"
                    value={robotForm.model}
                    onChange={(e) => updateField("model", e.target.value)}
                    label="Select Model"
                    // variant="standard"
                  >
                    {Object.keys(vehcicleList).map((key) => (
                      <option key={key} value={vehcicleList[key]}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                      </option>
                    ))}
                  </select>
                </MDBox>
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

export default CreateRobotPopup;
