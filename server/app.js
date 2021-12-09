const express = require("express");
const morgan = require("morgan");
const port = 6060;
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const { blogs, obj } = require("../content/content");

// Express App
const app = express();

// Mongo DB URI
const dbURI =
  "mongodb+srv://prasannode:prasannode@cluster0.01csq.mongodb.net/nodejs?retryWrites=true&w=majority";

// Connect to Mongo DB using Mongoose
mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("connected to DB = ", res.models.Blog);

    // Listen to the requests once the DB connection is success
    app.listen(port, () => {
      console.log("Express App listening on port 6060");
    });
  })
  .catch((err) => console.log(err));

// Pug Template Engine
app.set("view engine", "pug");
app.set("views", "views_pug");

// Custom middleware to log timestamp
app.use((req, res, next) => {
  const timestamp = new Date();
  console.log(`CUSTOM MIDDLEWARE - ${timestamp}`);
  next();
});

// Express provided Middleware to publicize static files
app.use(express.static("public"));

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

// Get All blog data from 'blogs' collection on MongoDB and sort it by latest
app.get("/blogs", function (req, res) {
  console.log(req.url);
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        pageTitle: "Blogs",
        heading: "Prasan's Blog",
        blogs: result,
      });
    })
    .catch((err) => console.log(err));
});

// Get individual blog data from 'blogs' collection on MongoDB
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", {
        pageTitle: "Individual Blog",
        heading: "Prasan's Blog",
        blog: result,
      });
    })
    .catch((err) => console.log(err));
});

// Delete the blog data on 'blogs' collection on MongoDB
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      // res.redirect("/blogs"); // Since this redirect will not work we can send response object/test back to the browser (i.e. fetch method)
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

// Post the blog data to 'blogs' collection on MongoDB
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
      console.log(result);
    })
    .catch((err) => console.log(err));
});

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

app.get("/create/blog", function (req, res) {
  console.log(req.url);
  res.render("create", {
    pageTitle: "Create a Blog",
    heading: "Prasan's Blog",
  });
});

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
