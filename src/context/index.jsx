// Context for storing the CSV data
import { createContext, useContext, useState } from "react";

const CsvDataContext = createContext();

export function CsvDataProvider({ children }) {
  const [csvData, setCsvData] = useState({});

  function updateCsvData(newData) {
    setCsvData(newData);
  }

  return (
    <CsvDataContext.Provider value={{ csvData, updateCsvData }}>{children}</CsvDataContext.Provider>
  );
}

export function useCsvData() {
  return useContext(CsvDataContext);
}
