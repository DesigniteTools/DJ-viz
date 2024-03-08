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

export function getTreeMapData(csvData, selectedMetric) {
  if (!csvData || !csvData.TypeMetrics || csvData.TypeMetrics.length === 0) {
    return [];
  }
  const treeMapData = [];

  // Iterate over each item in TypeMetrics
  csvData.TypeMetrics.forEach((item) => {
    const packageName = item["Package Name"];
    const typeName = item["Type Name"];
    const loc = parseInt(item.LOC);
    const val = parseInt(item[selectedMetric]);

    // Extract last part of the package name
    const lastPackageNamePart = packageName.split(".").pop();

    // Check if the package already exists in the treeMapData
    let packageNode = treeMapData.find((node) => node.name === lastPackageNamePart);

    // If package doesn't exist, create a new package node
    if (!packageNode) {
      packageNode = { name: lastPackageNamePart, children: [] };
      treeMapData.push(packageNode);
    }

    // Add the type node to the children of the package node
    packageNode.children.push({ name: typeName, size: loc, value: val });
  });

  return treeMapData;
}
