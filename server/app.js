const express = require("express");
const morgan = require("morgan");
const port = 6060;
const path = require("path");
// Mongo DB URI
const { db_URI } = require("../utils/db_utils");
const mongoose = require("mongoose");
const blogRoutes = require("../routes/blogRoutes");
const { blogs, obj } = require("../content/content");

// Express App
const app = express();

// Connect to Mongo DB using Mongoose
mongoose
  .connect(db_URI)
  .then((res) => {
    // console.log("connected to DB = ", res.models.Blog);
    // Listen to the requests once the DB connection is success
    app.listen(port, () => {
      console.log("Express App listening on http://127.0.0.1:6060/");
    });
  })
  .catch((err) => console.log(err));

// Pug Template Engine
app.set("view engine", "pug");
const viewsPath = path.join(__dirname, "../views_pug");
app.set("views", viewsPath);

// Custom middleware to log timestamp
app.use((req, res, next) => {
  const timestamp = new Date();
  // console.log(`CUSTOM MIDDLEWARE - ${timestamp}`);
  next();
});

// Express provided Middleware to publicize static files
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// Extract Data from the url
app.use(express.urlencoded({ extended: true }));

// Third party middleware for logging
app.use(morgan("dev"));

// --- SERVER REQUESTS ---
app.get("/", function (req, res) {
  console.log(req.url);
  res.render("index", {
    pageTitle: "Home",
    heading: "Prasan's Blog",
    blogs,
  });
});

// All Blog Routes
app.use("/blogs", blogRoutes);

// About Route
app.get("/about", function (req, res) {
  console.log(req.url);
  res.render("about", {
    pageTitle: "About",
    heading: "Prasan's Blog",
  });
});

app.get("/about-us", (req, res) => {
  console.log(req.url);
  res.redirect("/about");
});

// API Route
app.get("/api", (req, res) => {
  console.log(req.url);
  res.json(obj);
});

// code placement of `app.use` at end  of the file is very important
// `app.use` runs on every get/post/other call and nothing matches then it returns it
app.use((req, res) => {
  console.log(req.url);
  res.status(404).render("404", { pageTitle: "404", heading: "Prasan's Blog" });
});
