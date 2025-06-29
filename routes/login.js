const express = require("express");
const route = express.Router();
const pool = require("../db");

route.use((req, res, next) => {
  console.log("Login middleware");
  next();
});

route.get("/", (req, res) => {
  const errorMessage = req.flash("error"); // get flash message
  res.render("login", { errorMessage }); // pass to template
});

route.post("/", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE uemail = ? AND upass = ?";

  pool.query(sql, [email, password], (err, results, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(results); // displays an array containing objects of matched results

    if (results.length > 0) {
      req.session.user = {
        id: results[0].id,
        name: results[0].uname,
        email: results[0].uemail,
      };
      res.redirect("/dashboard");
    } else {
      // res.send("Invalid Email or Password");
      req.flash("error", "Invalid login"); // flash set
      res.redirect("/login");
    }
  });
});

module.exports = route;
