const express = require("express");
const fs = require("fs");
const Papa = require("papaparse");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3001;

function readFolderStructure(mainFolderPath) {
  const folderNames = fs
    .readFileSync(`${mainFolderPath}/folders.txt`, "utf8")
    .split("\n");
  return folderNames.map((folderName) => folderName.trim());
}

function readCSVFiles(mainFolderPath, folderName) {
  const data = {};
  fs.readdirSync(`${mainFolderPath}/${folderName}`).forEach((file) => {
    if (file.endsWith(".csv")) {
      const filePath = `${mainFolderPath}/${folderName}/${file}`;
      const fileContents = fs.readFileSync(filePath, "utf8");
      const parsedData = Papa.parse(fileContents, {
        header: true,
        skipEmptyLines: true,
      }).data;
      data[file.slice(0, -4)] = parsedData;
    }
  });
  return data;
}

app.get("/trendData", (req, res) => {
  try {
    const mainFolderPath = req.query.mainFolderPath;
    if (!mainFolderPath) {
      return res
        .status(400)
        .json({ error: "mainFolderPath parameter is required" });
    }

    const folderNames = readFolderStructure(mainFolderPath);
    const dataObject = {};
    folderNames.forEach((folderName) => {
      dataObject[folderName] = readCSVFiles(mainFolderPath, folderName);
    });
    res.json(dataObject);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
