const express = require("express");
const videoScrapingRouter = express.Router();

const videoScrapingCtrl = require("../controllers/videoScraping.controller");

videoScrapingRouter.post("/doodstream", videoScrapingCtrl.doodstream);

module.exports = videoScrapingRouter;
