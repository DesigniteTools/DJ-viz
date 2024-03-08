// import { ResponsiveContainer, Treemap } from "recharts";

// function CustomContent(props) {
//   const { root, depth, x, y, width, height, index, colors, name } = props;
//   return (
//     <g>
//       <rect
//         x={x}
//         y={y}
//         width={width}
//         height={height}
//         style={{
//           fill: depth < 3 ? colors[Math.floor((index / root.children?.length) * 5)] : "#ffffff00",
//           stroke: "#fff",
//           strokeWidth: 2 / (depth + 1e-10),
//           strokeOpacity: 1 / (depth + 1e-10)
//         }}
//       />
//       {depth === 1 ? (
//         <text
//           x={x + width / 2}
//           y={y + height / 2 + 7}
//           textAnchor="middle"
//           fill="#fff"
//           fontSize={14}>
//           {name}
//         </text>
//       ) : null}
//       {depth === 2 ? (
//         <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
//           {index + 1}
//         </text>
//       ) : null}
//     </g>
//   );
// }

// const COLORS = ["#44ce1b", "#bbdb44", "#f7e379", "#f2a134", "#e51f1f"];

// export default function TreeGraph({ data }) {
//   console.log("treemap", data);
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <Treemap
//         width={300}
//         height={100}
//         data={data}
//         dataKey="size"
//         aspectRatio={1 / 12}
//         stroke="#fff"
//         fill="#8884d8"
//         minValue={0}
//         maxValue={1}
//         content={<CustomContent colors={COLORS} />}
//       />
//     </ResponsiveContainer>
//   );
// }

// import { ResponsiveContainer, Treemap } from "recharts";

// const COLORS = ["#e51f1f", "#f2a134", "#f7e379", "#bbdb44", "#44ce1b"];

// function CustomContent(props) {
//   const { depth, x, y, width, height, index, value, range } = props;
//   const [minValue, maxValue] = range;

//   const calculateColor = (value, minValue, maxValue) => {
//     const rangeStep = (maxValue - minValue) / (COLORS.length - 1);
//     const colorIndex = Math.floor((value - minValue) / rangeStep);
//     const index = Math.min(Math.max(colorIndex, 0), COLORS.length - 1);
//     return COLORS[index];
//   };

//   const color = calculateColor(value, minValue, maxValue);

//   return (
//     <g>
//       <rect
//         x={x}
//         y={y}
//         width={width}
//         height={height}
//         style={{
//           fill: depth < 3 ? color : "#ffffff00",
//           stroke: "#fff",
//           strokeWidth: 5 / (depth + 1e-10),
//           strokeOpacity: 0.7 / (depth + 1e-10)
//         }}
//       />
//       {/* {depth === 1 ? (
//         <text
//           x={x + width / 2}
//           y={y + height / 2 + 7}
//           textAnchor="middle"
//           fill="#fff"
//           fontSize={14}>
//           {name}
//         </text>
//       ) : null} */}
//       {depth === 2 ? (
//         <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
//           {index + 1}
//         </text>
//       ) : null}
//     </g>
//   );
// }

// export default function TreeGraph({ data, value }) {
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <Treemap
//         width={300}
//         height={100}
//         data={data}
//         dataKey="size"
//         aspectRatio={1 / 12}
//         stroke="#fff"
//         fill="#8884d8"
//         range={value}
//         content={<CustomContent range={value} />}
//       />
//     </ResponsiveContainer>
//   );
// }

import { ResponsiveContainer, Treemap, Tooltip } from "recharts";

const COLORS = ["#44ce1b", "#bbdb44", "#f7e379", "#f2a134", "#e51f1f"];

function CustomContent(props) {
  const { depth, x, y, width, height, value, range } = props;
  console.log(props, "here is here");
  const [minValue, maxValue] = range;
  const calculateColor = (value, minValue, maxValue) => {
    const rangeStep = (maxValue - minValue) / (COLORS.length - 1);
    const colorIndex = Math.floor((value - minValue) / rangeStep);
    const index = Math.min(Math.max(colorIndex, 0), COLORS.length - 1);
    return COLORS[index];
  };

  const color = calculateColor(value, minValue, maxValue);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 3 ? color : "#ffffff00",
          stroke: "#fff",
          strokeWidth: 5 / (depth + 1e-10),
          strokeOpacity: 2 / (depth + 1e-10)
        }}
      />
      {/* {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}>
          {name}
        </text>
      ) : null} */}
      {/* {depth === 2 ? (
        <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
          {index + 1}
        </text>
      ) : null} */}
    </g>
  );
}

export default function TreeGraph({ data, value }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="type-name">{payload[0].payload.name}</p>
          <p className="label">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="80%">
      <Treemap
        width={300}
        height={100}
        data={data}
        dataKey="size"
        val="size"
        aspectRatio={1}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomContent range={value} />}>
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
}
