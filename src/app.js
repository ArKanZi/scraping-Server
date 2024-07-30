const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/default.routes"));
app.use(require("./routes/videoScraping.routes"));
app.use("/images", express.static(path.join(__dirname, "./images")));
app.get("/send-image", (req, res) => {
  const imagePath = path.join(__dirname, "./images", "screenshot.png");
  res.sendFile(imagePath);
});
app.get("/list-images", (req, res) => {
  const imagesDir = path.join(__dirname, "./images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/.test(file)
    );

    res.json(imageFiles);
  });
});

module.exports = app;
