import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../sanity/lib/queries";

export function useProducts(locale: string) {
  return useQuery({
    queryKey: ["products", locale], // O locale agora faz parte da chave do cache!
    queryFn: () => getProducts(), // Por enquanto a função busca tudo
  });
}
