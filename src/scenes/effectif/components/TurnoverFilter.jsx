import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchDataFromAPI,fetchDataFromAPIWithParameters } from "../../../api";

const monthsOfYear = [
  { month: "Janvier" },
  { month: "Février" },
  { month: "Mars" },
  { month: "Avril" },
  { month: "Mai" },
  { month: "Juin" },
  { month: "Juillet" },
  { month: "Août" },
  { month: "Septembre" },
  { month: "Octobre" },
  { month: "Novembre" },
  { month: "Décembre" },
];

const TurnoverChart = () => {
  const [employeur, setEmployeur] = useState("");
  const [turnoverData, setTurnoverData] = useState(monthsOfYear);
  const [employeurList, setEmployeurList] = useState([]);

  const fetchEmployeurList = async () => {
    try {
      const response = await fetchDataFromAPI("/effectif/employeur/get_employeur/");
      console.log("Employeur List Response:", response); // Vérifiez la réponse complète
      // Assurez-vous que vous accédez correctement aux données
      if (response && response.data && Array.isArray(response.data)) {
        setEmployeurList(response.data);
      } else {
        console.error("La réponse de l'API ne contient pas les données attendues.");
        setEmployeurList([]);
      }
    } catch (error) {
      console.error("Error fetching employeur list:", error);
      setEmployeurList([]);
    }
  };
  
  

  const fetchTurnoverData = async () => {
    try {
      const response = await fetchDataFromAPIWithParameters(
        "/effectif/agent/turnover_mensuel/",
        employeur
      );
      console.log("Turnover Data Response:", response); 
      const updatedData = monthsOfYear.map((month) => {
        const turnoverForMonth = response.data.turnover_data.find(
          (data) => data.month === month.month
        );
        return {
          month: month.month,
          turnover: turnoverForMonth ? turnoverForMonth.turnover : 0,
        };
      });
      setTurnoverData(updatedData);
    } catch (error) {
      console.error("Error fetching turnover data:", error);
    }
  };
  

  useEffect(() => {
    fetchEmployeurList();
  }, []);

  useEffect(() => {
    console.log("Employeur List after fetch:", employeurList); // Vérifiez les données ici
    fetchTurnoverData();
  }, [employeur]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Employeur:
          <select
            value={employeur}
            onChange={(e) => {
              console.log("Selected Employeur:", e.target.value); // Déboguer la sélection
              setEmployeur(e.target.value);
            }}
          >
            <option value="">Sélectionner un employeur</option>
            {Array.isArray(employeurList) && employeurList.length > 0 ? (
              employeurList.map((employeurItem) => (
                <option
                  key={employeurItem.id}
                  value={employeurItem.value} 
                >
                  {employeurItem.label} 
                </option>
              ))
            ) : (
              <option value="">Aucun employeur disponible</option>
            )}
          </select>
        </label>
      </div>
  
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={turnoverData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="turnover"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}  
export default TurnoverChart;
