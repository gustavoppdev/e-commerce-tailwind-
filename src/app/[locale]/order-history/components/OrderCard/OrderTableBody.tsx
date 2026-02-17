// Next.js & Next-Intl
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Components
import { Button } from "@/components/ui/button";

// Tipos & Utils
import { LocaleType, Order, OrderItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

type Props = {
  item: OrderItem;
  order: Order;
  locale: LocaleType;
};

const OrderTableBody = ({ item, order, locale }: Props) => {
  const t = useTranslations("Sections.OrderHistory");

  const price = `${formatCurrency(
    item.price ?? 0,
    order.orderLocale,
  )} ${item.quantity > 1 ? `x ${item.quantity}` : ""}`;

  return (
    <tr className="flex items-center w-full text-muted-foreground border-b py-4 first:pt-0 first:md:pt-4">
      <td className="w-[60%] md:w-[30%] text-start text-black font-medium truncate flex gap-6 items-center relative group">
        {/* Imagem e Nome */}
        <Image
          src={item.image?.asset?.url ?? ""}
          alt={item.name?.[locale] ?? ""}
          placeholder="blur"
          blurDataURL={item.image?.asset?.metadata?.lqip ?? ""}
          width={64}
          height={64}
          sizes="64px"
          className="object-cover group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
        />
        <div className="flex items-center">
          <Link
            href={{
              pathname: "/products/[slug]",
              params: {
                slug: item.slug ?? "",
              },
            }}
            className="text-black font-medium text-balance after:absolute after:inset-0 mr-4 block"
          >
            {item.name?.[locale]}
          </Link>
          <p className="text-muted-foreground font-normal md:hidden">{price}</p>
        </div>
      </td>
      {/* Preço */}
      <td className="w-[20%] text-start hidden md:block">{price}</td>
      {/* Status */}
      <td className="w-[20%] text-start hidden md:block">
        {t(`status.${order.status}.description`)}
      </td>
      {/* Informações */}
      <td className="w-[40%] md:w-[30%] text-end justify-end">
        <Button variant={"link"} asChild className="md:pr-0">
          <Link
            href={{
              pathname: "/products/[slug]",
              params: {
                slug: item.slug ?? "",
              },
            }}
          >
            {t("table.view")}
          </Link>
        </Button>
      </td>
    </tr>
  );
};

export default OrderTableBody;
