// Dashboard.js
import { useState } from "react";
import "./styles.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { useCsvData } from "../../context";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const { updateCsvData } = useCsvData();
  const [folderPath, setFolderPath] = useState("");

  const handleSubmit = () => {
    const url = `http://localhost:3001/csvData?folderPath=${folderPath}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        updateCsvData(data);
        navigate("/visualization");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="dashboard">
      <h1 style={{ textAlign: "center" }}>Smells Viz</h1>
      <div className="folder-input">
        <TextField
          className="text-field"
          label="Folder Path"
          variant="outlined"
          value={folderPath}
          onChange={(e) => setFolderPath(e.target.value)}
        />
      </div>
      <div className="submit-button">
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
