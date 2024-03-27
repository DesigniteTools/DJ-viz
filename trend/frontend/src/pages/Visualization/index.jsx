import MetricsPlot from "../../components/MetricsPlot";
import StackedBarChart from "../../components/StackedBarChart";

export default function Visualization() {
  return (
    <div className="vis-container">
      <MetricsPlot />
      <StackedBarChart />
    </div>
  );
}
