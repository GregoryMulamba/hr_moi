import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { tokens } from "../../theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
    display="flex"
    justifyContent="flex-end"
    alignItems="center"
    p={2}
    className="topbar"
    sx={{ backgroundColor: colors.primary[500], height: '60px' }}
  >

      {/* ICONS */}
      <Box display="flex" alignItems="center" className="topbar-icons">
        <IconButton component={Link} to="/trainingdashboard" className="icon-button">
          <HomeOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
