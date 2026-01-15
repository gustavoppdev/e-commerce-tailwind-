import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../sanity/lib/queries";
import { GET_PRODUCTS_QUERY_RESULT } from "../../sanity.types";

export function useProducts(locale: string) {
  return useQuery({
    queryKey: ["products", locale], // O locale agora faz parte da chave do cache!
    queryFn: (): Promise<GET_PRODUCTS_QUERY_RESULT> => getProducts(), // Por enquanto a função busca tudo
  });
}
