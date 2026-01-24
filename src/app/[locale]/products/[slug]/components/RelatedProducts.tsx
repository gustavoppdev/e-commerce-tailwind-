"use client";

// Next-Intl
import { useLocale, useTranslations } from "next-intl";

// Custom Hooks
import { useProducts } from "@/hooks/useProducts";

// Components
import SimpleProductCard from "@/components/common/SimpleProductCard";

// Types
import { LocaleType } from "@/types";

type RelatedProps = {
  currentProductId?: string;
};

const RelatedProducts = ({ currentProductId }: RelatedProps) => {
  const t = useTranslations("Sections.RelatedProducts");
  const locale = useLocale() as LocaleType;

  const { data, isLoading, isError } = useProducts({
    locale,
    limit: 4,
    excludeId: currentProductId,
  });

  if (isError) return null;

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <section className="mt-10 mb-20 flex flex-col gap-12">
      <h2 className="font-medium text-xl">{t("headline")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {data?.map((product) => (
          <SimpleProductCard
            key={product._id}
            product={product}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
