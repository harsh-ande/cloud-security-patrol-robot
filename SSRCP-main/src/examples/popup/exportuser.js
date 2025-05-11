import React, { useState } from "react";
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

const ExportUserPopup = ({ open, onClose }) => {
  const [format, setFormat] = useState("csv"); // Default to CSV
  const { enqueueSnackbar } = useSnackbar();

  const openSuccessSB = () => enqueueSnackbar("Export Successful", { variant: "success" });
  const openErrorSB = () => enqueueSnackbar("Export Failed", { variant: "error" });

  const handleExport = async () => {
    try {
      // Fetch user data from API
      const response = await axios.get("/users"); // Adjust the endpoint if needed
      const userData = response.data;

      if (!Array.isArray(userData) || userData.length === 0) {
        throw new Error("No user data to export.");
      }

      if (format === "json") {
        // Convert data to JSON and trigger download
        const jsonBlob = new Blob([JSON.stringify(userData, null, 2)], {
          type: "application/json",
        });
        const jsonUrl = URL.createObjectURL(jsonBlob);

        const link = document.createElement("a");
        link.href = jsonUrl;
        link.download = "users.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (format === "csv") {
        console.log("CSV export triggered");

        // Convert data to CSV and trigger download
        const escapeCSVValue = (value) => {
          if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`; // Escape double quotes
          }
          return value;
        };

        const convertToCSV = (data) => {
          const keys = Object.keys(data[0]);
          const csvRows = [
            keys.join(","), // Header row
            ...data.map((row) => keys.map((key) => escapeCSVValue(row[key])).join(",")), // Data rows
          ];
          return csvRows.join("\n");
        };

        const csvData = convertToCSV(userData);
        console.log("Generated CSV data:", csvData);

        const csvBlob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const csvUrl = URL.createObjectURL(csvBlob);

        const link = document.createElement("a");
        link.href = csvUrl;
        link.download = "users.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
      <DialogTitle>Export Users</DialogTitle>
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
          <FormControl sx={{ minWidth: 250 }} size="small">
            <InputLabel id="format-select-label">Export Format</InputLabel>
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
        <Button
          onClick={handleExport}
          variant="contained"
          color="primary"
          sx={{ width: 120, marginRight: 1 }}
        >
          Export
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ width: 120 }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportUserPopup;
