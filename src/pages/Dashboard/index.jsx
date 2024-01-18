import React, { useState } from "react";
import "./styles.css";
import { Button } from "@mui/material";
import Papa from "papaparse";

export default function Dashboard() {
  const [csvFilesData, setCsvFilesData] = useState({});

  async function readCSVFiles() {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const entries = await directoryHandle.values();

      for await (const entry of entries) {
        if (entry.name.endsWith(".csv")) {
          const file = await entry.getFile();
          const fileText = await file.text();

          // Use PapaParse to parse CSV data
          Papa.parse(fileText, {
            complete: (fileData) => handleFileRead(entry.name, fileData),
            header: true
          });
        }
      }
    } catch (error) {
      console.error("Error reading files:", error);
    }
  }

  function handleFileRead(fileName, fileData) {
    const trimmedFileName = fileName.endsWith(".csv") ? fileName.slice(0, -4) : fileName;
    // console.log("File Name:", fileName);
    // console.log("Parsed File Data:", fileData);

    // Update the state with a new object using the file name as the key
    setCsvFilesData((prevData) => ({
      ...prevData,
      [trimmedFileName]: fileData.data
    }));
  }

  console.log(csvFilesData);

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
