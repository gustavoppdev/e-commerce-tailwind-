// Next-Intl
import { useTranslations } from "next-intl";

// Constants
import { FooterLinksBottom } from "@/constants";

// Components
import CurrencyLanguageSwitcher from "@/components/common/CurrencyLanguageSwitcher";

const FooterBottom = () => {
  const t = useTranslations("Layout.Footer.bottom");
  return (
    <div className="my-10 flex flex-col lg:flex-row justify-between gap-2 items-center text-muted-foreground">
      <p className="hover:underline cursor-pointer">
        {t("rights", { currentYear: new Date().getFullYear() })}
      </p>

      <ul className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1">
        {FooterLinksBottom.map((link) => (
          <li key={link.label} className="hover:underline cursor-pointer">
            {t(link.label)}
          </li>
        ))}
        <li className="flex items-center gap-2 ml-2">
          <span className="h-5 w-px block bg-neutral-200"></span>
          <CurrencyLanguageSwitcher layout="footer" />
        </li>
      </ul>
    </div>
  );
};

export default FooterBottom;
