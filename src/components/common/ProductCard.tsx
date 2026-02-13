// Next.js & Next-Intl
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

// Tipos & Utils
import { GET_PRODUCTS_QUERY_RESULT } from "@/../sanity.types";
import { LocaleType } from "@/types";
import { formatCurrency } from "@/lib/utils";

type Props = {
  product: NonNullable<GET_PRODUCTS_QUERY_RESULT[number]>;
};

const ProductCard = ({ product }: Props) => {
  const locale = useLocale() as LocaleType;
  const tAlt = useTranslations("Others.alt");

  // Pegamos a primeira cor (ou a cor prioritária)
  const firstColor = product?.colors?.[0];
  const colorName =
    firstColor?.colorName?.[locale as keyof typeof firstColor.colorName];
  const price = product.price?.[locale === "pt" ? "brl" : "usd"];

  // Verificamos se há uma segunda imagem disponível para o efeito de hover
  const mainImage = firstColor?.images?.[0];
  const hoverImage = firstColor?.images?.[1];
  const hasHoverImage = !!hoverImage;

  return (
    <li className="shrink-0 w-[65vw] sm:w-[40vw] md:w-[30vw] lg:w-full snap-start flex flex-col gap-4 items-center text-center relative group hover:-translate-y-1 transition-transform duration-300">
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden rounded-lg">
        {/* Imagem Principal */}
        <Image
          src={mainImage?.asset?.url ?? ""}
          alt={product.name?.[locale] ?? tAlt("productImage")}
          placeholder="blur"
          blurDataURL={mainImage?.asset?.metadata?.lqip ?? ""}
          fill
          sizes="(max-width: 640px) calc(65vw - 1rem), (max-width: 768px) calc(40vw - 1rem), (max-width: 1024px) calc(30vw - 2.5rem), (max-width:1280px) 206px, (max-width:1536px) 250px, 314px"
          className={`object-cover transition-all duration-500 z-0 ${
            hasHoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
          }`}
        />

        {/* Segunda Imagem (Hover) */}
        {hasHoverImage && (
          <Image
            src={hoverImage?.asset?.url ?? ""}
            alt={product.name?.[locale] ?? tAlt("productImage")}
            fill
            sizes="(max-width: 640px) calc(65vw - 1rem), (max-width: 768px) calc(40vw - 1rem), (max-width: 1024px) calc(30vw - 2.5rem), (max-width:1280px) 206px, (max-width:1536px) 250px, 314px"
            className="object-cover transition-all duration-500 scale-105 group-hover:scale-100 opacity-0 group-hover:opacity-100 z-10"
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">{colorName}</p>

        <h3 className="font-medium">
          <Link
            href={{
              pathname: "/products/[slug]",
              params: { slug: product.slug?.[locale]?.current || "" },
            }}
            className="after:absolute after:inset-0 after:z-20"
          >
            {product.name?.[locale]}
          </Link>
        </h3>

        <p className="font-medium text-foreground">
          {formatCurrency(price ?? 0, locale)}
        </p>

        <div className="flex items-center justify-center gap-2 mt-2">
          {product?.colors?.map((color) => (
            <div
              key={color._key}
              title={color.colorName?.[locale]}
              className="w-4 h-4 rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110 cursor-help z-10"
              style={{ backgroundColor: color.colorHex || "#ccc" }}
            />
          ))}
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
