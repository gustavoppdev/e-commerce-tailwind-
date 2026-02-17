// Next.js & Next-Intl
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

// Componentes
import { Button } from "@/components/ui/button";
import CurrencyLanguageSwitcher from "@/components/common/CurrencyLanguageSwitcher";
import SearchAndCart from "./SearchAndCart";
import AuthSection from "./AuthSection";
import { NavigationBarMobile } from "./NavigationBarMobile";

// Assets & Constantes
import { tailwindLogo } from "@/assets";
import { NavigationLinks } from "@/constants";

// Auth
import { auth } from "@/auth";

export const NavigationBar = async () => {
  const t = await getTranslations("Layout");
  const session = await auth();

  return (
    <header className="section-container">
      <nav className="flex items-center justify-between py-4 lg:py-8 border-b">
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <NavigationBarMobile session={session} />
          </div>
          <Link href={"/"}>
            <Image
              src={tailwindLogo}
              alt="Tailwind Logo"
              width={38}
              height={32}
              sizes="38px"
              className="object-contain"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-2">
            {NavigationLinks.map((link) => (
              <li key={link.label}>
                <Button variant={"link"} className="text-gray-500" asChild>
                  <Link
                    href={
                      link.href
                        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (link.href as any)
                        : {
                            pathname: "/products",
                            query: {
                              categories: link.hrefSlug,
                            },
                          }
                    }
                  >
                    {t(link.label)}
                  </Link>
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
