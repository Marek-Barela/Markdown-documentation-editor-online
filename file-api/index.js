const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const app = express();
const directoryPath = "./files";
const cors = require("cors");

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());

app.get("/files", (_, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send("Internal server error");
      return;
    }

    const fileData = files.map(fileName => ({
      id: uuidv4(),
      name: fileName,
    }));

    res.json(fileData);
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

app.post("/files/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  let filePath = path.join(directoryPath, fileName);

  if (fs.existsSync(filePath)) {
    let suffix = 1;
    let newFileName = fileName;

    while (fs.existsSync(path.join(directoryPath, newFileName))) {
      const fileExtension = path.extname(fileName);
      const fileNameWithoutExtension = path.basename(fileName, fileExtension);
      newFileName = `${fileNameWithoutExtension}_${suffix}${fileExtension}`;
      suffix++;
    }

    filePath = path.join(directoryPath, newFileName);
  }

  fs.writeFile(filePath, "", "utf8", err => {
    if (err) {
      console.error("Error creating file:", err);
      res.status(500).send("Internal server error");
      return;
    }

    res.send("File created successfully");
  });
});

app.put("/files/:fileName", (req, res) => {
  const currentFileName = req.params.fileName;
  const newFileName = req.body.newFileName;
  const currentFilePath = path.join(directoryPath, currentFileName);
  const newFilePath = path.join(directoryPath, newFileName);
  const content = req.body.content;

  fs.rename(currentFilePath, newFilePath, err => {
    if (err) {
      console.error("Error renaming file:", err);
      res.status(500).send("Internal server error");
      return;
    }

    fs.writeFile(newFilePath, content, "utf8", err => {
      if (err) {
        console.error("Error modifying file:", err);
        res.status(500).send("Internal server error");
        return;
      }

      res.send("File modified successfully");
    });
  });
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
