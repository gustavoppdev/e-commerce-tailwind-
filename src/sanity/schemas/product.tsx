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
      name: "image",
      title: "Imagem do Produto",
      type: "image",
      options: { hotspot: true }, // Permite cortar a imagem no painel
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
      name: "colors",
      title: "Cores Disponíveis",
      type: "array",
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
            // --- NOVO CAMPO ADICIONADO AQUI ---
            {
              name: "colorImage",
              title: "Imagem desta Cor",
              type: "image",
              options: {
                hotspot: true, // Permite ajustar o foco da imagem
              },
            },
          ],
          preview: {
            select: {
              title: "colorName.pt",
              subtitle: "colorHex",
              media: "colorImage", // Agora o painel do Sanity mostra a foto da cor se houver
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
                title,
                subtitle,
                media: media || (
                  <div
                    style={{
                      backgroundColor: subtitle || "#ccc", // Adicionado fallback de cor
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
      name: "stock",
      title: "Estoque",
      type: "number",
      validation: (Rule: Rule) => Rule.min(0), // Impede estoque negativo
    },
  ],
};
