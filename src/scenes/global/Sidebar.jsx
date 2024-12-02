import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MenuItem,
  IconButton,
  Collapse,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import {
  School as FaSchool,
  ListAlt as FaListAlt,
  Group as FaUsers,
  BarChart as FaRegChartBar,
  Business as FaBuilding,
  SupervisorAccount as FaUserTie,
  Description as FaFileContract,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Poll as FaPoll,
  Assignment as FaAssignment,
  AssignmentInd as FaAssignmentInd,
} from "@mui/icons-material";
import { FaBars } from "react-icons/fa";

import logoImage from "../utils/assets/Ordc.png";

const Sidebar = ({ isSidebar, setIsSidebar, children }) => {
  const [openModule, setOpenModule] = useState(null); // Contrôle quel module est ouvert

  const handleToggle = (module) => {
    setOpenModule(openModule === module ? null : module); // Alterne l'état des dropdowns
  };

  const menuConfig = [
    {
      title: "Formation",
      icon: <FaSchool />,
      module: "formation",
      items: [
        { path: "/trainingdashboard", name: "Dashboard Formation" },
        { path: "/traininglist", name: "Training List" },
        { path: "/trainingparticipation", name: "Participation" },
      ],
    },
    {
      title: "Effectif",
      icon: <FaUsers />,
      module: "effectif",
      items: [
        { path: "/effectiflist", name: "Effectif List" },
        { path: "/effectifdashboard", name: "Effectif Dashboard" },
        { path: "/directionList", name: "Direction" },
        { path: "/assign-subordinates", name: "Assign Subordinates" },
        { path: "/ContratList", name: "Contrat" },
        { path: "/EmployeurList", name: "Employeur" },
      ],
    },
    {
      title: "Compétences",
      icon: <FaPoll />,
      module: "competence",
      items: [
        { path: "/competence-matrix", name: "Matrice des Compétences" },
        { path: "/job-profiles", name: "Profils Métier" },
      ],
    },
    {
      title: "Mobilité",
      icon: <FaPoll />,
      module: "mobility",
      items: [
        { path: "/mobility-tracking", name: "Suivi de Mobilité" },
      ],
    },
    {
      title: "Compliance",
      icon: <FaPoll />,
      module: "compliance",
      items: [
        { path: "/legal-compliance", name: "Legal Compliance" },
        { path: "/privacy-settings", name: "Privacy Settings" },
      ],
    },
    {
      title: "HRIS",
      icon: <FaAssignmentInd />,
      module: "hris",
      items: [
        { path: "/hris-dashboard", name: "HRIS Dashboard" },
        { path: "/kpis", name: "KPIs" },
        { path: "/analytics", name: "Analytics" },
      ],
    },
    {
      title: "Onboarding",
      icon: <FaPoll />,
      module: "onboarding",
      items: [
        { path: "/onboarding-form", name: "Onboarding Form" },
        { path: "/onboarding-dashboard", name: "Onboarding Dashboard" },
      ],
    },
    {
      title: "Payroll",
      icon: <FaPoll />,
      module: "payroll",
      items: [
        { path: "/payroll-dashboard", name: "Payroll Dashboard" },
        { path: "/payslips", name: "Payslips" },
      ],
    },
    {
      title: "Survey",
      icon: <FaPoll />,
      module: "survey",
      items: [
        { path: "/survey-form", name: "Survey Form" },
        { path: "/survey-list", name: "Survey List" },
        { path: "/survey-results", name: "Survey Results" },
      ],
    },
  ];

  return (
    <div className={`app ${!isSidebar ? "collapsed" : ""}`}>
      <div className={`sidebar ${!isSidebar ? "collapsed" : ""}`}>
        {/* Logo Section */}
        <Box className="top_section" display="flex" alignItems="center" p={2}>
          <img
            src={logoImage}
            alt="Logo"
            className="logo-image"
            style={{ display: isSidebar ? "block" : "none", height: 40 }}
          />
          <Typography
            variant="h6"
            sx={{ ml: 2, display: isSidebar ? "block" : "none" }}
          >
            HR & MOI
          </Typography>
          <IconButton onClick={() => setIsSidebar(!isSidebar)}>
            <FaBars />
          </IconButton>
        </Box>

        {/* Menu Sections */}
        {menuConfig.map((menu, index) => (
          <Box key={index}>
            <MenuItem onClick={() => handleToggle(menu.module)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
              {openModule === menu.module ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </MenuItem>
            <Collapse in={openModule === menu.module} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menu.items.map((item, idx) => (
                  <NavLink
                    to={item.path}
                    key={idx}
                    className="link"
                    activeClassName="active"
                  >
                    <MenuItem>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  </NavLink>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </div>

      {/* Main Content */}
      <main className={`content ${!isSidebar ? "collapsed" : ""}`}>{children}</main>
      <footer className={`footer ${!isSidebar ? "collapsed" : ""}`}>
        <p>&copy; {new Date().getFullYear()} ORDC</p>
      </footer>
    </div>
  );
};

export default Sidebar;
