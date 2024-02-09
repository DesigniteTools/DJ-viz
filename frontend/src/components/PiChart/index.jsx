import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./styles.css";

export default function PiChart({ data, title }) {
  const colors = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#ffa600"
  ];
  return (
    <div className="pi-chart center">
      <h4>{title}</h4>
      <PieChart width={400} height={350}>
        <Tooltip />
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="40%" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
