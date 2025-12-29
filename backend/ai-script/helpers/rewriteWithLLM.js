const axios = require("axios");

const rewriteWithLLM = async (original, ref1, ref2, links) => {
  const prompt = `
Rewrite the original article using ideas, structure, and tone inspired by the two reference articles.
Keep it original, clearer, and better formatted.

ORIGINAL ARTICLE:
${original}

REFERENCE ARTICLE 1:
${ref1}

REFERENCE ARTICLE 2:
${ref2}

At the end, add:
References:
- ${links[0]}
- ${links[1]}
`;

  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.choices[0].message.content;
};

module.exports = rewriteWithLLM;
