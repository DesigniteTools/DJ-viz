// Dashboard.js
import { useState, useEffect } from "react";
import "./styles.css";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
  const navigate = useNavigate();
  const [csvData, setCsvData] = useState({});
  const [folderPath, setFolderPath] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleSubmit = () => {
    Cookies.set("path", folderPath);
    const url = `http://localhost:3001/csvData?folderPath=${folderPath}`;

    axios
      .get(url)
      .then((response) => {
        setCsvData(response.data);
        setFormSubmitted(true);
      })
      .catch((error) => {
        setOpenAlert(true);
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (formSubmitted && Object.keys(csvData).length === 0) {
      setOpenAlert(true);
    } else if (Object.keys(csvData).length > 0) {
      navigate("/visualization");
    }
  }, [csvData, navigate, formSubmitted]);

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
      <div className="toaster">
        <Snackbar open={openAlert} autoHideDuration={1500} onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            variant="filled"
            className="toaster"
            sx={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}>
            Error fetching files.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
