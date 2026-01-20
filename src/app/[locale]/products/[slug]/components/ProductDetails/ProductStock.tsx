import { cn } from "@/lib/utils";
import { FullProduct } from "@/types";
import { useTranslations } from "next-intl";

type Props = {
  stock: FullProduct["stock"];
};

const ProductStock = ({ stock }: Props) => {
  const t = useTranslations("Sections.ProductPage.stock");
  return (
    <div className="flex items-center gap-2 text-sm">
      {(stock ?? 0) > 0 ? (
        <>
          <div
            className={cn(
              "size-2 rounded-full animate-pulse",
              (stock ?? 0) > 5 ? "bg-emerald-500" : "bg-amber-500",
            )}
          />

          <span
            className={(stock ?? 0) > 5 ? "text-emerald-700" : "text-amber-600"}
          >
            {(stock ?? 0) > 5
              ? t("inStock")
              : t("remainingStock", { stock: stock ?? 0 })}
          </span>
        </>
      ) : (
        <>
          <div className="size-2 rounded-full bg-red-500" />
          <span className="text-red-700">{t("outOfStock")}</span>
        </>
      )}
    </div>
  );
};

export default ProductStock;
