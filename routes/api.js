var express = require("express");
var router = require("./route");

var app = express();

app.use("/", router);

module.exports = app;
