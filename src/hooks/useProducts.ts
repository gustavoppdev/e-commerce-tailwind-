import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../sanity/lib/queries";
import { FullProduct } from "@/types";

export function useProducts(
  locale: string,
  limit?: number,
  excludeId?: string,
  category?: FullProduct["category"],
) {
  return useQuery({
    queryKey: ["products", locale, limit, excludeId, category],
    queryFn: () => getProducts(limit, excludeId, category),
  });
}
