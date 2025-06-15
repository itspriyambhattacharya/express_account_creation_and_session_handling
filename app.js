const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const idx = require("./routes/index");
const reg = require("./routes/registration");
const login = require("./routes/login");

app.use("/", idx);
app.use("/registration", reg);
app.use("/login", login);

app.listen(port, () => {
  console.log(`App listening on Port: ${port}`);
});
