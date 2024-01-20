// Visualization page.

import { useState, useEffect } from "react";
import "./styles.css";
import { data } from "../../mock";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function Visualization() {
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    const dropdownOptions = Object.keys(data[0]);
    setDropdownOptions(dropdownOptions);
  }, []);

  /**
   * Handles the change event of the dropdown option.
   *
   * @param {Object} event - The change event.
   */
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
