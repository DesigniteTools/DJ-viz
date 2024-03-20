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

export function getTreeMapData(csvData, selectedMetric) {
  if (!csvData || !csvData.TypeMetrics || csvData.TypeMetrics.length === 0) {
    return [];
  }
  const treeMapData = [];

  csvData.TypeMetrics.forEach((item) => {
    const packageName = item["Package Name"];
    const typeName = item["Type Name"];
    const loc = parseInt(item.LOC);
    const val = parseInt(item[selectedMetric]);

    const lastPackageNamePart = packageName.split(".").pop();

    let packageNode = treeMapData.find((node) => node.name === lastPackageNamePart);

    if (!packageNode) {
      packageNode = { name: lastPackageNamePart, children: [] };
      treeMapData.push(packageNode);
    }

    packageNode.children.push({ name: typeName, size: loc, value: val });
  });

  return treeMapData;
}
