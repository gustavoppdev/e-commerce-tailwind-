"use client";

// Next-Intl
import { useTranslations } from "next-intl";

// Componentes
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Constantes & Hooks
import { PRODUCT_FILTERS } from "@/constants";
import { useFilterParams } from "@/hooks/useFilterParams";

const FilterDesktop = () => {
  const t = useTranslations("Sections.ProductsPage.filters");

  const { handleFilterChange, searchParams, clearFilters, hasFilters } =
    useFilterParams();

  return (
    <div className="hidden lg:flex flex-col gap-10">
      {PRODUCT_FILTERS.map((filter) => {
        // Pegamos os valores atuais desta categoria na URL (ex: "wood,leather")
        const currentSelected = searchParams.get(filter.id) || "";
        const selectedArray = currentSelected.split(",");
        return (
          <div
            key={filter.id}
            className="flex flex-col gap-4 border-b last:border-b-0 pb-8 text-sm"
          >
            <h2 className="font-medium"> {t(filter.label)}</h2>

            <ul className="flex flex-col gap-2">
              {filter.options.map((option) => {
                // Lógica de "Está marcado?":
                const isChecked = selectedArray.includes(
                  option.value as string,
                );
                return (
                  <li key={option.value}>
                    <Label
                      key={option.value}
                      className="py-2 text-muted-foreground"
                    >
                      <Checkbox
                        id={option.value as string}
                        checked={isChecked}
                        onCheckedChange={() =>
                          handleFilterChange(filter.id, option.value as string)
                        }
                      />
                      {t(option.label)}
                    </Label>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {hasFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          {t("clearFilters")}
        </Button>
      )}
    </div>
  );
};

export default FilterDesktop;
