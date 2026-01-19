import { defineQuery } from "next-sanity";
import { client } from "./client";

// 1. Definimos a query usando defineQuery (isso habilita o TypeGen)
export const GET_PRODUCTS_QUERY =
  defineQuery(`*[_type == "product"] | order(_createdAt desc) [$start...$end] {
    _id,
    name,
    slug,
    price,
    category,
    colors[] {
      _key,
      colorName,
      colorHex,
      images[] {
        _key,
        asset-> {
          url,
          metadata {
            lqip,
            dimensions
          }
        }
      }
    },
    description {
      pt[],
      en[]
    },
    features[] {
      _key,
      pt,
      en
    },
    rating,
    reviewsCount,
  }`);

//
export const GET_PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && (slug.pt.current == $slug || slug.en.current == $slug)][0] {
    _id,
    name,
    slug,
    price,
    category,
    colors[] {
      _key,
      colorName,
      colorHex,
      images[] {
        _key,
        asset-> {
          url,
          metadata {
            lqip, // O desfoque para o placeholder
            dimensions // Útil para manter a proporção da imagem
          }
        }
      }
    },
    description {
      pt[],
      en[]
    },
    features[] { _key, pt, en },
    rating,
    reviewsCount,
    stock
  }
`);

export const getProducts = async (limit?: number) => {
  const start = 0;
  const end = limit || 100;

  const products = await client.fetch(GET_PRODUCTS_QUERY, { start, end });
  return products;
};

export const getProductBySlug = async (slug: string) => {
  const product = await client.fetch(GET_PRODUCT_BY_SLUG_QUERY, { slug });
  return product;
};
