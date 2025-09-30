export default {
  name: "case",
  title: "Case",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "summary", type: "text" },
    { name: "result", type: "string" }, // 승소/합의 등
    { name: "lawyers", type: "array", of: [{ type: "reference", to: [{ type: "lawyer" }] }] },
    { name: "publishedAt", type: "datetime" },
  ],
};
