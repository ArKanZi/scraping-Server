const express = require("express");
const defaultRouter = express.Router();

const defaultCtrl = require("../controllers/default.controller");

defaultRouter.get("/", defaultCtrl.home);

module.exports = defaultRouter;
