// Scrapes main readable text from a blog/article URL

const axios = require("axios");
const cheerio = require("cheerio");

const scrapeArticle = async (url) => {
  try {
    const res = await axios.get(url, { timeout: 10000 });
    const html = res.data;
    const $ = cheerio.load(html);

    const text = $("article").text().trim() || $("body").text().trim();

    return text.slice(0, 3000); // limit content
  } catch (err) {
    console.error("Failed to scrape:", url);
    return "";
  }
};

module.exports = scrapeArticle;
