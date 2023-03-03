import { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  return (
    <DataContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
