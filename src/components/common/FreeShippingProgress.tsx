// Next-Intl
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Constants & Types
import { FREE_DELIVERY_THRESHOLD } from "@/constants";
import { LocaleType } from "@/types";

// Utils
import { formatCurrency } from "@/lib/utils";

type Props = {
  cartSubtotal: number;
  locale: LocaleType;
};

const FreeShippingProgress = ({ cartSubtotal, locale }: Props) => {
  const t = useTranslations("Sections.CartPage.orderSummary");

  const threshold = FREE_DELIVERY_THRESHOLD[locale];
  const isFreeDelivery = cartSubtotal >= threshold;

  return (
    <>
      {!isFreeDelivery && (
        <Link
          href={"/products"}
          className="text-xs text-center text-green-600 mt-4 block hover:underline"
        >
          {t("missingForFree", {
            amount: formatCurrency(threshold - cartSubtotal, locale),
          })}
        </Link>
      )}
    </>
  );
};

export default FreeShippingProgress;
