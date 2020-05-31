const port = process.env.PORT || 5000;

const express = require("express");
const fetch = require("node-fetch");
const Base64 = require("js-base64").Base64;

const app = express();

const token = process.env.API_key || require("./creds").token;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static("views"));
app.use(express.static("assets"));

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/api", (req, res) => {
  if (req.body.name) {
    const vidName = "Test služby";
    const body = {
      event_type: "trigger",
      client_payload: { name: vidName, id: Base64.encode(vidName) },
    };

    fetch("ttps://api.github.com/repos/filiptronicek/STC-Intro/dispatches", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "token "+token,
      },
    })
      .then((result) => result.json())
      .then((json) => res.json(json))
      .catch(() => console.log("Success"))
      .then(res.send("Success"));
  }
});

app.listen(port, function () {
  console.log(`Editor listening on port ${port}!`);
});
