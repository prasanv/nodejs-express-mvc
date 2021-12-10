const Blog = require("../models/blog");

const blog_index = (req, res) => {
  console.log(req.url);
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", {
        pageTitle: "Blogs",
        heading: "Prasan's Blog",
        blogs: result,
      });
    })
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", {
        pageTitle: "Individual Blog",
        heading: "Prasan's Blog",
        blog: result,
      });
    })
    .catch((err) => {
      res
        .status(404)
        .render("404", { pageTitle: "404", heading: "Prasan's Blog" });
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  console.log(req.url);
  res.render("blogs/create", {
    pageTitle: "Create a Blog",
    heading: "Prasan's Blog",
  });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
      console.log(result);
    })
    .catch((err) => console.log(err));
};

const blog_create_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      // res.redirect("/blogs"); // Since this redirect will not work we can send response object/test back to the browser (i.e. fetch method)
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_create_delete,
};
