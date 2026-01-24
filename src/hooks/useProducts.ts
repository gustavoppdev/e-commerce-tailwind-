import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../sanity/lib/queries";

export function useProducts({
  locale,
  limit,
  excludeId,
  categories,
  materials,
  colors, // Novo
  search, // Novo
}: {
  locale: string;
  limit?: number;
  excludeId?: string;
  categories?: string | null;
  materials?: string | null;
  colors?: string | null;
  search?: string | null;
}) {
  return useQuery({
    // A inclusão de color e search aqui é o que garante o "auto-refetch"
    queryKey: [
      "products",
      locale,
      limit,
      excludeId,
      categories,
      materials,
      colors,
      search,
    ],
    queryFn: () =>
      getProducts(limit, excludeId, categories, materials, colors, search),
    placeholderData: (previousData) => previousData, // Mantém os produtos antigos na tela enquanto carrega os novos (UX melhor)
  });
}
