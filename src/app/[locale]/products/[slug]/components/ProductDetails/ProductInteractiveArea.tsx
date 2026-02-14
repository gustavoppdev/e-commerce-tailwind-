"use client";

// React & Next-Intl
import { useState, ReactNode } from "react";
import { useTranslations } from "next-intl";

// Tipos & Utils
import { GET_PRODUCT_BY_SLUG_QUERY_RESULT } from "@/../sanity.types";
import { LocaleType } from "@/types";

// Componentes
import ProductImage from "./ProductImage";
import ProductColors from "./ProductColors";
import ProductStock from "./ProductStock";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Icones & Hook
import { Loader2, ShieldCheck } from "lucide-react";
import { useCart } from "@/hooks/useCart";

type Props = {
  product: NonNullable<GET_PRODUCT_BY_SLUG_QUERY_RESULT>;
  locale: LocaleType;
  // Slots Estáticos (Server Components)
  headerMobile: ReactNode;
  headerDesktop: ReactNode;
  descriptionSlot: ReactNode;
  featuresSlot: ReactNode;
  benefitSlot: ReactNode;
};

const ProductInteractiveArea = ({
  product,
  locale,
  headerMobile,
  headerDesktop,
  descriptionSlot,
  featuresSlot,
  benefitSlot,
}: Props) => {
  const t = useTranslations("Sections.ProductPage.general");
  const { addToCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [activeImage, setActiveImage] = useState(selectedColor?.images?.[0]);

  const handleColorChange = (
    color: NonNullable<typeof product.colors>[number],
  ) => {
    setSelectedColor(color);
    setActiveImage(color.images?.[0]);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      addToCart({
        id: product._id,
        variantKey: selectedColor?._key ?? "",
        quantity: 1,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      toast.success(t("addCartSuccess"));
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Esquerda */}
      <div className="flex flex-col gap-4">
        {headerMobile}

        <ProductImage
          activeImage={activeImage}
          onImageChange={setActiveImage}
          colorImages={selectedColor?.images || []}
          productName={product.name?.[locale] ?? ""}
        />
      </div>

      {/* Direita */}
      <div className="flex flex-col gap-8">
        {headerDesktop}

        <ProductColors
          product={product}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
          locale={locale}
        />

        {/* Descrição (Server) */}
        {descriptionSlot}

        <ProductStock stock={product.stock} />

        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            size={"lg"}
            className="lg:text-base h-14 w-full"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              t("addCart")
            )}
          </Button>
          <p className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <ShieldCheck className="size-4 text-emerald-600" />
            {t("guarantee")}
          </p>
        </div>

        {/* Features (Server) */}
        {featuresSlot}

        {/* Benefits (Server) */}
        {benefitSlot}
      </div>
    </section>
  );
};

export default ProductInteractiveArea;
