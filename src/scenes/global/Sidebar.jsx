import React, { useState } from 'react'; 
import { NavLink } from 'react-router-dom';
import { MenuItem, Collapse, List, ListItemIcon, ListItemText } from '@mui/material';
import {
  School as FaSchool,
  ListAlt as FaListAlt,
  Group as FaUsers,
  BarChart as FaRegChartBar,
  Business as FaBuilding,
  SupervisorAccount as FaUserTie,
  Description as FaFileContract,
  Dashboard as DashboardIcon,
  Gavel as GavelIcon,
  Security as SecurityIcon,
  Insights as InsightsIcon,
  Assessment as AssessmentIcon,
  EmojiPeople as EmojiPeopleIcon,
  DashboardCustomize as DashboardCustomizeIcon,
  RequestPage as RequestPageIcon,
  Receipt as ReceiptIcon,
  QuestionAnswer as QuestionAnswerIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Poll as PollIcon,
  SupportAgent as SupportAgentIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { FaBars } from 'react-icons/fa';

import logoImage from '../utils/assets/telco_logo.png';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openModule, setOpenModule] = useState(null);

  const toggle = () => setIsOpen(!isOpen);

  const handleToggle = (module) => {
    setOpenModule(openModule === module ? null : module);
  };

  const iconStyle = { color: 'darkorange'};

  const menuItems = {
    formation: [
      { path: '/trainingdashboard', name: 'Dashboard Formation', icon: <FaSchool style={iconStyle} /> },
      { path: '/traininglist', name: 'Training List', icon: <FaListAlt style={iconStyle} /> },
      { path: '/trainingparticipation', name: 'Participation', icon: <FaUsers style={iconStyle} /> },
    ],
    effectif: [
      { path: '/effectiflist', name: 'Effectif List', icon: <FaUsers style={iconStyle} /> },
      { path: '/effectifdashboard', name: 'Effectif Dashboard', icon: <FaRegChartBar style={iconStyle} /> },
      { path: '/directionList', name: 'Direction', icon: <FaBuilding style={iconStyle} /> },
      { path: '/assign-subordinates', name: 'Assign Subordinates', icon: <FaUserTie style={iconStyle} /> },
      { path: '/ContratList', name: 'Contrat', icon: <FaFileContract style={iconStyle} /> },
      { path: '/EmployeurList', name: 'Employeur', icon: <FaUserTie style={iconStyle} /> },
    ],
    compliance: [
      { path: '/legal-compliance', name: 'Legal Compliance', icon: <GavelIcon style={iconStyle} /> },
      { path: '/privacy-settings', name: 'Privacy Settings', icon: <SecurityIcon style={iconStyle} /> },
    ],
    hris: [
      { path: '/hris-dashboard', name: 'HRIS Dashboard', icon: <DashboardIcon style={iconStyle} /> },
      { path: '/kpis', name: 'KPIs', icon: <InsightsIcon style={iconStyle} /> },
      { path: '/analytics', name: 'Analytics', icon: <AssessmentIcon style={iconStyle} /> },
    ],
    onboarding: [
      { path: '/onboarding-form', name: 'Onboarding Form', icon: <EmojiPeopleIcon style={iconStyle} /> },
      { path: '/onboarding-dashboard', name: 'Onboarding Dashboard', icon: <DashboardCustomizeIcon style={iconStyle} /> },
    ],
    payroll: [
      { path: '/payroll-dashboard', name: 'Payroll Dashboard', icon: <RequestPageIcon style={iconStyle} /> },
      { path: '/payslips', name: 'Payslips', icon: <ReceiptIcon style={iconStyle} /> },
    ],
    survey: [
      { path: '/survey-form', name: 'Survey Form', icon: <QuestionAnswerIcon style={iconStyle} /> },
      { path: '/survey-list', name: 'Survey List', icon: <FormatListBulletedIcon style={iconStyle} /> },
      { path: '/survey-results', name: 'Survey Results', icon: <PollIcon style={iconStyle} /> },
    ],
    request: [
      { path: '/requestform', name: 'RequestList', icon: <SupportAgentIcon style={iconStyle} /> },
    ],
    rôles: [
      { path: '/roles', name: 'RoleManagement', icon: <SupportAgentIcon style={iconStyle} /> },
    ],
  };

  const renderMenuItems = (items) => (
    items.map((item, index) => (
      <NavLink to={item.path} key={index} className="link">
        <MenuItem>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </MenuItem>
      </NavLink>
    ))
  );

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
          <h3 className="logo" style={{ display: isOpen ? 'block' : 'none' }}>
            Max RH
          </h3>
        </div>

        <div className="menu_section">
          {Object.entries(menuItems).map(([module, items]) => (
            <React.Fragment key={module}>
              <MenuItem onClick={() => handleToggle(module)}>
                <ListItemIcon>{items[0]?.icon}</ListItemIcon>
                <ListItemText primary={module.charAt(0).toUpperCase() + module.slice(1)} />
                {openModule === module ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <Collapse in={openModule === module} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderMenuItems(items)}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </div>
      </div>
      <main className={`content ${!isOpen ? 'collapsed' : ''}`}>{children}</main>
      
    </div>
  );
};

export default Sidebar;
