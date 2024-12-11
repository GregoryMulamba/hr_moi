import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simuler la récupération des données depuis une API ou localStorage
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    // Sauvegarder les données à chaque changement
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <DataContext.Provider value={{ events, setEvents }}>
      {children}
    </DataContext.Provider>
  );
};
