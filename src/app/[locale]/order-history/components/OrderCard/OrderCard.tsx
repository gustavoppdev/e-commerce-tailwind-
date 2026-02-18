// Next-Intl
import { useLocale } from "next-intl";

// Tipos
import { LocaleType, Order } from "@/types";

// Componentes
import OrderHeader from "./OrderHeader";
import OrderTableHead from "./OrderTableHead";
import OrderTableBody from "./OrderTableBody";

type Props = {
  order: Order;
};

export const OrderCard = ({ order }: Props) => {
  const locale = useLocale() as LocaleType;

  return (
    <div className="space-y-8">
      {/* Order Header */}
      <OrderHeader order={order} />

      {/* Table Header */}
      <table className="w-full text-sm m-4">
        <OrderTableHead />

        {/* Table Body */}
        <tbody className="w-full text-sm">
          {order.items.map((item) => (
            <OrderTableBody
              key={item.variantKey}
              item={item}
              order={order}
              locale={locale}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
