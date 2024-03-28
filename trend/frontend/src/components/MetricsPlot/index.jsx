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
    <ResponsiveContainer className="pd-b" width="80%" height={500}>
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
        <Line type="monotone" dataKey="min" stroke="#508104" strokeWidth={2} />
        <Line type="monotone" dataKey="max" stroke="#b64201" strokeWidth={2} />
        <Line type="monotone" dataKey="average" stroke="#f3b800" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
