// This script fetches existing blogs from the backend API
// and prepares them for AI-based rewriting (partial implementation).

const axios = require("axios");

require("dotenv").config({ path: "./backend/.env" });


const API_BASE = "http://localhost:5000/api/blogs";

const fetchBlogs = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error.message);
    return [];
  }
};

// Call Groq LLaMA model to rewrite blog content
const rewriteWithAI = async (content) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Rewrite and improve this blog content in a clearer, more engaging way:\n\n${content}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI rewrite failed:", error.message);
    return null;
  }
};


const run = async () => {
  console.log("AI rewrite script started");

  const blogs = await fetchBlogs();
  console.log(`Fetched ${blogs.length} blogs from API`);
    for (const blog of blogs) {
  if (!blog.originalContent) continue;

  const rewritten = await rewriteWithAI(blog.originalContent);
  if (!rewritten) continue;

  await axios.put(`http://localhost:5000/api/blogs/${blog._id}`, {
    updatedContent: rewritten,
  });

  console.log("AI content saved for:", blog.title);
}
};

run();
