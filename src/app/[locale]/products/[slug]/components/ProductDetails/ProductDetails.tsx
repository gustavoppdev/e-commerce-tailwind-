"use client";

// React
import { useState } from "react";

// Types & Utils
import { GET_PRODUCT_BY_SLUG_QUERY_RESULT } from "@/../sanity.types";
import { formatCurrency } from "@/lib/utils";
import { LocaleType } from "@/types";

// Components
import ProductHeader from "./ProductHeader";
import ProductImage from "./ProductImage";
import ProductColors from "./ProductColors";
import ProductDescription from "./ProductDescription";
import BenefitCard from "./BenefitCard";
import ProductFeatures from "./ProductFeatures";
import ProductStock from "./ProductStock";
import { Button } from "@/components/ui/button";

// Icons
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  product: NonNullable<GET_PRODUCT_BY_SLUG_QUERY_RESULT>;
  locale: LocaleType;
};

const ProductDetails = ({ product, locale }: Props) => {
  const t = useTranslations("Sections.ProductPage.general");
  // 1. Estado para a cor selecionada (inicia com a primeira cor do array)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);

  // 2. Estado para a imagem principal (inicia com a primeira imagem da cor selecionada)
  const [activeImage, setActiveImage] = useState(selectedColor?.images?.[0]);

  // Função para trocar de cor e resetar a imagem principal para a primeira dessa nova cor
  const handleColorChange = (
    color: NonNullable<typeof product.colors>[number],
  ) => {
    setSelectedColor(color);
    setActiveImage(color.images?.[0]);
  };

  const price = formatCurrency(
    product.price?.[locale === "pt" ? "brl" : "usd"] ?? 0,
    locale,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="flex flex-col gap-4">
        <ProductHeader
          product={product}
          locale={locale}
          price={price}
          layout="mobile"
        />

        <ProductImage
          activeImage={activeImage}
          onImageChange={setActiveImage}
          colorImages={selectedColor?.images || []}
          productName={product.name?.[locale] ?? ""}
        />
      </div>

      <div className="flex flex-col gap-8">
        <ProductHeader
          product={product}
          locale={locale}
          price={price}
          layout="desktop"
        />

        <ProductColors
          product={product}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
          locale={locale}
        />

        <ProductDescription description={product.description} locale={locale} />

        <ProductStock stock={product.stock} />

        <div className="flex flex-col items-center justify-center gap-4">
          <Button size={"lg"} className="lg:text-base h-14 w-full">
            {t("addCart")}
          </Button>
          <p className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <ShieldCheck className="size-4 text-emerald-600" />
            {t("guarantee")}
          </p>
        </div>

        <ProductFeatures features={product.features} locale={locale} />

        <BenefitCard />
      </div>
    </div>
  );
};

export default ProductDetails;
