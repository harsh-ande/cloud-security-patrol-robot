import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import axios from "axios";

const UpdateAlertPopup = ({ alert, onClose }) => {
  const [form, setForm] = useState({
    status: alert.status,
    resolved_by: alert.resolved_by,
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
      await axios.patch(`/alerts/${alert.alert_id}`, form);
      openSuccessSB();
      onClose();
    } catch (err) {
      openErrorSB();
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Update Alert</DialogTitle>
      <DialogContent>
        <MDBox mb={2}>
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{ width: "100%", height: "30px" }}
          >
            <option value="generated">Generated</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="Resolved By"
            name="resolved_by"
            type="number"
            value={form.resolved_by}
            onChange={handleChange}
            fullWidth
          />
        </MDBox>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={handleSubmit} color="info">
          Update
        </MDButton>
        <MDButton onClick={onClose} color="secondary">
          Cancel
        </MDButton>
      </DialogActions>
      <MDSnackbar
        color="success"
        title="Alert Updated"
        content="The alert was successfully updated."
        open={successSB}
        onClose={closeSuccessSB}
        close={closeSuccessSB}
      />
      <MDSnackbar
        color="error"
        title="Update Failed"
        content="Failed to update the alert."
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
      />
    </Dialog>
  );
};

export default UpdateAlertPopup;
