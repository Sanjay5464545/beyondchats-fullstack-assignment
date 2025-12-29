// Main App component for displaying blog articles

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
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h2>{blog.title || "Untitled Blog"}</h2>
          <p>{blog.originalContent?.slice(0, 300)}...</p>
        </div>
      ))}
    </div>
  );
}

export default App;
