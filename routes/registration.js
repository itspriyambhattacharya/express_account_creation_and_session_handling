const express = require("express");
const route = express.Router();

route.use((req, res, next) => {
  console.log("Registration middleware");
  next();
});

route.get("/", (req, res) => {
  res.render("registration");
});

module.exports = route;
