// Context for storing the CSV data
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [csvData, setCsvData] = useState({});

  function updateCsvData(newData) {
    setCsvData(newData);
  }

  return <DataContext.Provider value={{ csvData, updateCsvData }}>{children}</DataContext.Provider>;
}

export function useCsvData() {
  return useContext(DataContext);
}
