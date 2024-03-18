import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import PiChart from "./PiChart";
// import TableComponent from "./TableComponent";

export default function PiChartViz({ data }) {
  const [activeSmell, setActiveSmell] = useState("ArchitectureSmells");

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
    }
  };

  return (
    <div>
      <div className="header">
        <ToggleButtonGroup value={activeSmell} exclusive onChange={handleSmellChange}>
          {smellCategories.map((category, index) => (
            <ToggleButton key={index} value={category}>
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="body-content">
        <PiChart data={data[activeSmell]} activeSmell={activeSmell} />
        {/* <TableComponent data={data[activeSmell]} /> */}
      </div>
    </div>
  );
}
