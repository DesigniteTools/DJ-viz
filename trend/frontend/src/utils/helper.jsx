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

    const averageValue = (sum / typeMetrics.length).toPrecision(2);

    processedData.push({
      folderName,
      Max: maxValue,
      Avg: averageValue,
      Min: minValue
    });
  });

  return processedData;
}

export function getSmellsDiff(trendData) {
  const commits = Object.keys(trendData);
  const smellDiffData = [];

  for (let i = 1; i < commits.length; i++) {
    const commit1 = trendData[commits[i - 1]];
    const commit2 = trendData[commits[i]];

    const newSmellsCount = getSmellsCountDifference(commit1, commit2, "new");
    const removedSmellsCount = getSmellsCountDifference(commit1, commit2, "removed");
    const remainingSmellsCount = getSmellsCountDifference(commit1, commit2, "remaining");

    const diffMetrics = {
      commit: commits[i],
      "New Smell": newSmellsCount,
      "Removed Smell": removedSmellsCount,
      "Remaining Smell": remainingSmellsCount
    };

    smellDiffData.push(diffMetrics);
  }

  return smellDiffData;
}

function getSmellsCountDifference(commit1, commit2, countType) {
  let totalCount = 0;
  const excludedSmellTypes = ["TypeMetrics", "MethodMetrics"];
  for (const smellType in commit2) {
    if (!excludedSmellTypes.includes(smellType) && Array.isArray(commit2[smellType])) {
      const countFunction =
        countType === "new"
          ? getNewSmellsCount
          : countType === "removed"
            ? getRemovedSmellsCount
            : getRemainingSmellsCount;
      totalCount += countFunction(commit1, commit2, smellType);
    }
  }
  return totalCount;
}

function getNewSmellsCount(commit1, commit2, smellType) {
  let count = 0;
  for (const smell of commit2[smellType]) {
    if (!commit1[smellType].some((s) => s["Cause of the Smell"] === smell["Cause of the Smell"])) {
      count++;
    }
  }
  return count;
}

function getRemovedSmellsCount(commit1, commit2, smellType) {
  let count = 0;
  for (const smell of commit1[smellType]) {
    if (!commit2[smellType].some((s) => s["Cause of the Smell"] === smell["Cause of the Smell"])) {
      count++;
    }
  }
  return count;
}

function getRemainingSmellsCount(commit1, commit2, smellType) {
  let count = 0;
  for (const smell of commit1[smellType]) {
    if (commit2[smellType].some((s) => s["Cause of the Smell"] === smell["Cause of the Smell"])) {
      count++;
    }
  }
  return count;
}
