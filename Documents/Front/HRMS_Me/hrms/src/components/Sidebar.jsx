import React, { useState } from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import RequestIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        width: isCollapsed ? "60px" : "240px",
        height: "100vh",
        bgcolor: "primary.main",
        color: "white",
        transition: "width 0.3s",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 2,
          fontWeight: "bold",
          display: isCollapsed ? "none" : "block",
        }}
      >
        HR&MOI
      </Box>
      <List>
        <ListItem button component={Link} to="/trainingdashboard">
          <ListItemIcon>
            <HomeIcon sx={{ color: "white" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Formation" />}
        </ListItem>
        <ListItem button component={Link} to="/effectifdashboard">
          <ListItemIcon>
            <GroupIcon sx={{ color: "white" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Effectifs" />}
        </ListItem>
        <ListItem button component={Link} to="/requestdashboard">
          <ListItemIcon>
            <RequestIcon sx={{ color: "white" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Demandes" />}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
