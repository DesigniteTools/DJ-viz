import { useState, useEffect } from "react";
import MetricsPlot from "../../components/MetricsPlot";
import StackedBarChart from "../../components/StackedBarChart";
import axios from "axios";
import { getMetricKeys, getMetricsPlotData } from "../../utils/helper";
import RadioButtonList from "../../components/RadioButtonList";

export default function Visualization() {
  const [trendData, setTrendData] = useState({});
  const [selectedOption, setSelectedOption] = useState("NOF");

  const first = Object.keys(trendData)[0];
  const metricKeys = getMetricKeys(trendData[first]);
  const metricsPlotData = getMetricsPlotData(trendData, selectedOption);
  console.log(selectedOption, metricsPlotData);

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
      <RadioButtonList keys={metricKeys} onOptionSelect={handleOptionSelect} />
      <MetricsPlot data={metricsPlotData} />
      <StackedBarChart />
    </div>
  );
}
