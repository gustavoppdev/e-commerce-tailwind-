import Image from "next/image";
import { GET_PRODUCTS_QUERY_RESULT } from "../../../sanity.types";
import { useLocale } from "next-intl";
import { formatCurrency } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type Props = {
  product: GET_PRODUCTS_QUERY_RESULT[number];
};

const ProductCard = ({ product }: Props) => {
  const locale = useLocale() as "pt" | "en";

  const firstColor = product?.colors?.[0];

  const colorName =
    firstColor?.colorName?.[locale as keyof typeof firstColor.colorName];

  const price = product.price?.[locale === "pt" ? "brl" : "usd"];

  return (
    <li className="shrink-0 w-[65vw] sm:w-[40vw] md:w-[30vw] lg:w-full snap-start flex flex-col gap-4 items-center text-center relative group hover:-translate-y-1 transition-transform duration-300">
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden rounded-lg">
        <Image
          src={product?.imageUrl ?? ""}
          alt={product.name?.[locale] ?? ""}
          placeholder="blur"
          blurDataURL={product?.imageUrl ?? ""}
          fill
          sizes="(max-width: 640px) calc(65vw - 1rem), (max-width: 768px) calc(40vw - 1rem), (max-width: 1024px) calc(30vw - 2.5rem), (max-width:1280px) 206px, (max-width:1536px) 250px, 314px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/*  */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">{colorName}</p>

        <h3 className="font-semibold">
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

        <p>{formatCurrency(price ?? 0, locale)}</p>

        <div className="flex items-center justify-center gap-2 mt-2">
          {product?.colors?.map((color) => (
            <div
              key={color._key}
              title={color.colorName?.[locale]}
              className="w-5 h-5 rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110 cursor-help z-10"
              style={{ backgroundColor: color.colorHex || "#ccc" }}
            />
          ))}
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
