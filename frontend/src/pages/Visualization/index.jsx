import "./styles.css";
import { useEffect, useState } from "react";
import SmellsGraph from "../../components/SmellsGraph";
import PiChart from "../../components/PiChart";
import Cookies from "js-cookie";
import axios from "axios";
import BubbleChart from "../../components/BubbleChart";

export default function Visualization() {
  const [csvData, setCsvData] = useState({});

  useEffect(() => {
    const folderPath = Cookies.get("path");
    const url = `http://localhost:3001/csvData?folderPath=${folderPath}`;
    axios.get(url).then((response) => {
      setCsvData(response.data);
    });
  }, []);

  // console.log("csvData", csvData);

  const architectureSmellsData = csvData?.ArchitectureSmells;
  const designSmellData = csvData?.DesignSmells;
  const testSmellData = csvData?.TestSmells;
  const implementationSmellData = csvData?.ImplementationSmells;
  const testabilitySmellData = csvData?.TestabilitySmells;

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

  return (
    <div className="visualization">
      <h1 style={{ textAlign: "center" }}>Visualization</h1>
      <div className="graphs">
        <div className="bar-graph">
          <SmellsGraph data={csvData} />
        </div>
        <div className="bubble-graph">
          <BubbleChart data={csvData} />
        </div>
        <div className="smell-graph">
          <div className="row">
            <div className="column">
              <div className="item">
                <PiChart data={architectureSmellCount} title="Architecture Smell" />
              </div>
              <div className="item">
                <PiChart data={designSmellCount} title="Design Smell" />
              </div>
              <div className="item">
                <PiChart data={testSmellCount} title="Test Smell" />
              </div>
            </div>
            <div className="column">
              <div className="item">
                <PiChart data={testabilitySmellCount} title="Testability Smell" />
              </div>
              <div className="item">
                <PiChart data={implementationSmellCount} title="Implmentation Smell" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
