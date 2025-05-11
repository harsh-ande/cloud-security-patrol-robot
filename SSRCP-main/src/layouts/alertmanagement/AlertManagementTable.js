import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import UpdatealertsPopup from "../../examples/popup/updatealert";
import ExportalertsPopup from "../../examples/popup/exportalerts";
import CreateAlertPopup from "../../examples/popup/createalert";
import axios from "axios";
import { setCommonHeaders } from "apiRoutes/apiClient";
import { Link } from "react-router-dom";

const AlertManagementTable = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isExportPopupOpen, setIsExportPopupOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Set common headers for all API requests
  useEffect(() => {
    setCommonHeaders();
  }, []);

  // Fetch alerts data
  useEffect(() => {
    axios
      .get("/alerts")
      .then((response) => {
        setAlerts(response.data);
        setFilteredAlerts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch alerts:", error);
      });
  }, []);

  // Handle filter
  useEffect(() => {
    const filtered = alerts.filter(
      (alert) =>
        alert.alert_id.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        alert.alert_type.toLowerCase().includes(filterText.toLowerCase()) ||
        alert.severity.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredAlerts(filtered);
  }, [filterText, alerts]);

  // Handle sorting
  const handleSort = (column) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(order);

    const sorted = [...filteredAlerts].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredAlerts(sorted);
  };

  // Open and close update popup
  const openUpdatePopup = (alert) => {
    setSelectedAlert(alert);
    setIsUpdatePopupOpen(true);
  };

  const closeUpdatePopup = () => {
    setIsUpdatePopupOpen(false);
    setSelectedAlert(null);
  };

  // Open and close create popup
  const openCreatePopup = () => {
    setIsCreatePopupOpen(true);
  };

  const closeCreatePopup = () => {
    setIsCreatePopupOpen(false);
  };

  // Open and close export popup
  const openExportPopup = () => {
    setIsExportPopupOpen(true);
  };

  const closeExportPopup = () => {
    setIsExportPopupOpen(false);
  };

  // Define table columns
  const columns = [
    {
      Header: (
        <span onClick={() => handleSort("alert_id")} style={{ cursor: "pointer" }}>
          ID {sortBy === "alert_id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </span>
      ),
      accessor: "alert_id",
      align: "left",
    },
    {
      Header: (
        <span onClick={() => handleSort("robot_id")} style={{ cursor: "pointer" }}>
          Robot ID {sortBy === "robot_id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </span>
      ),
      accessor: "robot_id",
      align: "left",
    },
    {
      Header: (
        <span onClick={() => handleSort("alert_type")} style={{ cursor: "pointer" }}>
          Type {sortBy === "alert_type" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </span>
      ),
      accessor: "alert_type",
      align: "left",
    },
    {
      Header: (
        <span onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>
          Description {sortBy === "description" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </span>
      ),
      accessor: "description",
      align: "left",
    },
    {
      Header: (
        <span onClick={() => handleSort("severity")} style={{ cursor: "pointer" }}>
          Severity {sortBy === "severity" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </span>
      ),
      accessor: "severity",
      align: "left",
    },
    {
      Header: (
        <span onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
          Status {sortBy === "status" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </span>
      ),
      accessor: "status",
      align: "left",
    },
    {
      Header: (
        <span onClick={() => handleSort("timestamp")} style={{ cursor: "pointer" }}>
          Timestamp {sortBy === "timestamp" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </span>
      ),
      accessor: "timestamp",
      align: "left",
    },
    {
      Header: "Actions",
      accessor: "actions",
      align: "center",
      Cell: ({ row }) => (
        <MDButton
          variant="contained"
          color="info"
          size="small"
          onClick={() => openUpdatePopup(row.original)}
        >
          Update
        </MDButton>
      ),
    },
  ];

  // Map filtered alerts to table rows
  const rows = filteredAlerts.map((alert) => ({
    alert_id: alert.alert_id,
    robot_id: alert.robot_id,
    alert_type: alert.alert_type,
    description: alert.description,
    severity: alert.severity,
    status: alert.status,
    timestamp: new Date(alert.timestamp).toLocaleString(),
    actions: null,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container spacing={6}>
                  <Grid item xs={4}>
                    <MDTypography variant="h3" color="white">
                      Alert Management
                    </MDTypography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <MDButton variant="contained" color="white" onClick={openCreatePopup}>
                      Create Alert
                    </MDButton>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <MDButton variant="contained" color="white" onClick={openExportPopup}>
                      Export Alerts
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox p={2}>
                <input
                  type="text"
                  placeholder="Filter by ID, Type, or Severity"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                  }}
                />
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Update Alert Popup */}
      {isUpdatePopupOpen && (
        <UpdatealertsPopup
          open={isUpdatePopupOpen}
          onClose={closeUpdatePopup}
          alert={selectedAlert}
        />
      )}

      {/* Create Alert Popup */}
      {isCreatePopupOpen && (
        <CreateAlertPopup open={isCreatePopupOpen} onClose={closeCreatePopup} />
      )}

      {/* Export Alerts Popup */}
      {isExportPopupOpen && (
        <ExportalertsPopup open={isExportPopupOpen} onClose={closeExportPopup} />
      )}
    </DashboardLayout>
  );
};

export default AlertManagementTable;
