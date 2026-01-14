import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { product } from "./src/sanity/schemas/product";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "t1j01czp";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  projectId,
  dataset,
  title: "E-commerce Admin",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [product],
  },
});
