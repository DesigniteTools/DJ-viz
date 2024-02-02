const express = require("express");
const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3001;

// Endpoint to get CSV data
app.get("/csvData", (req, res) => {
  try {
    const folderPath = req.query.folderPath;
    // console.log("Requested Folder Path:", folderPath);

    const directoryPath = path.join(folderPath);
    // console.log("Resolved Directory Path:", directoryPath);

    const files = fs.readdirSync(directoryPath);

    const data = {};

    files.forEach((file) => {
      if (file.endsWith(".csv")) {
        const filePath = path.join(directoryPath, file);
        const fileText = fs.readFileSync(filePath, "utf-8");

        // Use PapaParse to parse CSV data
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
