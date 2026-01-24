import { useLocale, useTranslations } from "next-intl";
import { Filters } from "./components/Filters";
import { ProductList } from "./components/ProductsList";
import { SearchInput } from "./components/SearchInput";
import { LocaleType } from "@/types";

const ProductsPage = () => {
  const t = useTranslations("Sections.ProductsPage");
  const locale = useLocale() as LocaleType;
  
  return (
    <main className="section-container mt-8">
      <div className="pb-10 pt-12.5 space-y-4 border-b">
        <h1 className="font-bold text-4xl">{t("headline")}</h1>
        <p className="text-muted-foreground">{t("paragraph")}</p>
        <div className="pt-2">
          <SearchInput />
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-10 ">
        <Filters />

        <div className="lg:col-span-3">
          <ProductList locale={locale} />
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
