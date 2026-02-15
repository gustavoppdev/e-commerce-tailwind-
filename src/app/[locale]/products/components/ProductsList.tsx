"use client";

// Next.js & Next-Intl
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

// Componentes
import { Skeleton } from "@/components/ui/skeleton";
import SimpleProductCard from "@/components/common/SimpleProductCard";

// Hooks & Tipos
import { useProducts } from "@/hooks/useProducts";
import { LocaleType } from "@/types";

export const ProductList = ({ locale }: { locale: LocaleType }) => {
  const t = useTranslations("Sections.ProductsPage.filters.noResults");
  const searchParams = useSearchParams();

  // 1. Lemos todos os parâmetros da URL
  const {
    data: products,
    isLoading,
    isFetching,
  } = useProducts({
    locale,
    categories: searchParams.get("categories"),
    materials: searchParams.get("materials"),
    colors: searchParams.get("colors"),
    search: searchParams.get("search"),
  });

  // 2. Extraímos os filtros de cores ativos da URL
  // Isso será usado para priorizar a exibição das cores filtradas nos cards
  const activeColorFilters = searchParams.get("colors")?.split(",") || [];

  // 3. Estado de Carregamento Inicial
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  // 4. Estado Vazio (Nenhum produto encontrado)
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-xl font-medium">{t("title")}</p>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 transition-opacity ${isFetching ? "opacity-50" : "opacity-100"}`}
    >
      {products.map((product, index) => {
        // 5. Para cada produto, calculamos qual cor deve ser exibida
        // Priorizamos cores que estão nos filtros ativos
        const sortedColors = [...(product.colors || [])].sort((a, b) => {
          const aValue = a.colorValue || "";
          const bValue = b.colorValue || "";

          const aIsActive = activeColorFilters.includes(aValue);
          const bIsActive = activeColorFilters.includes(bValue);

          // Cores ativas aparecem primeiro
          if (aIsActive && !bIsActive) return -1;
          if (!aIsActive && bIsActive) return 1;
          return 0;
        });

        // A cor selecionada é a primeira após a ordenação
        const selectedColor = sortedColors[0];

        return (
          <SimpleProductCard
            key={product._id}
            product={product}
            locale={locale}
            priority={index < 3}
            layout="productList"
            selectedColor={selectedColor}
          />
        );
      })}
    </div>
  );
};
