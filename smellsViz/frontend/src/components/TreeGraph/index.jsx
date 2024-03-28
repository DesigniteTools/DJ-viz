import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function TreeGraph({ data, range, min, max, option }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    d3.select(svgRef.current).select("svg").remove();

    const width = 600;
    const height = 500;

    const treemap = d3.treemap().size([width, height]).padding(2);

    const root = d3
      .hierarchy({ children: data })
      .sum((d) => d.size)
      .sort((a, b) => b.value - a.value);

    treemap(root);

    const colorScale = d3
      .scaleLinear()
      .domain([min, (min + max) / 4, (min + max) / 2, ((min + max) * 3) / 4, max])
      .range(["#508104", "#9e8e01", "#f3b800", "#db8200", "#b64201"]);

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("fill", (d) => {
        if (d.data.value < range[0] || d.data.value > range[1]) {
          return "lightgray";
        } else {
          return colorScale(d.data.value);
        }
      })
      .append("title")
      .text((d) => `${d.data.name}, ${option}: ${d.data.value}`);

    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .filter((d) => d.depth === 1)
      .append("text")
      .attr("x", (d) => d.x0 + 5)
      .attr("y", (d) => d.y0 + 20)
      .text((d) => d.data.name)
      .attr("font-weight", "bold")
      .attr("font-size", "8px")
      .attr("fill", "black");
  }, [data, range, min, max, option]);

  return <div ref={svgRef}></div>;
}
