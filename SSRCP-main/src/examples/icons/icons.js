import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MoreInfoButton = () => {
  return (
    <Tooltip title="More Info">
      <IconButton aria-label="more info">
        {/* <InfoIcon color="info" /> Or use <HelpOutlineIcon /> */}
        <ArrowForwardIcon color="info" />
      </IconButton>
    </Tooltip>
  );
};

export default MoreInfoButton;
