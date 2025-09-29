import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Template Lawfirm",
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  basePath: "/studio",
  schema: { types: schemaTypes },
});
