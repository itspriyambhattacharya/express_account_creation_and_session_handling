const express = require("express");
const route = express.Router();

route.use((req, res, next) => {
  console.log("Login middleware");
  next();
});

route.get("/", (req, res) => {
  res.render("login");
});

module.exports = route;
