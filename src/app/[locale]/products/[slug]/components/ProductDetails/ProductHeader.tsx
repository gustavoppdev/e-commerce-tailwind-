// Tipos & Utils
import { GET_PRODUCT_BY_SLUG_QUERY_RESULT } from "@/../sanity.types";
import { LocaleType } from "@/types";
import { cn } from "@/lib/utils";

// Next-Intl
import { useTranslations } from "next-intl";

// Icones
import { Star } from "lucide-react";

type Props = {
  product: NonNullable<GET_PRODUCT_BY_SLUG_QUERY_RESULT>;
  locale: LocaleType;
  price: string;
  layout: "mobile" | "desktop";
};

const ProductHeader = ({ product, locale, price, layout }: Props) => {
  const t = useTranslations("Sections.ProductPage.productHeader");
  const tAlt = useTranslations("Others.alt");
  const rating = product.rating ?? 0;
  const reviewsCount = product.reviewsCount ?? 0;

  return (
    <div
      className={cn(
        "text-balance flex flex-col gap-4",
        layout === "mobile" ? "lg:hidden" : "hidden lg:flex",
      )}
    >
      <div className="flex items-end justify-between font-medium">
        <h1 className="text-xl pr-2">{product.name?.[locale]}</h1>

        <p className="text-lg">{price}</p>
      </div>

      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Avaliação */}
        <div className="flex items-center gap-2">
          <span className="text-sm">{rating.toFixed(1)}</span>

          <div
            className="flex items-center gap-1"
            role="img"
            aria-label={tAlt("ratingStars", { rating: rating })}
          >
            {/* Lógica das 5 estrelas */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`size-4 ${
                  index < Math.floor(rating)
                    ? "text-yellow-400 fill-current" // Estrela cheia
                    : "text-neutral-200 fill-current" // Estrela vazia
                }`}
              />
            ))}
          </div>
        </div>

        <span className="size-1 bg-neutral-200 rounded-full"></span>

        <p className="text-indigo-600 text-sm font-medium">
          {t("seeAllReviewsBtn", { reviewsCount: reviewsCount })}
        </p>
      </div>
    </div>
  );
};

export default ProductHeader;
