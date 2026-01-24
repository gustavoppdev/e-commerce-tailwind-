"use client";

// Next-Intl
import { useTranslations } from "next-intl";

// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Constants & Icons
import { PRODUCT_FILTERS } from "@/constants";
import { Plus } from "lucide-react";

// Hooks
import { useFilterParams } from "@/hooks/useFilterParams";

const FilterMobile = () => {
  const t = useTranslations("Sections.ProductsPage.filters");

  const { handleFilterChange, searchParams, clearFilters, hasFilters } =
    useFilterParams();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium">
          {t("title")} <Plus className="size-4 text-muted-foreground" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="text-left">
            <SheetTitle>{t("title")}</SheetTitle>
            <SheetDescription className="sr-only">
              {t("description")}
            </SheetDescription>
          </SheetHeader>

          <Accordion
            type="single"
            collapsible
            defaultValue="colors"
            className="border-t mt-4"
          >
            {PRODUCT_FILTERS.map((filter) => {
              const currentSelected = searchParams.get(filter.id) || "";
              // Filtramos strings vazias para evitar contagem errada de [ "" ]
              const selectedArray = currentSelected
                ? currentSelected.split(",")
                : [];
              const activeCount = selectedArray.length;

              return (
                <AccordionItem
                  key={filter.id}
                  value={filter.id}
                  className="p-4"
                >
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span>{t(filter.label)}</span>
                      {activeCount > 0 && (
                        <span className="flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-bold h-5 min-w-5 px-1 rounded-full">
                          {activeCount}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2">
                    {filter.options.map((option) => {
                      const isChecked = selectedArray.includes(
                        option.value as string,
                      );
                      return (
                        <Label
                          key={option.value}
                          className="py-2 text-muted-foreground"
                        >
                          <Checkbox
                            id={option.value as string}
                            checked={isChecked}
                            onCheckedChange={() =>
                              handleFilterChange(
                                filter.id,

                                option.value as string,
                              )
                            }
                          />

                          {t(option.label)}
                        </Label>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {hasFilters && (
            <div className="px-4">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                {t("clearFilters")}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterMobile;
