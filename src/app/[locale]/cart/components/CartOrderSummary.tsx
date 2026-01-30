"use client";

// Next-Intl
import { useLocale, useTranslations } from "next-intl";

// Components
import { Button } from "@/components/ui/button";

// Hooks
import { useCartDetails } from "@/hooks/useCartDetails";

// Utils & Constants
import { DELIVERY_COST, FREE_DELIVERY_THRESHOLD, TAX_RATE } from "@/constants";
import { formatCurrency } from "@/lib/utils";
import { Session } from "next-auth";
import { Link } from "@/i18n/navigation";

type Props = {
  session: Session | null;
};

const CartOrderSummary = ({ session }: Props) => {
  const locale = useLocale() as "pt" | "en";
  const { cartTotal, isEmpty } = useCartDetails();
  const t = useTranslations("Sections.CartPage.orderSummary");

  // Cálculos de Negócio
  const taxes = cartTotal * TAX_RATE;

  // Regra de Frete Grátis baseada no locale e subtotal
  const threshold = FREE_DELIVERY_THRESHOLD[locale];
  const isFreeDelivery = cartTotal >= threshold;
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_COST.standard;

  const orderTotal = cartTotal + taxes + deliveryFee;

  // Estrutura para o Loop de UI
  const orderDetails = [
    { label: "subtotal", value: cartTotal },
    { label: "taxes", value: taxes },
    { label: "deliveryFee", value: deliveryFee, isShipping: true },
  ];

  return (
    <div className="lg:col-span-2 p-8 bg-neutral-50 rounded-xl flex flex-col gap-6 h-fit">
      <h2 className="text-xl font-medium">{t("title")}</h2>

      <div>
        {orderDetails.map((detail) => (
          <div
            key={detail.label}
            className="flex justify-between text-sm items-center border-b py-4"
          >
            <span className="text-muted-foreground">{t(detail.label)}</span>
            <span className="font-medium">
              {detail.isShipping && detail.value === 0 ? (
                <span className="text-green-600">{t("free")}</span>
              ) : (
                formatCurrency(detail.value, locale)
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-medium">
        <h3>{t("total")}</h3>
        <span>{formatCurrency(orderTotal, locale)}</span>
      </div>

      <div className="space-y-4 pt-2">
        <Button
          className="w-full h-12 text-base shadow-sm"
          size="lg"
          disabled={isEmpty || !session}
          asChild
        >
          <Link href={"/checkout"}>
            {session ? t("checkoutBtn") : t("loginToCheckout")}
          </Link>
        </Button>

        {/* Progresso para frete grátis */}
        {!isFreeDelivery && (
          <p className="text-xs text-center text-neutral-500">
            {t("missingForFree", {
              amount: formatCurrency(threshold - cartTotal, locale),
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default CartOrderSummary;
