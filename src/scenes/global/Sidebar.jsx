import React, { useState, useEffect } from "react";
import {
  Menu as FaBars,
  ListAlt as FaListAlt,
  Person as FaUserAlt,
  BarChart as FaRegChartBar,
  Assignment as FaClipboardList,
  InsertChart as FaChartBar,
  Description as FaFileContract,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logoImage from '../utils/assets/Ordc.png'; 
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

 


  const menuItemsFormation = [
    {
      path: "/trainingdashboard",
      name: "Dashboard Formation",
      icon: <FaChartBar />,
    },
    {
      path: "/traininglist",
      name: "Training List",
      icon: <FaListAlt />,
    },
    {
      path: "/trainingparticipation",
      name: "Participation",
      icon: <FaClipboardList />,
    },
    {
      path: "/evaluation",
      name: "Evaluation",
      icon: <FaClipboardList />,
    },
  ];

  const menuItemsEffectif = [
    {
      path: "/effectiflist",
      name: "Effectif List",
      icon: <FaUserAlt />,
    },
    {
      path: "/effectifdashboard",
      name: "Effectif Dashboard",
      icon: <FaRegChartBar />,
    },
    {
      path: "/directionList",
      name: "Direction",
      icon: <FaUserAlt />,
    },
    {
      path: "/assign-subordinates",
      name: "Assign Subordinates",
      icon: <FaUserAlt />,
    },
    {
      path: "/ContratList",
      name: "Contrat",
      icon: <FaFileContract />,
    },
    {
      path: "/EmployeurList",
      name: "Employeur",
      icon: <FaUserAlt />,
    },
    {
      path: "/request-dashboard",
      name: "Request",
      icon: <FaRegChartBar />,
    }

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
           Orange HR 
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
