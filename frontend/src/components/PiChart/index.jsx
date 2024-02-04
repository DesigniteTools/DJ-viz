import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./styles.css";

export default function PiChart({ data, title, colors }) {
  return (
    <div className="pi-chart">
      <h2>{title}</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
