import React, { useState } from "react";
import {
  Menu as FaBars,
  ListAlt as ListIcon,
  Person as PersonIcon,
  BarChart as ChartIcon,
  Assignment as AssignmentIcon,
  InsertChart as DashboardIcon,
  Description as ContractIcon,
  MailOutline as RequestIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import logoImage from "../utils/assets/Ordc.png";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(isSidebarOpen);

  const toggleSidebarInternal = () => setIsOpen(!isOpen);

  const menuItemsFormation = [
    {
      path: "/trainingdashboard",
      name: "Dashboard Formation",
      icon: <DashboardIcon />,
    },
    {
      path: "/traininglist",
      name: "Training List",
      icon: <ListIcon />,
    },
    {
      path: "/trainingparticipation",
      name: "Participation",
      icon: <AssignmentIcon />,
    },
    {
      path: "/evaluation",
      name: "Evaluation",
      icon: <AssignmentIcon />,
    },
  ];

  const menuItemsEffectif = [
    {
      path: "/effectiflist",
      name: "Effectif List",
      icon: <PersonIcon />,
    },
    {
      path: "/effectifdashboard",
      name: "Effectif Dashboard",
      icon: <ChartIcon />,
    },
    {
      path: "/directionList",
      name: "Direction",
      icon: <PersonIcon />,
    },
    {
      path: "/assign-subordinates",
      name: "Assign Subordinates",
      icon: <PersonIcon />,
    },
    {
      path: "/ContratList",
      name: "Contrat",
      icon: <ContractIcon />,
    },
    {
      path: "/EmployeurList",
      name: "Employeur",
      icon: <PersonIcon />,
    },
  ];

  const menuItemsRequest = [
    {
      path: "/request-dashboard",
      name: "Dashboard Demande",
      icon: <DashboardIcon />,
    },
    {
      path: "/requestlist",
      name: "Liste des Demandes",
      icon: <RequestIcon />,
    },
    {
      path: "/requestform",
      name: "Créer une Demande",
      icon: <RequestIcon />,
    },
  ];

  return (
    <Box className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebarInternal}>
        <FaBars />
      </div>

      {/* Logo Section */}
      <div className="top_section">
        <img
          src={logoImage}
          alt="Logo"
          className="logo-image"
          style={{ display: isOpen ? "block" : "none" }}
        />
        <Typography
          variant="h6"
          sx={{ color: "#fff", display: isOpen ? "block" : "none" }}
        >
          Orange HR
        </Typography>
      </div>

      {/* Formation Section */}
      <div className="menu_section">
        <Typography variant="subtitle2" sx={{ color: "#bbb", pl: 2 }}>
          FORMATION
        </Typography>
        {menuItemsFormation.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>

      {/* Effectif Section */}
      <div className="menu_section">
        <Typography variant="subtitle2" sx={{ color: "#bbb", pl: 2 }}>
          EFFECTIF
        </Typography>
        {menuItemsEffectif.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>

      {/* Request Section */}
      <div className="menu_section">
        <Typography variant="subtitle2" sx={{ color: "#bbb", pl: 2 }}>
          DEMANDE
        </Typography>
        {menuItemsRequest.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
    </Box>
  );
};

export default Sidebar;
