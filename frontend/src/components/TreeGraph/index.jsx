import { ResponsiveContainer, Treemap, Tooltip } from "recharts";

const COLORS = ["#44ce1b", "#bbdb44", "#f7e379", "#f2a134", "#e51f1f"];

function CustomContent(props) {
  const { depth, x, y, width, height, value, range, min, max } = props;
  const [minValue, maxValue] = range;

  const calculateColor = (value, minValue, maxValue, min, max) => {
    const colorRange = max - min;
    const normalizedValue = (value - min) / colorRange;
    const colorIndex = Math.floor(normalizedValue * (COLORS.length - 1));
    return COLORS[colorIndex];
  };

  const color = calculateColor(value, minValue, maxValue, min, max);
  const isOutOfRange = value < minValue || value > maxValue;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: isOutOfRange ? "#cccccc" : color,
          stroke: "#fff",
          strokeWidth: 5 / (depth + 1e-10),
          strokeOpacity: 2 / (depth + 1e-10)
        }}
      />
    </g>
  );
}

export default function TreeGraph({ data, value, min, max }) {
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
        dataKey="value"
        aspectRatio={1}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomContent range={value} min={min} max={max} />}>
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
}
