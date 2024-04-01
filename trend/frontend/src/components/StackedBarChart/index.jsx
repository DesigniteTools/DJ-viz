import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function StackedBarChart({ data }) {
  return (
    <ResponsiveContainer className="pd-b" width="80%" height={500}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="commit" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="New Smell" stackId="a" fill="#b64201" />
        <Bar dataKey="Removed Smell" stackId="a" fill="#508104" />
        <Bar dataKey="Remaining Smell" stackId="a" fill="#f3b800" />
      </BarChart>
    </ResponsiveContainer>
  );
}
