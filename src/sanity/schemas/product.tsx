// src/sanity/schemas/product.tsx
import { Rule } from "sanity";

export const product = {
  name: "product",
  title: "Produtos",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nome do Produto",
      type: "object",
      fields: [
        { name: "pt", title: "Português", type: "string" },
        { name: "en", title: "Inglês", type: "string" },
      ],
    },
    {
      name: "slug",
      title: "URL amigável (Slug)",
      type: "object",
      fields: [
        {
          name: "pt",
          title: "Slug Português",
          type: "slug",
          options: {
            source: "name.pt",
            maxLength: 96,
          },
        },
        {
          name: "en",
          title: "Slug Inglês",
          type: "slug",
          options: {
            source: "name.en",
            maxLength: 96,
          },
        },
      ],
    },
    {
      name: "price",
      title: "Preço",
      type: "object",
      fields: [
        { name: "brl", title: "Preço em R$", type: "number" },
        { name: "usd", title: "Preço em US$", type: "number" },
      ],
    },
    {
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Mesa e Escritório", value: "desk-and-office" },
          { title: "Auto-Aperfeiçoamento", value: "self-improvement" },
          { title: "Viagens", value: "travel" },
        ],
      },
    },
    {
      name: "description",
      title: "Descrição do Produto",
      type: "object",
      fields: [
        {
          name: "pt",
          title: "Português",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "en",
          title: "Inglês",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    },
    {
      name: "features",
      title: "Destaques / Detalhes",
      type: "array",
      description:
        "Lista de características (ex: Madeira Sustentável, 50 cartões inclusos)",
      of: [
        {
          type: "object",
          fields: [
            { name: "pt", title: "Português", type: "string" },
            { name: "en", title: "Inglês", type: "string" },
          ],
        },
      ],
    },
    {
      name: "colors",
      title: "Cores e Variações",
      type: "array",
      validation: (Rule: Rule) =>
        Rule.required().min(1).error("Adicione pelo menos uma variação."),
      of: [
        {
          type: "object",
          name: "colorOption",
          fields: [
            {
              name: "colorName",
              title: "Nome da Cor",
              type: "object",
              fields: [
                { name: "pt", title: "Português", type: "string" },
                { name: "en", title: "Inglês", type: "string" },
              ],
            },
            {
              name: "colorHex",
              title: "Código Hex (#000000)",
              type: "string",
            },
            {
              name: "images",
              title: "Galeria desta Cor",
              type: "array",
              description: "A primeira imagem será a principal desta variação",
              of: [
                {
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                },
              ],
              validation: (Rule: Rule) =>
                Rule.required()
                  .min(1)
                  .error("Adicione pelo menos uma imagem para esta cor."),
            },
          ],
          preview: {
            select: {
              title: "colorName.pt",
              subtitle: "colorHex",
              media: "images.0", // Pega a primeira imagem do array para o preview
            },
            prepare({
              title,
              subtitle,
              media,
            }: {
              title: string;
              subtitle: string;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              media: any;
            }) {
              return {
                title: title || "Sem nome",
                subtitle: subtitle || "Sem cor hex",
                media: media || (
                  <div
                    style={{
                      backgroundColor: subtitle || "#ccc",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                ),
              };
            },
          },
        },
      ],
    },
    {
      name: "rating",
      title: "Avaliação (0 a 5)",
      type: "number",
      validation: (Rule: Rule) => Rule.min(0).max(5).precision(1),
    },
    {
      name: "reviewsCount",
      title: "Número de Avaliações",
      type: "number",
      validation: (Rule: Rule) => Rule.min(0),
    },
    {
      name: "stock",
      title: "Estoque",
      type: "number",
      validation: (Rule: Rule) => Rule.min(0), // Impede estoque negativo
    },
  ],
};
