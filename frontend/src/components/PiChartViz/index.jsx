import { useState } from "react";
import { ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import PiChart from "./PiChart";
import Details from "./Details";
import "./styles.css";

export default function PiChartViz({ data }) {
  const [activeSmell, setActiveSmell] = useState("ArchitectureSmells");
  const [selectedSector, setSelectedSector] = useState(null);

  const smellCategories = [
    "ArchitectureSmells",
    "ImplementationSmells",
    "DesignSmells",
    "TestabilitySmells",
    "TestSmells"
  ];

  const handleSmellChange = (event, newSmell) => {
    if (newSmell) {
      setActiveSmell(newSmell);
      setSelectedSector(null);
    }
  };

  const handleSectorClick = (sectorName) => {
    setSelectedSector(sectorName);
  };

  return (
    <Paper variant="elevation" elevation={3} sx={{ backgroundColor: "#F9F6EE" }}>
      <div className="header center">
        <h2 className="center">Smells</h2>
        <ToggleButtonGroup
          color="primary"
          value={activeSmell}
          exclusive
          onChange={handleSmellChange}>
          {smellCategories.map((category, index) => (
            <ToggleButton key={index} value={category}>
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="body-content">
        <PiChart
          data={data[activeSmell]}
          activeSmell={activeSmell}
          onSectorClick={handleSectorClick}
        />
        <Details data={data[activeSmell]} sector={selectedSector} activeSmell={activeSmell} />
      </div>
    </Paper>
  );
}
