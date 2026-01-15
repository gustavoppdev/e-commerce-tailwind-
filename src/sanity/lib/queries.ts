import { defineQuery } from "next-sanity";
import { client } from "./client";

// 1. Definimos a query usando defineQuery (isso habilita o TypeGen)
export const GET_PRODUCTS_QUERY =
  defineQuery(`*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    category,
    colors[] {
      _key,
      colorName,
      colorHex,
      "colorImageUrl": colorImage.asset->url,
      "colorBlurDataURL": colorImage.asset->metadata.lqip
    },
    "imageUrl": image.asset->url,
    "blurDataURL": image.asset->metadata.lqip
  }`);

export const getProducts = async () => {
  // 2. Passamos a query para o fetch.
  // Após rodar o comando 'generate', o Sanity saberá tipar o retorno automaticamente.
  const products = await client.fetch(GET_PRODUCTS_QUERY);
  return products;
};
