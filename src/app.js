const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/default.routes"));
app.use(require("./routes/videoScraping.routes"));

module.exports = app;
