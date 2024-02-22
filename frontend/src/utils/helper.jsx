export function getMetricKeys(data) {
  if (data && data.TypeMetrics && data.TypeMetrics.length > 0) {
    const keys = Object.keys(data.TypeMetrics[0]);
    return keys.filter(
      (key) =>
        !["Project Name", "Package Name", "Type Name", "File path", "Line no", "LOC"].includes(key)
    );
  } else {
    console.log("TypeMetrics is empty or undefined");
    return [];
  }
}

//function to get data regarding number of smells in each catagories
export function aggregateData(data, key) {
  if (!data || data.length === 0) {
    return [];
  }
  const aggregated = {};
  data.forEach((entry) => {
    const value = entry[key];
    if (!aggregated[value]) {
      aggregated[value] = 1;
    } else {
      aggregated[value]++;
    }
  });
  return Object.entries(aggregated).map(([name, value]) => ({ name, value }));
}

// function to get scatter chart data for TypeMetrics
export function getScatterData(csvData, selectedMetric) {
  if (!csvData || !csvData.TypeMetrics || csvData.TypeMetrics.length === 0) {
    return [];
  }

  return csvData.TypeMetrics.map((type) => {
    const typeName = type["Type Name"];
    const metricValue = parseFloat(type[selectedMetric]);
    return { TypeName: typeName, [selectedMetric]: metricValue };
  });
}
