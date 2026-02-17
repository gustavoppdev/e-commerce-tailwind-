// Next-Intl & Next.js
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

// Constantes & Utils
import { FREE_DELIVERY_THRESHOLD } from "@/constants";
import { formatCurrency } from "@/lib/utils";

// Tipos
import { LocaleType } from "@/types";

const Topbar = () => {
  const t = useTranslations("Layout.Topbar");
  const locale = useLocale() as LocaleType;

  const value = formatCurrency(FREE_DELIVERY_THRESHOLD[locale], locale);

  return (
    <div className="bg-indigo-600 text-white text-center font-medium p-2 text-sm lg:text-base">
      <Link href="/products" className="p-2">
        {t("freeDelivery", { value })}
      </Link>
    </div>
  );
};

export default Topbar;
