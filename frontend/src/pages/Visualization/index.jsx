import "./styles.css";
import { useEffect, useState } from "react";
import SmellsGraph from "../../components/SmellsGraph";
import PiChart from "../../components/PiChart";
import Cookies from "js-cookie";
import axios from "axios";
import RadioButtonList from "../../components/RadioButtonList";
import { getMetricKeys, aggregateData, getScatterData, getTreeMapData } from "../../utils/helper";
import ScatterGraph from "../../components/ScatterGraph";
import TreeGraph from "../../components/TreeGraph";
import { Slider } from "@mui/material";

export default function Visualization() {
  const [csvData, setCsvData] = useState({});
  const [selectedOption, setSelectedOption] = useState("NOF");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [value, setValue] = useState([0, 100]);

  useEffect(() => {
    if (csvData && csvData.TypeMetrics && csvData.TypeMetrics.length > 0) {
      let min = Infinity;
      let max = -Infinity;

      csvData.TypeMetrics.forEach((type) => {
        const metricValue = parseFloat(type[selectedOption]);
        if (!isNaN(metricValue)) {
          min = Math.min(min, metricValue);
          max = Math.max(max, metricValue);
        }
      });

      setMinValue(min);
      setMaxValue(max);
      setValue([min, max]);
    }
  }, [csvData, selectedOption]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const folderPath = Cookies.get("path");
    const url = `http://localhost:3001/csvData?folderPath=${folderPath}`;
    axios.get(url).then((response) => {
      setCsvData(response.data);
    });
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const metricKeys = getMetricKeys(csvData);

  const scatterData = getScatterData(csvData, selectedOption);
  // console.log("scattered data", scatterData);

  const treeData = getTreeMapData(csvData, selectedOption);
  // console.log("treee data", treeData);

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

  return (
    <div className="visualization">
      <h1 style={{ textAlign: "center" }}>Visualization</h1>
      <div className="graphs">
        <div className="bar-graph">
          <SmellsGraph data={csvData} />
        </div>
        <div className="radio-buttons">
          <RadioButtonList values={metricKeys} onOptionSelect={handleOptionSelect} />
        </div>
        <div className="tree-graph-container">
          <div className="scatter-graph">
            <ScatterGraph data={scatterData} option={selectedOption} />
          </div>
          <div className="tree-graph">
            {treeData && (
              <TreeGraph
                data={treeData}
                range={value}
                min={minValue}
                max={maxValue}
                option={selectedOption}
              />
            )}
          </div>
          <div className="matrics-slider">
            <Slider
              orientation="vertical"
              value={value}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              getAriaLabel={() => "Metrics range"}
              min={minValue}
              max={maxValue}
              step={0.1}
              aria-labelledby="range-slider"
            />
          </div>
        </div>
        {/* <div className="bubble-graph">
          <BubbleChart data={csvData} />
        </div> */}
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
