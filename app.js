const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "localhost123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

const idx = require("./routes/index");
const reg = require("./routes/registration");
const login = require("./routes/login");
const dashboard = require("./routes/dashboard");

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/login");
  });
});

app.use("/", idx);
app.use("/registration", reg);
app.use("/login", login);
app.use("/dashboard", dashboard);

app.listen(port, () => {
  console.log(`App listening on Port: ${port}`);
});
