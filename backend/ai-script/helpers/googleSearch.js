// This helper searches Google for a given blog title
// and returns the first two article URLs from other websites.

const axios = require("axios");

const searchGoogle = async (query) => {
  try {
    const response = await axios.post(
      "https://google.serper.dev/search",
      { q: query },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const results = response.data.organic || [];

    // take first two non-beyondchats links
    const links = results
      .map((r) => r.link)
      .filter((link) => !link.includes("beyondchats.com"))
      .slice(0, 2);

    return links;
  } catch (error) {
    console.error("Google search failed:", error.message);
    return [];
  }
};

module.exports = searchGoogle;
