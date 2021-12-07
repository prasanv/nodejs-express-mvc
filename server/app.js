const express = require("express");
const morgan = require("morgan");
const port = 6060;
const { blogs, obj } = require("../content/content");

// Express App
const app = express();

// Pug Template Engine
app.set("view engine", "pug");
app.set("views", "views_pug");

// Listen to the requests
app.listen(port, () => {
  console.log("Express App listening on port 6060");
});

// Custom middleware to log timestamp
app.use((req, res, next) => {
  const timestamp = new Date();
  console.log(`CUSTOM MIDDLEWARE - ${timestamp}`);
  next();
});

// Express provided Middleware to publicize static files
app.use(express.static("public"));

// Third party middleware for logging
app.use(morgan("dev"));

app.get("/", function (req, res) {
  console.log(req.url);
  res.render("index", {
    title: "Home",
    heading: "Prasan's Blog",
    blogs,
  });
});

app.get("/about", function (req, res) {
  console.log(req.url);
  res.render("about", {
    title: "About",
    heading: "Prasan's Blog",
  });
});

app.get("/about-us", (req, res) => {
  console.log(req.url);
  res.redirect("/about");
});

app.get("/blogs/create", function (req, res) {
  console.log(req.url);
  res.render("create", {
    title: "Create a Blog",
    heading: "Prasan's Blog",
  });
});

app.get("/api", (req, res) => {
  console.log(req.url);
  res.send(obj);
});

// code placement of `app.use` at end  of the file is very important
// `app.use` runs on every get/post/other call and nothing matches then it returns it
app.use((req, res) => {
  console.log(req.url);
  res.status(404).render("404", { title: "404", heading: "Prasan's Blog" });
});
