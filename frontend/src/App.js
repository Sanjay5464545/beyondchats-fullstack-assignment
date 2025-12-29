// Main App component for displaying original and AI-updated blogs

import { useEffect, useState } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Failed to fetch blogs", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>BeyondChats Blogs</h1>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "30px",
          }}
        >
          <h2>{blog.title || "Untitled Blog"}</h2>

          <h3>Original Article</h3>
<div style={{ background: "#f9f9f9", padding: "10px" }}>
  <p>{blog.originalContent?.slice(0, 400)}...</p>
</div>

<h3>AI Updated Article</h3>
<div style={{ background: "#eef6ff", padding: "10px" }}>
  <p>
    {blog.updatedContent
      ? blog.updatedContent.slice(0, 400) + "..."
      : "AI version not generated yet."}
  </p>
</div>

        </div>
      ))}
    </div>
  );
}

export default App;
