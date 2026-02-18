import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { useFormatter, useTranslations } from "next-intl";
import { Order } from "@/types";

type Props = {
  order: Order;
};

const OrderHeader = ({ order }: Props) => {
  const format = useFormatter();
  const t = useTranslations("Sections.OrderHistory");

  const formattedTotal = formatCurrency(order.total, order.orderLocale);

  const HeaderData = [
    {
      label: t("table.datePlaced"),
      value: format.dateTime(new Date(order.date), {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    {
      label: t("table.orderNumber"),
      value: order.id.slice(0, 8).toUpperCase(),
    },
    {
      label: t("table.totalAmount"),
      value: formattedTotal,
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-20 bg-gray-50 rounded-lg p-4">
      {HeaderData.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "flex-1 lg:flex-0 flex justify-between items-center sm:items-start lg:flex-col gap-1 py-4 lg:py-2 border-b lg:border-0 text-sm ",
            index === 2 && "border-b-0",
          )}
        >
          <p className="whitespace-nowrap font-medium">{item.label}</p>
          <p
            className={cn(
              "truncate",
              index === 2 ? "text-black font-medium" : "text-muted-foreground",
            )}
          >
            {item.value}
          </p>
        </div>
      ))}

      {/* Botão como a 4ª coluna */}
      <div className="flex-1 flex lg:justify-end">
        <Button variant="outline" className="w-full lg:w-auto px-8 h-10">
          {t("table.viewInvoice")}
        </Button>
      </div>
    </div>
  );
};

export default OrderHeader;
