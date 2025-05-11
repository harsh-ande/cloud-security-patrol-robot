import React, { useState } from "react";
import MDButton from "components/MDButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

const ExportOrgPopup = ({ open, onClose }) => {
  const [format, setFormat] = useState("csv"); // Default to CSV
  const { enqueueSnackbar } = useSnackbar();

  const openSuccessSB = () => enqueueSnackbar("Export Successful", { variant: "success" });
  const openErrorSB = () => enqueueSnackbar("Export Failed", { variant: "error" });

  const handleExport = async () => {
    try {
      // Fetch organization data from API
      const response = await axios.get("/organizations");
      const orgData = response.data;

      if (format === "json") {
        // Convert data to JSON and trigger download
        const jsonBlob = new Blob([JSON.stringify(orgData, null, 2)], {
          type: "application/json",
        });
        const jsonUrl = URL.createObjectURL(jsonBlob);

        const link = document.createElement("a");
        link.href = jsonUrl;
        link.download = "organizations.json";
        link.click();
      } else if (format === "csv") {
        console.log("CSV format");
        // Convert data to CSV and trigger download
        const convertToCSV = (data) => {
          const keys = Object.keys(data[0]);
          const csvRows = [
            keys.join(","), // Header row
            ...data.map((row) => keys.map((key) => row[key]).join(",")), // Data rows
          ];

          return csvRows.join("\n");
        };

        const csvData = convertToCSV(orgData);
        const csvBlob = new Blob([csvData], { type: "text/csv" });
        const csvUrl = URL.createObjectURL(csvBlob);

        const link = document.createElement("a");
        link.href = csvUrl;
        link.download = "organizations.csv";
        link.click();
      }

      openSuccessSB();
      onClose(); // Close the popup
    } catch (err) {
      console.error("Export failed:", err);
      openErrorSB();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Export Organizations</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 150,
          }}
        >
          {/* Label Positioned Above the Dropdown */}
          <InputLabel
            id="format-select-label"
            sx={{
              marginBottom: 1, // Adds spacing between the label and dropdown
              fontSize: "1rem", // Adjust font size for better readability
              fontWeight: "bold", // Optional: Make the label text bold
              color: "#000", // Optional: Set label color to black
            }}
          >
            Export Format
          </InputLabel>
          <FormControl sx={{ minWidth: 250 }} size="small">
            <Select
              labelId="format-select-label"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <MenuItem value="csv">CSV</MenuItem>
              <MenuItem value="json">JSON</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          paddingBottom: 2,
        }}
      >
        <MDButton onClick={handleExport} color="info" sx={{ width: 120, marginRight: 1 }}>
          Export
        </MDButton>
        <MDButton onClick={onClose} color="secondary" sx={{ width: 120 }}>
          Cancel
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

export default ExportOrgPopup;
