// import { XYPlot, MarkSeriesCanvas } from "react-vis";
// import "./styles.css";

// export default function BubbleChart({ data }) {
//   const chartData =
//     data.MethodMetrics && data.MethodMetrics.length > 0
//       ? data.MethodMetrics.map((item) => ({
//           name: item["Type Name"] + item["Method Name"] + item["Line no"],
//           x: parseInt(item.LOC),
//           y: parseInt(item.CC),
//           size: parseInt(item.PC)
//         }))
//       : [];

//   console.log("chartdata", chartData);

//   return (
//     <div className="bubble-chart center">
//       {/* <ResponsiveContainer width="90%" height={400}>
//         <ScatterChart margin={{ top: 20, right: 50, left: 15, bottom: 20 }}>
//           <CartesianGrid />
//           <XAxis type="number" dataKey="CC" name="LOC" unit="" />
//           <YAxis type="number" dataKey="LOC" name="PC" unit="" />
//           <ZAxis type="number" dataKey="PC" range={[40, 700]} name="CC" unit="" />
//           <Tooltip cursor={{ strokeDasharray: "3 3" }} /> */}
//       {/* <Scatter name="Method Metrics" data={chartData} fill="#2f4b7c" /> */}
//       {/* {chartData.map((item) => (
//             <Scatter key={item.name} name="Method Metrics" data={[item]} fill="#2f4b7c" />
//           ))}
//         </ScatterChart>
//       </ResponsiveContainer> */}
//       <XYPlot width={300} height={300}>
//         <MarkSeriesCanvas sizeRange={[5, 15]} data={chartData} />
//       </XYPlot>
//     </div>
//   );
// }

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from "react-vis";
import "./styles.css";

export default function BubbleChart({ data }) {
  const chartData =
    data.MethodMetrics && data.MethodMetrics.length > 0
      ? data.MethodMetrics.map((item) => ({
          x: parseInt(item.LOC),
          y: parseInt(item.PC),
          size: parseInt(item.CC)
        }))
      : [];

  return (
    <div className="bubble-chart center">
      <XYPlot width={800} height={400}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <MarkSeries strokeWidth={2} sizeRange={[4, 15]} opacity={0.4} data={chartData} />
      </XYPlot>
    </div>
  );
}
