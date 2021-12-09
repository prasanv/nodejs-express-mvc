const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model Name is important because mongoose is going to pluralize it and find then matching collection in the DB
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
