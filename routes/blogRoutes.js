const express = require("express");
const router = express.Router();
const {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete_post,
} = require("../controller/blogController");

// Get All blog data from 'blogs' collection on MongoDB and sort it by latest
router.get("/", blog_index);

// IMPORTANT: If you place "/blogs/create" below the "/blogs/:id" because the order of the execution is important in Express
router.get("/create", blog_create_get);

// Get individual blog data from 'blogs' collection on MongoDB
router.get("/:id", blog_details);

// Delete the blog data on 'blogs' collection on MongoDB
router.delete("/:id", blog_delete_post);

// Post the blog data to 'blogs' collection on MongoDB
router.post("/", blog_create_post);

module.exports = router;
