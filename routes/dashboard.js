const express = require("express");
const route = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

route.get("/", isAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.session.user,
  });
});

module.exports = route;
