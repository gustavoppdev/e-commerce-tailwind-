// Next.js & Next-Intl
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Components
import { Button } from "@/components/ui/button";
import CurrencyLanguageSwitcher from "@/components/common/CurrencyLanguageSwitcher";
import SearchAndCart from "./SearchAndCart";
import NavigationBarMobile from "./NavigationBarMobile";
import AuthSection from "./AuthSection";

// Assets & Constants
import { tailwindLogo } from "@/assets";
import { NavigationLinks } from "@/constants";

export const NavigationBar = () => {
  const t = useTranslations("Layout");
  return (
    <header className="section-container">
      <nav className="flex items-center justify-between py-4 lg:py-8 border-b">
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <NavigationBarMobile />
          </div>
          <Image
            src={tailwindLogo}
            alt="Tailwind Logo"
            width={38}
            height={32}
            className="object-contain"
          />

          <ul className="hidden lg:flex items-center gap-2">
            {NavigationLinks.map((link) => (
              <li key={link.label}>
                <Button variant={"link"} className="text-gray-500" asChild>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link href={link.href as any}>{t(link.label)}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/*  */}
        <div className="flex items-center justify-between gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <AuthSection />

            <CurrencyLanguageSwitcher />
          </div>

          {/* Pesquisa e carrinho */}
          <SearchAndCart />
        </div>
      </nav>
    </header>
  );
};
