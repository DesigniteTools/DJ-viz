import "./styles.css";
import { useEffect, useState } from "react";
// import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
// import { useCsvData } from "../../context";
// import CustomCard from "../../components/CustomCard";
import SmellsGraph from "../../components/SmellsGraph";
// import { useNavigate } from "react-router";
import PiChart from "../../components/PiChart";
import Cookies from "js-cookie";
import axios from "axios";

export default function Visualization() {
  const [csvData, setCsvData] = useState({});

  useEffect(() => {
    const folderPath = Cookies.get("path");
    const url = `http://localhost:3001/csvData?folderPath=${folderPath}`;
    axios.get(url).then((response) => {
      setCsvData(response.data);
    });
  }, []);

  const architectureSmellsData = csvData.ArchitectureSmells;
  const designSmellData = csvData.DesignSmells;
  const testSmellData = csvData.TestSmells;
  const implementationSmellData = csvData.ImplementationSmells;
  const testabilitySmellData = csvData.TestabilitySmells;

  const architectureSmellCount = aggregateData(architectureSmellsData, "Architecture Smell");
  const designSmellCount = aggregateData(designSmellData, "Design Smell");
  const testSmellCount = aggregateData(testSmellData, "Test Smell");
  const implementationSmellCount = aggregateData(implementationSmellData, "Implementation Smell");
  const testabilitySmellCount = aggregateData(testabilitySmellData, "Testability Smell");

  function aggregateData(data, key) {
    if (!data || data.length === 0) {
      return [];
    }
    const aggregated = {};
    data.forEach((entry) => {
      const value = entry[key];
      if (!aggregated[value]) {
        aggregated[value] = 1;
      } else {
        aggregated[value]++;
      }
    });
    return Object.entries(aggregated).map(([name, value]) => ({ name, value }));
  }

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#FF5733", "#33FFC7"];

  return (
    <div className="visualization">
      <h1 style={{ textAlign: "center" }}>Visualization</h1>
      <div className="dropdown">
        <SmellsGraph data={csvData} />
        <PiChart data={architectureSmellCount} title="Architecture Smell" colors={colors} />
        <PiChart data={designSmellCount} title="Design Smell" colors={colors} />
        <PiChart data={testSmellCount} title="Test Smell" colors={colors} />
        <PiChart data={testabilitySmellCount} title="Testability Smell" colors={colors} />
        <PiChart data={implementationSmellCount} title="Implmentation Smell" colors={colors} />
      </div>
    </div>
  );
}
