import React, { useState } from "react";
import {
  Menu as FaBars,
  ListAlt as FaListAlt,
  School as FaSchool,
  Poll as FaPoll,
  Group as FaUsers,
  BarChart as FaRegChartBar,
  Business as FaBuilding,
  SupervisorAccount as FaUserTie,
  Description as FaFileContract,
  MailOutline as FaEnvelopeOpenText,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logoImage from '../utils/assets/Ordc.png'; 
import { Login as FaLogin, HowToReg as FaHowToReg } from "@mui/icons-material";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  const menuItemsFormation = [
    {
      path: "/trainingdashboard",
      name: "Dashboard Formation",
      icon: <FaSchool />,
    },
    {
      path: "/traininglist",
      name: "Training List",
      icon: <FaListAlt />,
    },
    {
      path: "/trainingparticipation",
      name: "Participation",
      icon: <FaUsers />, // Utilisation de `Group` pour représenter les participants
    }
  ];

  const menuItemsEffectif = [
    {
      path: "/effectiflist",
      name: "Effectif List",
      icon: <FaUsers />,
    },
    {
      path: "/effectifdashboard",
      name: "Effectif Dashboard",
      icon: <FaRegChartBar />,
    },
    {
      path: "/directionList",
      name: "Direction",
      icon: <FaBuilding />,
    },
    {
      path: "/assign-subordinates",
      name: "Assign Subordinates",
      icon: <FaUserTie />,
    },
    {
      path: "/ContratList",
      name: "Contrat",
      icon: <FaFileContract />,
    },
    {
      path: "/EmployeurList",
      name: "Employeur",
      icon: <FaUserTie />,
    },
  ];

  // Nouvelle catégorie Demande
  const menuItemsDemande = [
    {
      path: "/request-dashboard",
      name: "Request ",
      icon: <FaEnvelopeOpenText />,
    },
    // Ajoute d'autres éléments spécifiques à la catégorie Demande si nécessaire
  ];

  return (
    <div className={`app ${!isOpen ? "collapsed" : ""}`}>
      <div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
        <div className="top_section">
          <img
            src={logoImage}
            alt="Logo"
            className="logo-image"
            style={{ display: isOpen ? "block" : "none" }}
          />
          <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>
            HR & MOI
          </h1>
        </div>

        <div className="menu_section">
          <h2 className="menu_title">FORMATION</h2>
          {menuItemsFormation.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
            >
              <div className="icon-card">
                <div className="icon">{item.icon}</div>
              </div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}

          <h2 className="menu_title">EFFECTIF</h2>
          {menuItemsEffectif.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
            >
              <div className="icon-card">
                <div className="icon">{item.icon}</div>
              </div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}

          {/* Nouvelle section pour Demande */}
          <h2 className="menu_title">DEMANDE</h2>
          {menuItemsDemande.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
            >
              <div className="icon-card">
                <div className="icon">{item.icon}</div>
              </div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <main className={`content ${!isOpen ? "collapsed" : ""}`}>
        {children}
      </main>
      <footer className={`footer ${!isOpen ? "collapsed" : ""}`}>
        <p>&copy; 2024 ORDC</p>
      </footer>
    </div>
  );
};

export default Sidebar;
