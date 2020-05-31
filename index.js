const port = process.env.PORT || 5000;

const express = require("express");
const fetch = require("node-fetch");

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
app.get("/api", (req, res) => {
  const body = {
    event_type: "trigger",
    client_payload: {name: "Test služby"},
  };

  fetch("https://api.github.com/repos/filiptronicek/STC-Intro/dispatches", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", "Authorization": "token a1a6e52f80a7a9822b3046b770040024ddaa669a"},
  })
    .then((result) => result.json())
    .then((json) => res.json(json))
    .catch((err) => res.status(500).send);
});
