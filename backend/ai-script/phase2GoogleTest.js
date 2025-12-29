// Phase 2 code
// Fetch blogs  Google search → scrape 2 articles LLM rewrite save via API

require("dotenv").config({ path: "./backend/.env" });

const axios = require("axios");
const searchGoogle = require("./helpers/googleSearch");
const scrapeArticle = require("./scrapeArticle");
const rewriteWithLLM = require("./helpers/rewriteWithLLM");

const API_URL = "http://localhost:5000/api/blogs";

const runPhase2 = async () => {
  try {
    console.log("Phase 2 started");

    // 1. Fetch blogs from API
    const response = await axios.get(API_URL);
    const blogs = response.data;

    if (!blogs.length) {
      console.log("No blogs found");
      return;
    }

    const firstBlog = blogs[0];

    // 2. Google search by title
    console.log("Searching Google for title:");
    console.log(firstBlog.title);

    const links = await searchGoogle(firstBlog.title);

    if (links.length < 2) {
      console.log("Not enough reference articles found");
      return;
    }

    console.log("Top 2 Google article links:");
    console.log(links);

    // 3. Scrape competitor articles
    const ref1 = await scrapeArticle(links[0]);
    const ref2 = await scrapeArticle(links[1]);

    console.log("Reference article lengths:", ref1.length, ref2.length);

    // 4. LLM rewrite using original + competitors
    const updated = await rewriteWithLLM(
      firstBlog.originalContent,
      ref1,
      ref2,
      links
    );

    // 5. Save updated article via CRUD API
    await axios.put(`http://localhost:5000/api/blogs/${firstBlog._id}`, {
      updatedContent: updated,
    });

    console.log("Updated article saved with references");
  } catch (error) {
    console.error("Phase 2 failed:", error.message);
  }
};

runPhase2();
