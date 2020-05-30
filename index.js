const port = process.env.PORT || 5000;

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static("views"));
app.use(express.static("assets"));

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(port, function () {
  console.log(`Editor listening on port ${port}!`);
});
