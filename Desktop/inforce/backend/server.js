const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

let cache = {
  posts: null,
  ts: 0,
};

async function loadPosts(force = false) {
  const shouldReload =
    force || !cache.posts || Date.now() - cache.ts > 5 * 60 * 1000;
  if (!shouldReload) return cache.posts;
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  cache = { posts: data, ts: Date.now() };
  return cache.posts;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.get("/posts", async (req, res) => {
  try {
    await loadPosts();
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const total = cache.posts.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = cache.posts.slice(start, end);

    res.json({ items, page, limit, total, totalPages });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
});

app.get("/search", async (req, res) => {
  try {
    await loadPosts();
    const q = String(req.query.q || "")
      .trim()
      .toLowerCase();
    if (!q) return res.json({ items: [] });

    const matches = cache.posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q),
    );

    res.json({ items: matches.slice(0, 10) });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
