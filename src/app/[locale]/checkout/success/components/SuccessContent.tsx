"use client";

// Next-Intl & Next.js
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

// Componentes
import OrderSummaryDetails from "@/components/common/OrderSummaryDetails";
import { Button } from "@/components/ui/button";
import OrderDetails from "./OrderDetails";
import SimpleProductView from "./SimpleProductView";
import SuccessContentSkeleton from "./SuccessContentSkeleton";

// Hooks
import { useOrderHistory } from "@/hooks/useOrderHistory";

// Tipos & Icones
import { LocaleType } from "@/types";
import { ArrowRight } from "lucide-react";

const SuccessContent = () => {
  const { lastOrder, isLoading } = useOrderHistory();
  const t = useTranslations("Sections.SuccessPage");
  const locale = useLocale() as LocaleType;

  if (isLoading) {
    return <SuccessContentSkeleton />;
  }

  if (!lastOrder) {
    return null;
  }

  const orderDetails = [
    { label: "subtotal", value: lastOrder.subtotal },
    { label: "taxes", value: lastOrder.taxes },
    { label: "deliveryFee", value: lastOrder.deliveryFee, isShipping: true },
  ];

  return (
    <div className="max-lg:container max-lg:mx-auto max-lg:px-4 max-lg:md:px-10 max-lg:xl:px-20 mt-10 flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm text-indigo-600 font-medium">
          {t("introduction")}
        </p>

        <h1 className="font-bold text-3xl 2xl:text-4xl">{t("headline")}</h1>

        <p className="text-muted-foreground">{t("paragraph")}</p>
      </div>

      <div className="mt-10 text-sm font-medium space-y-2">
        <p>{t("trackingNumber")}</p>

        <p className="text-indigo-600">{lastOrder.id}</p>
      </div>

      {/* Lista de produtos */}
      <ul className="flex flex-col gap-2">
        {lastOrder.items?.map((item) => (
          <SimpleProductView
            key={item.variantKey}
            item={item}
            locale={locale}
            lastOrderLocale={lastOrder.orderLocale}
          />
        ))}
      </ul>

      {/* Resumo do pedido */}
      <OrderSummaryDetails
        orderDetails={orderDetails}
        locale={lastOrder.orderLocale}
        total={lastOrder.total}
      />

      {/* Detalhes da entrega */}
      <OrderDetails lastOrder={lastOrder} />

      {/* Continue Comprando */}
      <Button variant={"link"} asChild>
        <Link href={"/products"} className="self-end">
          {t("continueShopping")} <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
};

export default SuccessContent;
