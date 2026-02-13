"use client";

// Next-Intl
import { useLocale, useTranslations } from "next-intl";

// Componentes
import ProductCard from "@/components/common/ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import SeeAllButton from "@/components/common/SeeAllButton";

// Hooks
import { useProducts } from "@/hooks/useProducts";

const Trending = () => {
  const locale = useLocale();
  const t = useTranslations("Sections.Trending");

  const { data, isLoading, isError } = useProducts({ locale, limit: 4 });

  if (isError) return null;

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <section className="section-container py-10 lg:py-15 2xl:py-25">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold my-10">
          {t("headline")}
        </h2>

        <SeeAllButton styles="hidden lg:flex" />
      </div>

      <ul className="flex overflow-x-auto snap-x snap-mandatory gap-10 pb-4 no-scrollbar lg:grid lg:grid-cols-4 lg:overflow-visible">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </ul>

      <SeeAllButton styles="lg:hidden my-10" />
    </section>
  );
};

export default Trending;
