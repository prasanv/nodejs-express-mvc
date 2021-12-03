const express = require("express");
const app = express();
const port = 6060;
const path = "/Users/prasan.venkat/Documents/nodejs/";
const obj = [
  {
    name: "ram",
    age: 30,
  },
  {
    name: "lakshman",
    age: 26,
  },
];

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: path });
});

app.get("/about", (req, res) => {
  res.sendFile("views/about.html", { root: path });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/api", (req, res) => {
  res.send(obj);
});

// code placement of `app.use` at end  of the file is very important
// `app.use` runs on every get/post/other call and nothing matches then it returns it
app.use((req, res) => {
  res.status(404).sendFile("views/404.html", { root: path });
});

app.listen(port, () => {
  console.log("Express App listening on port 6060");
});
