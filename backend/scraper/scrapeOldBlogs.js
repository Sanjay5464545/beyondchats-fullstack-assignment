// This script is responsible for scraping the 5 oldest blogs
// from BeyondChats and returning basic blog details.

const axios = require("axios");
const cheerio = require("cheerio");

const BLOG_URL = "https://beyondchats.com/blogs/";

const scrapeOldBlogs = async () => {
  try {
    console.log("Scraper started");
  } catch (error) {
    console.error("Scraping failed:", error.message);
  }
};

scrapeOldBlogs();
