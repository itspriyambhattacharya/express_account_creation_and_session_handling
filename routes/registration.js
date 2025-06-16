const express = require("express");
const route = express.Router();
const pool = require("../db");

route.use((req, res, next) => {
  console.log("Registration middleware");
  next();
});

route.get("/", (req, res) => {
  res.render("registration");
});

route.post("/", (req, res) => {
  const { name, email, password } = req.body;
  const val = [name, email, password];

  const sql = "INSERT INTO users (uname, uemail, upass) VALUES (?, ?, ?)";

  pool.query(sql, val, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("User registered:", result.insertId);
    res.redirect("/login");
  });
});

module.exports = route;
