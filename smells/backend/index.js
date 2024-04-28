const express = require("express");
const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3001;

app.get("/csvData", (req, res) => {
  try {
    const folderPath = req.query.folderPath;

    const directoryPath = path.join(folderPath);

    const files = fs.readdirSync(directoryPath);

    const data = {};

    files.forEach((file) => {
      if (file.endsWith(".csv")) {
        const filePath = path.join(directoryPath, file);
        const fileText = fs.readFileSync(filePath, "utf-8");

        Papa.parse(fileText, {
          complete: (fileData) => {
            data[file.slice(0, -4)] = fileData.data;
          },
          header: true,
          skipEmptyLines: true,
        });
      }
    });

    res.json(data);
  } catch (error) {
    console.error("Error reading files:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
