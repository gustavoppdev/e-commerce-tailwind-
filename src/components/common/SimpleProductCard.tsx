// Next.js & Next-Intl
import Image from "next/image";
import { Link } from "@/i18n/navigation";

// Types & Utils
import { LocaleType } from "@/types";
import { GET_PRODUCTS_QUERY_RESULT } from "@/../sanity.types";
import { formatCurrency } from "@/lib/utils";

type Props = {
  product: NonNullable<GET_PRODUCTS_QUERY_RESULT>[number];
  locale: LocaleType;
};

const SimpleProductCard = ({ product, locale }: Props) => {
  const price = formatCurrency(
    product.price?.[locale === "pt" ? "brl" : "usd"] ?? 0,
    locale,
  );

  return (
    <div className="flex flex-col group hover:-translate-y-1 transition-transform duration-300 text-sm relative">
      <div className="relative aspect-3/4 w-full rounded-lg overflow-hidden">
        <Image
          src={product.colors?.[0]?.images?.[0]?.asset?.url ?? ""}
          alt={product.name?.[locale] ?? ""}
          placeholder="blur"
          blurDataURL={
            product.colors?.[0]?.images?.[0]?.asset?.metadata?.lqip ?? ""
          }
          fill
          sizes="(max-width: 640px) calc(100vw - 1rem), (max-width: 768px) 608px, (max-width: 1024px) 324px, (max-width: 1280px) 206px, (max-width: 1536px) 250px,"
          className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-85"
        />
      </div>

      <div className="flex items-center justify-between gap-0 mt-4 mb-1">
        <h3>
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

        <p className="font-medium">{price}</p>
      </div>

      <p className="text-muted-foreground">
        {product.colors?.[0].colorName?.[locale]}
      </p>
    </div>
  );
};

export default SimpleProductCard;
