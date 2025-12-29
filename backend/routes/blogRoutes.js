// This file defines API routes related to blog articles
// such as creating and fetching blogs.

const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// Create a new blog article
router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blog articles
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: 1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
