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
    <>
      <div className="header center">
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
      <Paper variant="outlined" elevation={2} sx={{ backgroundColor: "#F9F6EE" }}>
        <div className="body-content">
          <PiChart
            data={data[activeSmell]}
            activeSmell={activeSmell}
            onSectorClick={handleSectorClick}
          />
          <Details data={data[activeSmell]} sector={selectedSector} activeSmell={activeSmell} />
        </div>
      </Paper>
    </>
  );
}
