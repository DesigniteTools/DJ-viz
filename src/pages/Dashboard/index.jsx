// Dashboard.js
import React from "react";
import "./styles.css";
import { Button } from "@mui/material";
import Papa from "papaparse";
import { useNavigate } from "react-router";
import { useCsvData } from "../../context";

export default function Dashboard() {
  const navigate = useNavigate();
  const { updateCsvData } = useCsvData();

  async function readCSVFiles() {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const entries = await directoryHandle.values();

      const newData = {};

      for await (const entry of entries) {
        if (entry.name.endsWith(".csv")) {
          const file = await entry.getFile();
          const fileText = await file.text();

          // Use PapaParse to parse CSV data
          Papa.parse(fileText, {
            complete: (fileData) => handleFileRead(entry.name, fileData, newData),
            header: true,
            skipEmptyLines: true
          });
        }
      }

      updateCsvData(newData);
      navigate("/visualization");
    } catch (error) {
      console.error("Error reading files:", error);
    }
  }

  function handleFileRead(fileName, fileData, newData) {
    const trimmedFileName = fileName.endsWith(".csv") ? fileName.slice(0, -4) : fileName;

    // Update the state with a new object using the file name as the key
    newData[trimmedFileName] = fileData.data;
  }

  return (
    <div className="dashboard">
      <h1 style={{ textAlign: "center" }}>Smells Viz</h1>
      <div className="submit-button">
        <Button variant="contained" color="success" onClick={readCSVFiles}>
          Select
        </Button>
      </div>
    </div>
  );
}
