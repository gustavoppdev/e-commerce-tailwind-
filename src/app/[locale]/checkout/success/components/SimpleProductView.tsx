// Next-Intl & Next.js
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Components
import { Skeleton } from "@/components/ui/skeleton";

// Utils & Types
import { formatCurrency } from "@/lib/utils";
import { LocaleType, OrderItem } from "@/types";

type Props = {
  item: OrderItem;
  locale: LocaleType;
  lastOrderLocale: LocaleType;
};

const SimpleProductView = ({ item, locale, lastOrderLocale }: Props) => {
  const t = useTranslations("Sections.SuccessPage");

  return (
    <li
      key={item.variantKey}
      className="py-6 border-t last:border-b flex gap-4 text-sm"
    >
      <div className="relative aspect-square min-w-24 w-24 rounded-md bg-zinc-100 overflow-hidden hover:opacity-75 transition-opacity">
        {item.image ? (
          <Link
            href={{
              pathname: "/products/[slug]",
              params: {
                slug: item.slug ?? "",
              },
            }}
          >
            <Image
              src={item.image.asset?.url ?? ""}
              alt={item.name?.[locale] ?? ""}
              fill
              placeholder={item.image.asset?.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={item.image.asset?.metadata?.lqip ?? ""}
              className="object-cover object-center relative"
            />
          </Link>
        ) : (
          <Skeleton className="aspect-square w-24 rounded-md bg-zinc-100 overflow-hidden" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium">
          <Link
            href={{
              pathname: "/products/[slug]",
              params: {
                slug: item.slug ?? "",
              },
            }}
          >
            {item.name?.[locale]}
          </Link>
        </p>
        <p className="text-muted-foreground">{item.colorName?.[locale]}</p>
        <p className="mt-auto text-muted-foreground">
          {t("quantity")}: {item.quantity}
        </p>
      </div>
      <p className="flex-1 text-end font-medium">
        {formatCurrency(
          item?.price ? item.price * item.quantity : 0,
          lastOrderLocale,
        )}
      </p>
    </li>
  );
};

export default SimpleProductView;
