export default {
  name: "lawyer",
  title: "Lawyer",
  type: "document",
  fields: [
    { name: "order", title: "Order", type: "number" },
    { name: "name", title: "Name", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "specialties", title: "Specialties", type: "array", of: [{ type: "string" }] },
    { name: "education", title: "Education", type: "array", of: [{ type: "string" }] },
    { name: "career", title: "Career", type: "array", of: [{ type: "string" }] },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
  ],
};
