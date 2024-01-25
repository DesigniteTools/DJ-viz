import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function SmellsGraph(props) {
  // Extract smell data from props
  console.log(props.data);
  const dataInArray = [props.data];
  console.log("projectData", dataInArray);
  const smellData = dataInArray.map((projectData) => {
    return {
      ProjectName: projectData.ArchitectureSmells[0]["Project Name"],
      ArchitectureSmells: projectData.ArchitectureSmells.length,
      ImplementationSmells: projectData.ImplementationSmells.length,
      DesignSmells: projectData.DesignSmells.length,
      TestabilitySmells: projectData.TestabilitySmells.length,
      TestSmells: projectData.TestSmells.length
    };
  });
  console.log(smellData);

  return (
    <div>
      <h2>Number of Smells in Each Category</h2>
      <BarChart
        width={800}
        height={400}
        data={smellData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ProjectName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ArchitectureSmells" fill="#8884d8" />
        <Bar dataKey="ImplementationSmells" fill="#82ca9d" />
        <Bar dataKey="DesignSmells" fill="#ffc658" />
        <Bar dataKey="TestabilitySmells" fill="#FF5733" />
        <Bar dataKey="TestSmells" fill="#33FFC7" />
      </BarChart>
    </div>
  );
}
