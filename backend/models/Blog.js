// This file defines the Blog schema which stores
// original and AI-updated articles scraped from BeyondChats.

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    originalContent: String,
    updatedContent: String,
    sourceUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
