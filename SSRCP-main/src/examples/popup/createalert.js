import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import axios from "axios";

const CreateAlertPopup = ({ onClose }) => {
  const [form, setForm] = useState({
    robot_id: "",
    alert_type: "",
    description: "",
    severity: "info",
  });

  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/alerts", form);
      openSuccessSB();
      onClose();
    } catch (err) {
      openErrorSB();
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create Alert</DialogTitle>
      <DialogContent>
        <MDBox mb={2}>
          <MDInput
            label="Robot ID"
            name="robot_id"
            type="number"
            value={form.robot_id}
            onChange={handleChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="Alert Type"
            name="alert_type"
            value={form.alert_type}
            onChange={handleChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <label>Severity</label>
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            style={{ width: "100%", height: "30px" }}
          >
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </MDBox>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={handleSubmit} color="info">
          Create
        </MDButton>
        <MDButton onClick={onClose} color="secondary">
          Cancel
        </MDButton>
      </DialogActions>
      <MDSnackbar
        color="success"
        title="Alert Created"
        content="The alert was successfully created."
        open={successSB}
        onClose={closeSuccessSB}
        close={closeSuccessSB}
      />
      <MDSnackbar
        color="error"
        title="Creation Failed"
        content="Failed to create the alert."
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
      />
    </Dialog>
  );
};

export default CreateAlertPopup;
