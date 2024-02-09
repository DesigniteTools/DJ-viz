import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import "./styles.css";

export default function BubbleChart({ data }) {
  const chartData =
    data.MethodMetrics && data.MethodMetrics.length > 0
      ? data.MethodMetrics.map((item) => ({
          name: item["Type Name"],
          LOC: parseInt(item.LOC),
          CC: parseInt(item.CC),
          PC: parseInt(item.PC)
        }))
      : [];

  return (
    <div className="bubble-chart center">
      <ResponsiveContainer width="90%" height={400}>
        <ScatterChart margin={{ top: 20, right: 50, left: 15, bottom: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="LOC" name="LOC" unit="" />
          <YAxis type="number" dataKey="PC" name="PC" unit="" />
          <ZAxis type="number" dataKey="CC" range={[40, 700]} name="CC" unit="" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Method Metrics" data={chartData} fill="#2f4b7c" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
