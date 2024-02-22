import {
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  Scatter,
  ScatterChart
} from "recharts";
import "./styles.css";

export default function ScatterGraph({ data, option }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="type-name">{`${payload[0].payload.TypeName}`}</p>
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer width="80%" height={300}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}>
        <CartesianGrid />
        <YAxis type="number" dataKey={option} name={option} />
        <Tooltip content={<CustomTooltip />} />
        <Scatter name="Type Metrics" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
