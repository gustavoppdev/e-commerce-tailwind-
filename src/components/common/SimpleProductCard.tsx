// Next.js & Next-Intl
import Image from "next/image";
import { Link } from "@/i18n/navigation";

// Tipos & Utils
import { LocaleType } from "@/types";
import { GET_PRODUCTS_QUERY_RESULT } from "@/../sanity.types";
import { formatCurrency } from "@/lib/utils";

const sizesRelatedProducts =
  "(max-width: 640px) calc(100vw - 1rem), (max-width: 768px) 608px, (max-width: 1024px) 324px, (max-width: 1280px) 206px, (max-width: 1536px) 250px, 314px";

const sizesProductList =
  "(max-width: 640px) calc(100vw - 1rem), (max-width: 768px) 608px, (max-width: 1024px) 324px, (max-width: 1280px) 329px, (max-width: 1536px) 250px, 314px";

type ProductColor = NonNullable<
  NonNullable<GET_PRODUCTS_QUERY_RESULT>[number]["colors"]
>[number];

type Props = {
  product: NonNullable<GET_PRODUCTS_QUERY_RESULT>[number];
  locale: LocaleType;
  layout?: "relatedProducts" | "productList";
  priority?: boolean;
  selectedColor?: ProductColor;
};

const SimpleProductCard = ({
  product,
  locale,
  layout = "relatedProducts",
  priority = false,
  selectedColor,
}: Props) => {
  // 1. Usamos a cor selecionada passada como prop, ou a primeira cor disponível
  const displayColor = selectedColor || product.colors?.[0];
  const hasMultipleImages = (displayColor?.images?.length ?? 0) > 1;

  const colors = product.colors || [];

  const price = formatCurrency(
    product.price?.[locale === "pt" ? "brl" : "usd"] ?? 0,
    locale,
  );

  return (
    <div className="flex flex-col group hover:-translate-y-1 transition-transform duration-300 text-sm relative">
      {/* Container da Imagem */}
      <div className="relative aspect-3/4 w-full rounded-lg overflow-hidden bg-secondary/20">
        {/* Imagem Principal */}
        <Image
          src={displayColor?.images?.[0]?.asset?.url ?? ""}
          alt={product.name?.[locale] ?? ""}
          placeholder="blur"
          blurDataURL={displayColor?.images?.[0]?.asset?.metadata?.lqip ?? ""}
          priority={priority}
          fetchPriority={priority ? "high" : "low"}
          fill
          sizes={
            layout === "relatedProducts"
              ? sizesRelatedProducts
              : sizesProductList
          }
          className={`object-cover transition-all duration-500 ${
            hasMultipleImages
              ? "group-hover:opacity-0"
              : "group-hover:scale-105"
          }`}
        />

        {/* Segunda Imagem (Hover) - Opcional se houver mais de uma foto */}
        {hasMultipleImages && (
          <Image
            src={displayColor?.images?.[1]?.asset?.url ?? ""}
            alt={product.name?.[locale] ?? ""}
            fill
            sizes={
              layout === "relatedProducts"
                ? sizesRelatedProducts
                : sizesProductList
            }
            className="object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100"
          />
        )}
      </div>

      {/* Título e Preço */}
      <div className="flex items-center justify-between gap-4 mt-4 mb-1 font-medium">
        <h3 className="truncate">
          <Link
            href={{
              pathname: "/products/[slug]",
              params: { slug: product.slug?.[locale]?.current || "" },
            }}
            className="after:absolute after:inset-0"
          >
            {product.name?.[locale]}
          </Link>
        </h3>
        <p className="whitespace-nowrap">{price}</p>
      </div>

      {/* Cor Selecionada e Dots */}
      <div className="flex gap-4 items-center">
        <p className="text-muted-foreground">
          {product.colors?.[0].colorName?.[locale]}
        </p>
        <div className="flex gap-1.5">
          {colors.slice(0, 4).map((color) => (
            <div
              key={color._key}
              className="w-3 h-3 rounded-full border shadow-sm"
              style={{ backgroundColor: color.colorHex || "#ccc" }}
              title={color.colorName?.[locale] ?? ""}
            />
          ))}
          {colors.length > 4 && (
            <span className="text-[10px] text-white drop-shadow-md">
              +{colors.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleProductCard;
