const express = require("express");
const route = express.Router();
const pool = require("../db");

route.use((req, res, next) => {
  console.log("Login middleware");
  next();
});

route.get("/", (req, res) => {
  res.render("login");
});

route.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const sql = "SELECT * FROM users WHERE uemail = ? AND upass = ?";

  pool.query(sql, [email, password], (err, results, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(results);

    if (results.length > 0) {
      req.session.user = {
        id: results[0].id,
        name: results[0].uname,
        email: results[0].uemail,
      };
      res.redirect("/dashboard");
    } else {
      res.send("Invalid Email or Password");
    }
  });
});

module.exports = route;
