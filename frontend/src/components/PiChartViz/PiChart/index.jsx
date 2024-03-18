import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./styles.css";

export default function PiChart({ data, activeSmell }) {
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

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const formattedActiveSmell = activeSmell.replace("Smells", " Smell");

  // Count occurrences of each smell type
  const countByType = data?.reduce((acc, curr) => {
    acc[curr[formattedActiveSmell]] = (acc[curr[formattedActiveSmell]] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for pie chart
  // eslint-disable-next-line no-unused-vars
  const pieChartData = Object.entries(countByType).map(([name, value], index) => ({
    name,
    value
  }));

  return (
    <div className="pi-chart center">
      <PieChart width={400} height={350}>
        <Tooltip />
        <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="40%" outerRadius={100}>
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
