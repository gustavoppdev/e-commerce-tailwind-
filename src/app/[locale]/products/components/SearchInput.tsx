"use client";

// React
import { useEffect, useState, useRef } from "react";

// Next-Intl
import { useTranslations } from "next-intl";

// Components & Icons
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Hooks
import { useFilterParams } from "@/hooks/useFilterParams";

export const SearchInput = () => {
  "use memo";
  const t = useTranslations("Sections.ProductsPage.search");
  const { searchParams, handleFilterChange } = useFilterParams();

  // Pegamos o valor inicial da URL
  const initialValue = searchParams.get("search") || "";
  const [value, setValue] = useState(initialValue);

  // Ref para evitar o disparo no primeiro mount se o valor for igual
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Pula a execução no primeiro carregamento
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      // Só atualiza se o valor for diferente do que já está na URL
      if (value !== (searchParams.get("search") || "")) {
        handleFilterChange("search", value);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, handleFilterChange, searchParams]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("placeholder")}
        className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-background focus-visible:ring-0 focus-visible:border-input transition-all duration-300"
      />
    </div>
  );
};
