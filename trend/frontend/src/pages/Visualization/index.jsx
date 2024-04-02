import { useState, useEffect } from "react";
import MetricsPlot from "../../components/MetricsPlot";
import StackedBarChart from "../../components/StackedBarChart";
import axios from "axios";
import { getMetricKeys, getMetricsPlotData, getSmellsDiff } from "../../utils/helper";
import RadioButtonList from "../../components/RadioButtonList";
import { Paper } from "@mui/material";

export default function Visualization() {
  const [trendData, setTrendData] = useState({});
  const [selectedMetric, setSelectedMetric] = useState("NOF");
  const [selectedSmell, setSelectedSmell] = useState("All");

  const first = Object.keys(trendData)[0];
  const metricKeys = getMetricKeys(trendData[first]);
  const smells = [
    "All",
    "ArchitectureSmells",
    "DesignSmells",
    "ImplementationSmells",
    "TestSmells",
    "TestabilitySmells"
  ];
  const metricsPlotData = getMetricsPlotData(trendData, selectedMetric);
  const smellDiffData = getSmellsDiff(trendData, selectedSmell);

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

  function handleMetricSelect(option) {
    setSelectedMetric(option);
  }

  function handleSmellSelect(option) {
    setSelectedSmell(option);
  }

  return (
    <div className="vis-container">
      <div className="bar-chart-container">
        <Paper
          variant="elevation"
          elevation={3}
          sx={{ backgroundColor: "#F9F6EE" }}
          className="center pd-t">
          <div className="radio-buttons">
            <RadioButtonList
              keys={smells}
              onOptionSelect={handleSmellSelect}
              heading="Trend Analysis"
              active="All"
            />
          </div>
          <StackedBarChart data={smellDiffData} />
        </Paper>
      </div>
      <div className="metrics-container pd-t">
        <Paper variant="elevation" elevation={3} sx={{ backgroundColor: "#F9F6EE" }}>
          <div className="radio-buttons">
            <RadioButtonList
              keys={metricKeys}
              onOptionSelect={handleMetricSelect}
              heading="Metrics"
              active="NOF"
            />
          </div>
          <div className="metrics-plot pd-t center">
            <MetricsPlot data={metricsPlotData} />
          </div>
        </Paper>
      </div>
    </div>
  );
}
