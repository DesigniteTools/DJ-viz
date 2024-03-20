import "./styles.css";
import { useEffect, useState } from "react";
import SmellsGraph from "../../components/SmellsGraph";
import Cookies from "js-cookie";
import axios from "axios";
import RadioButtonList from "../../components/RadioButtonList";
import { getMetricKeys, getScatterData, getTreeMapData } from "../../utils/helper";
import ScatterGraph from "../../components/ScatterGraph";
import TreeGraph from "../../components/TreeGraph";
import { Slider, Paper } from "@mui/material";
import PiChartViz from "../../components/PiChartViz";

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

  const treeData = getTreeMapData(csvData, selectedOption);

  return (
    <div className="visualization">
      <h1 style={{ textAlign: "center" }}>Visualization</h1>
      <div className="graphs">
        <Paper variant="elevation" elevation={3} sx={{ backgroundColor: "#F9F6EE" }}>
          <SmellsGraph data={csvData} />
        </Paper>
        <Paper variant="elevation" elevation={3} sx={{ backgroundColor: "#F9F6EE" }}>
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
        </Paper>
        <div className="smell-graph">
          <PiChartViz data={csvData} />
        </div>
      </div>
    </div>
  );
}
