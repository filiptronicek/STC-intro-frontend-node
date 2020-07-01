const express = require("express");
const fetch = require("node-fetch");
const base64 = require("nodejs-base64").base64encode;

//const check = require("./checkVid").check;

const port = process.env.PORT || 5000;

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
    const vidName = req.body.name;
    const desc = req.body.desc;

    const vidId = base64(`${vidName}.${desc}`);

    const body = {
      event_type: "trigger",
      client_payload: { name: vidName, desc: desc, id: vidId },
    };
    // if (!check(vidId)) {
      fetch("https://api.github.com/repos/filiptronicek/STC-Intro/dispatches", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: "token " + token,
        },
      })
        .catch((err) => console.log(err))
        .then(res.render("api.ejs", { name: vidName, id: vidId }));
    }
  /*
  } else {
    res.render("api.ejs", { name: vidName, id: vidId });
  }
    */
});

app.listen(port, function () {
  console.log(`Editor listening on port ${port}!`);
});
