import React, { createContext, useContext, useState } from 'react';

// Création du contexte
const DataContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useData = () => useContext(DataContext);

// Composant fournisseur du contexte
export const DataProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const value = {
    events,
    setEvents,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
