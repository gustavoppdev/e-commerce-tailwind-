// Next-Intl
import { useTranslations } from "next-intl";

// Types & Icons
import { Order } from "@/types";
import { CreditCard } from "lucide-react";

type Props = {
  lastOrder: Order;
};

const OrderDetails = ({ lastOrder }: Props) => {
  const t = useTranslations("Sections.SuccessPage");

  return (
    <section className="grid grid-cols-2 gap-4 p-4 text-sm border-b pb-8 ">
      {/* Endereço de entrega */}
      <div className="space-y-2">
        <h3 className="font-medium">{t("shippingAddress")}</h3>
        <div className="text-muted-foreground">
          <p className="capitalize">{`${lastOrder.firstName} ${lastOrder.lastName}`}</p>
          <p>{lastOrder.shippingAddress.street}</p>
          <p>{`${lastOrder.shippingAddress.city}, ${lastOrder.shippingAddress.state} - ${lastOrder.shippingAddress.zipCode}`}</p>
        </div>
      </div>

      {/* Método de pagamento */}
      <div className="space-y-2">
        <h3 className="font-medium">{t("paymentMethod")}</h3>
        <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
          <CreditCard
            className="size-8 text-indigo-600"
            strokeWidth={1.5}
            aria-hidden="true"
          />

          <div>
            <p>
              {t("endingWith")} {lastOrder.paymentMethod.endingIn}
            </p>
            <p className="text-muted-foreground">
              {t("expires")} {lastOrder.paymentMethod.cardExpiry}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
