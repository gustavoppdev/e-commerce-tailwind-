// Hook
import { useCartDetails } from "@/hooks/useCartDetails";

// Next.js & Next-Intl
import { useLocale, useTranslations } from "next-intl";

// Componentes
import CartProduct from "../../cart/components/CartProduct";
import CartProductSkeleton from "../../cart/components/CartProductSkeleton";
import { Button } from "@/components/ui/button";
import EmptyCart from "@/components/common/EmptyCart";
import FreeShippingProgress from "@/components/common/FreeShippingProgress";

// Types & Constants
import { DeliveryMethods, LocaleType } from "@/types";

// Utils & Schemas
import { formatCurrency } from "@/lib/utils";
import { CheckoutSchema } from "../schemas";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Icons
import { Loader2 } from "lucide-react";

type Props = {
  onSubmit: (data: CheckoutSchema) => void;
  deliveryType: DeliveryMethods;
};

const CheckoutOrderSummary = ({ onSubmit, deliveryType }: Props) => {
  const { items, isEmpty, isLoading, cartSubtotal, taxes, getDeliveryCost } =
    useCartDetails();
  const { handleSubmit, formState } = useFormContext<CheckoutSchema>();
  const { isSubmitting } = formState;
  const t = useTranslations("Sections.CheckoutPage.orderSummary");
  const locale = useLocale() as LocaleType;

  const deliveryFee = getDeliveryCost(deliveryType);

  const total = cartSubtotal + taxes + deliveryFee;

  const orderDetails = [
    { label: "subtotal", value: cartSubtotal },
    { label: "taxes", value: taxes },
    { label: "deliveryFee", value: deliveryFee, isShipping: true },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium py-6">{t("headline")}</h2>

      <div className="rounded-lg border overflow-hidden">
        {/* Loading */}
        {isLoading ? (
          <ul className="border-t">
            {Array.from({ length: items.length }).map((_, index) => (
              <CartProductSkeleton key={index} layout="checkout" />
            ))}
          </ul>
        ) : (
          <ul>
            {/* Empty */}
            {isEmpty && <EmptyCart layout="checkout" styles="py-8 border-b" />}

            {items.map((item, index) => {
              const price = formatCurrency(item.price ?? 0, locale);

              return (
                <CartProduct
                  key={`${index}-${item.id}`}
                  item={item}
                  locale={locale}
                  price={price}
                  layout="checkout"
                />
              );
            })}
          </ul>
        )}

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

        <div className="border-t p-4">
          <Button
            size={"lg"}
            className="w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || isLoading || isEmpty}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              t("confirmOrderBtn")
            )}
          </Button>
          {/* Progresso para frete grátis */}
          <FreeShippingProgress cartSubtotal={cartSubtotal} locale={locale} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
