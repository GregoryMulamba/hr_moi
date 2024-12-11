import React from "react";
import TurnoverChart from "./TurnoverChart"; // Assurez-vous que le chemin vers votre composant est correct

const TurnoverFilter = () => {
  // Données fictives
  const turnoverData = [
    { month: "April", total_employees: 1, departures: 0, turnover: 0.0 },
    { month: "October", total_employees: 1, departures: 0, turnover: 0.0 },
    { month: "September", total_employees: 1, departures: 0, turnover: 0.0 },
    { month: "February", total_employees: 1, departures: 0, turnover: 0.0 },
    { month: "November", total_employees: 1, departures: 0, turnover: 0.0 },
    { month: "December", total_employees: 1, departures: 0, turnover: 0.0 },
    { month: "August", total_employees: 1, departures: 0, turnover: 0.0 },
  ];

  return (
    <div>
      <h2>Turnover Chart</h2>
      <TurnoverChart data={turnoverData} />
    </div>
  );
};

export default TurnoverFilter;
