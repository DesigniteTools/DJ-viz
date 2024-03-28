import { useState, useEffect } from "react";
import MetricsPlot from "../../components/MetricsPlot";
import StackedBarChart from "../../components/StackedBarChart";
import axios from "axios";
import { getMetricKeys, getMetricsPlotData, getSmellsDiff } from "../../utils/helper";
import RadioButtonList from "../../components/RadioButtonList";
import { Paper } from "@mui/material";

export default function Visualization() {
  const [trendData, setTrendData] = useState({});
  const [selectedOption, setSelectedOption] = useState("NOF");

  const first = Object.keys(trendData)[0];
  const metricKeys = getMetricKeys(trendData[first]);
  const metricsPlotData = getMetricsPlotData(trendData, selectedOption);
  const smellDiffData = getSmellsDiff(trendData);
  console.log(smellDiffData);

  useEffect(() => {
    //for docker
    // const url = "http://localhost:3001/csvData?folderPath=/usr/src/app/smells";
    //for local development
    const url =
      "http://localhost:3001/trendData?mainFolderPath=/Users/kevin/Code/ASDC (CSCI 5308)/The Project/Smells";
    axios.get(url).then((response) => {
      setTrendData(response.data);
    });
  }, []);

  function handleOptionSelect(option) {
    setSelectedOption(option);
  }

  return (
    <div className="vis-container">
      <Paper
        variant="elevation"
        elevation={3}
        sx={{ backgroundColor: "#F9F6EE" }}
        className="center pd-t">
        <StackedBarChart data={smellDiffData} />
      </Paper>
      <div className="metrics-container pd-t">
        <Paper variant="elevation" elevation={3} sx={{ backgroundColor: "#F9F6EE" }}>
          <div className="radio-buttons">
            <RadioButtonList keys={metricKeys} onOptionSelect={handleOptionSelect} />
          </div>
          <div className="metrics-plot pd-t center">
            <MetricsPlot data={metricsPlotData} />
          </div>
        </Paper>
      </div>
    </div>
  );
}
