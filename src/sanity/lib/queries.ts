import { defineQuery } from "next-sanity";
import { client } from "./client";

// 1. A QUERY (Apenas a lógica do GROQ)
export const GET_PRODUCTS_QUERY = defineQuery(`*[
    _type == "product" && 
    (!defined($excludeId) || _id != $excludeId) &&
    
    // Verifica se a categoria do produto está na lista enviada
    (!defined($categories) || category in $categories) &&
    
    // Verifica se o material do produto está na lista enviada
    (!defined($materials) || material in $materials) &&
    
    // Lógica para Cores: Verifica intersecção entre arrays
    (!defined($colors) || count(colors[][colorValue.current in $colors]) > 0) &&

    // Lógica de busca textual
    (!defined($search) || name.pt match $search + "*" || name.en match $search + "*" || name.pt match "*" + $search + "*" || name.en match "*" + $search + "*")
  ] | order(_createdAt desc) [$start...$end] {
    _id,
    name,
    slug,
    price,
    category,
    material,
    colors[] {
      _key,
      colorName,
      colorValue,
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
    description,
    features,
    rating,
    reviewsCount,
  }`);

export const GET_PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && (slug.pt.current == $slug || slug.en.current == $slug)][0] {
    _id,
    name,
    slug,
    price,
    category,
    material,
    colors[] {
      _key,
      colorName,
      colorValue,
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
    features[] { _key, pt, en },
    rating,
    reviewsCount,
    stock
  }
`);

// 2. AS FUNÇÕES (Lógica de execução)
export const getProducts = async (
  limit?: number,
  excludeId?: string,
  category?: string | null,
  material?: string | null,
  color?: string | null,
  search?: string | null,
) => {
  const start = 0;
  const end = limit || 10;

  // Preparamos os arrays para a query
  const materialArray = material ? material.split(",") : null;
  const colorArray = color ? color.split(",") : null;
  const categoryArray = category ? category.split(",") : null;

  const params = {
    start,
    end,
    excludeId: excludeId || null,
    categories: categoryArray,
    materials: materialArray,
    colors: colorArray,
    search: search || null,
  };

  return await client.fetch(GET_PRODUCTS_QUERY, params);
};

export const getProductBySlug = async (slug: string) => {
  return await client.fetch(GET_PRODUCT_BY_SLUG_QUERY, { slug });
};
