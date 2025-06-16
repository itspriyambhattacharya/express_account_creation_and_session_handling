const express = require("express");
const route = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next(); // proceed to requested route
  } else {
    res.redirect("/login"); // block access, user is not authenticated
  }
}

route.get("/", isAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.session.user,
  });
});

module.exports = route;
