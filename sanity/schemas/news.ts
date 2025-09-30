export default {
  name: "news",
  title: "News",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", type: "text" },
    { name: "content", type: "array", of: [{ type: "block" }] },
    { name: "publishedAt", type: "datetime" },
  ],
};
