const express = require("express");
const route = express.Router();
route.use((req, res, next) => {
  console.log("DAshboard middleware");
  next();
});

route.get("/", (req, res) => {
  res.render("dashboard");
});

module.exports = route;
