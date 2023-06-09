const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const directoryPath = "./files";

app.get("/files", (_, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send("Internal server error");
      return;
    }

    res.json(files);
  });
});

app.get("/files/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  fs.readFile(path.join(directoryPath, fileName), "utf8", (err, content) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal server error");
      return;
    }

    res.send(content);
  });
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
