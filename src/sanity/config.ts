import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { product } from "./schemas/product";

export default defineConfig({
  projectId: "t1j01czp",
  dataset: "production",
  title: "E-commerce Admin",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [product], // Deixaremos vazio por enquanto
  },
});
