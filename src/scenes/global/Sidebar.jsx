import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem, IconButton, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  School as FaSchool,
  ListAlt as FaListAlt,
  Group as FaUsers,
  BarChart as FaRegChartBar,
  Business as FaBuilding,
  SupervisorAccount as FaUserTie,
  Description as FaFileContract,
  MailOutline as FaEnvelopeOpenText,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Poll as FaPoll,
  Assignment as FaAssignment,
  AssignmentInd as FaAssignmentInd,
} from '@mui/icons-material';
import { FaBars } from 'react-icons/fa';

import logoImage from '../utils/assets/Ordc.png';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openModule, setOpenModule] = useState(null); // Gère quel module est ouvert

  const toggle = () => setIsOpen(!isOpen);

  const handleToggle = (module) => {
    setOpenModule(openModule === module ? null : module); // Toggle un module spécifique
  };

  // Menu items par module
  const menuItemsFormation = [
    { path: '/trainingdashboard', name: 'Dashboard Formation', icon: <FaSchool /> },
    { path: '/traininglist', name: 'Training List', icon: <FaListAlt /> },
    { path: '/trainingparticipation', name: 'Participation', icon: <FaUsers /> },
  ];

  const menuItemsEffectif = [
    { path: '/effectiflist', name: 'Effectif List', icon: <FaUsers /> },
    { path: '/effectifdashboard', name: 'Effectif Dashboard', icon: <FaRegChartBar /> },
    { path: '/directionList', name: 'Direction', icon: <FaBuilding /> },
    { path: '/assign-subordinates', name: 'Assign Subordinates', icon: <FaUserTie /> },
    { path: '/ContratList', name: 'Contrat', icon: <FaFileContract /> },
    { path: '/EmployeurList', name: 'Employeur', icon: <FaUserTie /> },
  ];

  const menuItemsCompliance = [
    { path: '/legal-compliance', name: 'Legal Compliance', icon: <FaPoll /> },
    { path: '/privacy-settings', name: 'Privacy Settings', icon: <FaAssignment /> },
  ];

  const menuItemsHRIS = [
    { path: '/hris-dashboard', name: 'HRIS Dashboard', icon: <FaAssignmentInd /> },
    { path: '/kpis', name: 'KPIs', icon: <FaPoll /> },
    { path: '/analytics', name: 'Analytics', icon: <FaPoll /> },
  ];

  const menuItemsOnboarding = [
    { path: '/onboarding-form', name: 'Onboarding Form', icon: <FaPoll /> },
    { path: '/onboarding-dashboard', name: 'Onboarding Dashboard', icon: <FaPoll /> },
  ];

  const menuItemsPayroll = [
    { path: '/payroll-dashboard', name: 'Payroll Dashboard', icon: <FaPoll /> },
    { path: '/payslips', name: 'Payslips', icon: <FaPoll /> },
  ];

  const menuItemsSurvey = [
    { path: '/survey-form', name: 'Survey Form', icon: <FaPoll /> },
    { path: '/survey-list', name: 'Survey List', icon: <FaPoll /> },
    { path: '/survey-results', name: 'Survey Results', icon: <FaPoll /> },
  ];

  const menuItemsRequest = [
    //{ path: '/RequestDashboard', name: 'Request Dashbord', icon: <FaPoll /> },
    //{ path: '/requestlist', name: 'Request List', icon: <FaPoll /> },
    { path: '/requestform', name: 'Request', icon: <FaPoll /> },
  ];

  return (
    <div className={`app ${!isOpen ? 'collapsed' : ''}`}>
      <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
        <div className="top_section">
          <img
            src={logoImage}
            alt="Logo"
            className="logo-image"
            style={{ display: isOpen ? 'block' : 'none' }}
          />
          <h1 className="logo" style={{ display: isOpen ? 'block' : 'none' }}>
            HR & MOI
          </h1>
          <button className="toggle-button" onClick={toggle}>
            <FaBars />
          </button>
        </div>

        <div className="menu_section">
          {/* Formation Module Dropdown */}
          <MenuItem onClick={() => handleToggle('formation')}>
            <ListItemIcon>
              <FaSchool />
            </ListItemIcon>
            <ListItemText primary="Formation" />
            {openModule === 'formation' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openModule === 'formation'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItemsFormation.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <MenuItem>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

          {/* Effectif Module Dropdown */}
          <MenuItem onClick={() => handleToggle('effectif')}>
            <ListItemIcon>
              <FaUsers />
            </ListItemIcon>
            <ListItemText primary="Effectif" />
            {openModule === 'effectif' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openModule === 'effectif'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItemsEffectif.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <MenuItem>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

          {/* Compliance Module Dropdown */}
          <MenuItem onClick={() => handleToggle('compliance')}>
            <ListItemIcon>
              <FaPoll />
            </ListItemIcon>
            <ListItemText primary="Compliance" />
            {openModule === 'compliance' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openModule === 'compliance'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItemsCompliance.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <MenuItem>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

          {/* HRIS Module Dropdown */}
          <MenuItem onClick={() => handleToggle('hris')}>
            <ListItemIcon>
              <FaPoll />
            </ListItemIcon>
            <ListItemText primary="HRIS" />
            {openModule === 'hris' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openModule === 'hris'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItemsHRIS.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <MenuItem>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

          {/* Onboarding Module Dropdown */}
          <MenuItem onClick={() => handleToggle('onboarding')}>
            <ListItemIcon>
              <FaPoll />
            </ListItemIcon>
            <ListItemText primary="Onboarding" />
            {openModule === 'onboarding' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openModule === 'onboarding'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItemsOnboarding.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <MenuItem>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

          {/* Payroll Module Dropdown */}
          <MenuItem onClick={() => handleToggle('payroll')}>
            <ListItemIcon>
              <FaPoll />
            </ListItemIcon>
            <ListItemText primary="Payroll" />
            {openModule === 'payroll' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openModule === 'payroll'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItemsPayroll.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <MenuItem>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

          {/* Survey Module Dropdown */}
          <MenuItem onClick={() => handleToggle('survey')}>
            <ListItemIcon>
              <FaPoll />
            </ListItemIcon>
            <ListItemText primary="Survey" />
            {openModule === 'survey' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openModule === 'survey'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItemsSurvey.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <MenuItem>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

          {/* Request Module Dropdown */}
          <MenuItem onClick={() => handleToggle('request')}>
            <ListItemIcon>
              <FaPoll />
            </ListItemIcon>
            <ListItemText primary="Request" />
            {openModule === 'request' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openModule === 'request'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItemsRequest.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <MenuItem>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

        </div>
      </div>
      <main className={`content ${!isOpen ? 'collapsed' : ''}`}>{children}</main>
      <footer className={`footer ${!isOpen ? 'collapsed' : ''}`}>
        <p>&copy; 2024 ORDC</p>
      </footer>
    </div>
  );
};

export default Sidebar;