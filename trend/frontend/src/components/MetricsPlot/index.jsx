import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function MetricsPlot({ data }) {
  return (
    <div className="container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="folderName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="min" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="max" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="average" stroke="#ffc658" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
