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
import { DeliveryMethods, LocaleType, OrderDetailsType } from "@/types";

// Utils & Schemas
import { formatCurrency } from "@/lib/utils";
import { CheckoutSchema } from "../schemas";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Icons
import { Loader2 } from "lucide-react";
import OrderSummaryDetails from "@/components/common/OrderSummaryDetails";

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

  const orderDetails: OrderDetailsType[] = [
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

        <OrderSummaryDetails
          orderDetails={orderDetails}
          locale={locale}
          total={total}
        />

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
