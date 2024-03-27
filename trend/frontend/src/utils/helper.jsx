export function getMetricKeys(data) {
  if (data && data.TypeMetrics && data.TypeMetrics.length > 0) {
    const keys = Object.keys(data.TypeMetrics[0]);
    return keys.filter(
      (key) =>
        !["Project Name", "Package Name", "Type Name", "File path", "Line no", "LOC"].includes(key)
    );
  } else {
    return [];
  }
}

export function getMetricsPlotData(trendData, selectedMetric) {
  const processedData = [];

  Object.keys(trendData).forEach((folderName) => {
    const folderData = trendData[folderName];
    const typeMetrics = folderData.TypeMetrics;

    let minValue = Infinity;
    let maxValue = -Infinity;
    let sum = 0;

    typeMetrics.forEach((metric) => {
      const metricValue = parseFloat(metric[selectedMetric]);

      minValue = Math.min(minValue, metricValue);
      maxValue = Math.max(maxValue, metricValue);

      sum += metricValue;
    });

    const averageValue = sum / typeMetrics.length;

    processedData.push({
      folderName,
      min: minValue,
      max: maxValue,
      average: averageValue
    });
  });

  return processedData;
}
