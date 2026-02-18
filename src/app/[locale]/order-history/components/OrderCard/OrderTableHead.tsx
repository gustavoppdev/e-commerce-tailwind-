import { useTranslations } from "next-intl";

const OrderTableHead = () => {
  const t = useTranslations("Sections.OrderHistory");
  return (
    <thead className="md:block hidden border-b">
      <tr className="flex items-center text-muted-foreground w-full py-4">
        <th className="font-normal text-start w-[30%]">{t("table.product")}</th>
        <th className="font-normal text-start w-[20%]">{t("table.price")}</th>
        <th className="font-normal text-start w-[20%]">{t("table.status")}</th>
        <th className="font-normal w-[30%] justify-end text-end">
          {t("table.info")}
        </th>
      </tr>
    </thead>
  );
};

export default OrderTableHead;
