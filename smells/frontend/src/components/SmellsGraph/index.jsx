import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Rectangle } from "recharts";
import "./styles.css";

export default function SmellsGraph({ data }) {
  const categories = [
    "ArchitectureSmells",
    "ImplementationSmells",
    "DesignSmells",
    "TestabilitySmells",
    "TestSmells"
  ];

  const chartData = categories.map((category) => ({
    name: category,
    total: data[category]?.length || 0
  }));

  return (
    <div className="smells-graph center">
      <h2 className="pd-t">Number of detected smell instances</h2>
      <ResponsiveContainer width="90%" height={500}>
        <BarChart data={chartData} margin={{ top: 10, right: 50, left: 15, bottom: 20 }}>
          <XAxis dataKey="name" textAnchor="middle" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="total"
            fill="#2f4b7c"
            activeBar={<Rectangle fill="#e67e22" stroke="#2f4b7c" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
