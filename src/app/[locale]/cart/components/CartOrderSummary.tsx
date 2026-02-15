"use client";

// Next-Intl
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Components
import { Button } from "@/components/ui/button";
import FreeShippingProgress from "@/components/common/FreeShippingProgress";

// Hooks
import { useCartDetails } from "@/hooks/useCartDetails";

// Utils & Next Auth
import { formatCurrency } from "@/lib/utils";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const CartOrderSummary = ({ session }: Props) => {
  const locale = useLocale() as "pt" | "en";
  const { cartSubtotal, isEmpty, taxes, getDeliveryCost } = useCartDetails();
  const t = useTranslations("Sections.CartPage.orderSummary");

  const deliveryFee = getDeliveryCost("standard");

  const orderTotal = cartSubtotal + taxes + deliveryFee;

  // Estrutura para o Loop de UI
  const orderDetails = [
    { label: "subtotal", value: cartSubtotal },
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
        >
          <Link href={"/checkout"}>
            {session ? t("checkoutBtn") : t("loginToCheckout")}
          </Link>
        </Button>

        {/* Progresso para frete grátis */}
        <FreeShippingProgress cartSubtotal={cartSubtotal} locale={locale} />
      </div>
    </div>
  );
};

export default CartOrderSummary;
