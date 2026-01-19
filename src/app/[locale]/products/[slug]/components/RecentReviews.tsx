import { RecentReviewsArray } from "@/constants";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const RecentReviews = () => {
  const t = useTranslations("Sections.RecentReviews");
  return (
    <section className="my-10 flex flex-col gap-6">
      <h2 className="font-medium text-xl border-b pb-6">{t("headline")}</h2>

      <ul className="flex flex-col gap-10">
        {RecentReviewsArray.map((review) => (
          <li
            key={review.author}
            className="flex flex-col lg:flex-row-reverse justify-between items-start gap-10 border-b pb-6 lg:pt-6"
          >
            {/* Rating & Quote */}
            <div className="flex flex-col items-start gap-4 xl:flex-row xl:justify-between flex-2">
              {/* Rating */}
              <div className="flex items-center gap-2 xl:flex-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-200 fill-current",
                    )}
                  />
                ))}
              </div>
              {/* Quote */}
              <div className="flex flex-col gap-6 text-sm xl:flex-2">
                <p className="font-medium">{t(review.emphasis)}</p>

                {review.quote.map((quote, index) => (
                  <p key={index} className="text-muted-foreground">
                    {t(quote)}
                  </p>
                ))}
              </div>
            </div>

            {/* Author & Date */}
            <div className="flex items-center gap-2 text-sm flex-1">
              <p className="font-medium">{t(review.author)}</p>
              <span className="h-5 w-px bg-gray-300"></span>
              <p className="text-muted-foreground">{t(review.date)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentReviews;
