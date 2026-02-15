"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toggleFilterValue } from "@/lib/filter";

export const useFilterParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    "use memo";
    // 1. Criamos um objeto manipulável a partir dos parâmetros atuais da URL

    const params = new URLSearchParams(searchParams.toString());
    if (key === "search") {
      if (value) params.set(key, value);
      else params.delete(key);
    } else {
      // 2. Pegamos o que já está na URL para aquela chave (ex: material)
      const currentValues = params.get(key);

      // 3. Usamos nossa utilitária para calcular o novo valor
      const newValue = toggleFilterValue(currentValues, value);

      // 4. Atualizamos o objeto de parâmetros
      if (newValue) {
        params.set(key, newValue);
      } else {
        params.delete(key); // Se o filtro ficou vazio, removemos a chave da URL
      }
    }

    // 5. "Empurramos" a nova URL.
    // scroll: false é vital para a página não pular para o topo ao filtrar!
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // Verificamos se existe algum filtro ativo para mostrar/esconder o botão
  const hasFilters =
    searchParams.has("categories") ||
    searchParams.has("materials") ||
    searchParams.has("colors") ||
    searchParams.has("q");

  return { handleFilterChange, searchParams, clearFilters, hasFilters };
};
