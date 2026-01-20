import { defineQuery } from "next-sanity";
import { client } from "./client";
import { FullProduct } from "@/types";

// 1. Definimos a query usando defineQuery (isso habilita o TypeGen)
export const GET_PRODUCTS_QUERY = defineQuery(`*[
    _type == "product" && 
    (!defined($excludeId) || _id != $excludeId) &&
    (!defined($category) || category == $category)
  ] | order(_createdAt desc) [$start...$end] {
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

export const getProducts = async (
  limit?: number,
  excludeId?: string,
  category?: FullProduct["category"],
) => {
  const start = 0;
  const end = limit || 10;

  // Passamos as variáveis para o fetch
  return await client.fetch(GET_PRODUCTS_QUERY, {
    start,
    end,
    excludeId: excludeId || null,
    category: category || null,
  });
};

export const getProductBySlug = async (slug: string) => {
  const product = await client.fetch(GET_PRODUCT_BY_SLUG_QUERY, { slug });
  return product;
};
