import { useState, useEffect } from "react";
import "./styles.css";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useCsvData } from "../../context";

export default function Visualization() {
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const { csvData } = useCsvData();

  useEffect(() => {
    const dropdownOptions = Object.keys(csvData);
    setDropdownOptions(dropdownOptions);
  }, [csvData]);

  const handleOptionChange = (event) => {
    const selectedFile = event.target.value;
    setSelectedOption(selectedFile);

    // Assuming csvData[selectedFile] contains the data for the selected file
    const selectedFileData = csvData[selectedFile];
    console.log(selectedFileData);
    // Use the selectedFileData as needed
  };

  return (
    <div className="visualization">
      <h1 style={{ textAlign: "center" }}>Visualization</h1>
      <div className="dropdown">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Select File</InputLabel>
          <Select value={selectedOption} onChange={handleOptionChange} label="Select File">
            {dropdownOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
