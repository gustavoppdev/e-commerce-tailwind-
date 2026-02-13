// Next-Intl & Next.js
import { useTranslations } from "next-intl";

// Utils & Types
import { formatCurrency } from "@/lib/utils";
import { LocaleType, OrderDetailsType } from "@/types";

type Props = {
  orderDetails: OrderDetailsType[];
  locale: LocaleType;
  total: number;
};

const OrderSummaryDetails = ({ orderDetails, locale, total }: Props) => {
  const t = useTranslations("Sections.CheckoutPage.orderSummary");

  return (
    <div className="p-4">
      {orderDetails.map((detail) => (
        <div
          key={detail.label}
          className="flex justify-between text-sm items-center py-3"
        >
          <span className="capitalize">{t(detail.label)}</span>
          <span className="font-medium">
            {detail.isShipping && detail.value === 0 ? (
              <span className="text-green-600">{t("free")}</span>
            ) : (
              formatCurrency(detail.value, locale)
            )}
          </span>
        </div>
      ))}

      <div className="flex justify-between items-center pt-6 mt-4 mb-2 border-t">
        <span className="font-medium">{t("total")}</span>
        <span className="font-medium">{formatCurrency(total, locale)}</span>
      </div>
    </div>
  );
};

export default OrderSummaryDetails;
