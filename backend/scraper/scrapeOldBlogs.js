// This script is responsible for scraping the 5 oldest blogs
// from BeyondChats and logging pagination details.

const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");


const BLOG_URL = "https://beyondchats.com/blogs/";

// Scrape individual blog page for title and content
const scrapeSingleBlog = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $("h1").first().text().trim();
    const content = $("article").text().trim();

    return {
      url,
      title,
      content,
    };
  } catch (error) {
    console.error("Failed to scrape blog:", url);
    return null;
  }
};

const scrapeOldBlogs = async () => {
  try {
        await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected from scraper");

    console.log("Scraper started");

    const response = await axios.get(BLOG_URL);
    const html = response.data;

    const $ = cheerio.load(html);

    console.log("Blogs page loaded");

    let lastPage = 1;

    $(".page-numbers").each((_, el) => {
      const pageNum = parseInt($(el).text());
      if (!isNaN(pageNum) && pageNum > lastPage) {
        lastPage = pageNum;
      }
    });

    console.log("Last page number:", lastPage);
        const lastPageUrl = `${BLOG_URL}page/${lastPage}/`;
    console.log("Last page URL:", lastPageUrl);

        const lastPageResponse = await axios.get(lastPageUrl);
    const lastPageHtml = lastPageResponse.data;
    const $$ = cheerio.load(lastPageHtml);

    const blogLinks = [];

    $$("a").each((_, el) => {
      const href = $$(el).attr("href");
      if (
        href &&
        href.includes("/blogs/") &&
        !href.includes("/page/")
      ) {
        blogLinks.push(href);
      }
    });

    const uniqueBlogs = [...new Set(blogLinks)];
    const oldestFive = uniqueBlogs.slice(0, 5);

    console.log("Oldest 5 blog URLs:");
            for (const link of oldestFive) {
      const blogData = await scrapeSingleBlog(link);

      if (!blogData) continue;

      const exists = await Blog.findOne({ sourceUrl: blogData.url });
      if (exists) {
        console.log("Already exists, skipping:", blogData.title);
        continue;
      }

      await Blog.create({
        title: blogData.title,
        slug: blogData.title.toLowerCase().replace(/\s+/g, "-"),
        originalContent: blogData.content,
        sourceUrl: blogData.url,
      });

      console.log("Saved blog:", blogData.title);
    }

  } catch (error) {
    console.error("Scraping failed:", error.message);
  }
};

scrapeOldBlogs();
