// Next-Intl
import { useTranslations } from "next-intl";
import Image from "next/image";

// Componentes
import Newsletter from "./Newsletter";
import FooterBottom from "./FooterBottom";
import Loyalty from "./Loyalty";

// Assets
import { tailwindLogo } from "@/assets";

// Constantes
import { FooterLinks } from "@/constants";
import { Link } from "@/i18n/navigation";

export const Footer = () => {
  const t = useTranslations("Layout.Footer.links");
  return (
    <footer className="mt-10 section-container">
      <div className="border-t pt-10">
        <Link href={"/"}>
          <Image
            src={tailwindLogo}
            alt="Tailwind Logo"
            width={40}
            height={40}
            sizes="40px"
            className="object-cover"
          />
        </Link>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 my-15 text-sm">
          {FooterLinks.map((section, index) => (
            <ul key={index} className="flex flex-col gap-6">
              <li className="font-medium hover:underline cursor-pointer">
                {t(section.title)}
              </li>
              {section.links.map((link, index) => (
                <li
                  key={index}
                  className="text-muted-foreground hover:underline cursor-pointer"
                >
                  {t(link.label)}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="bg-gray-100 grid place-content-center rounded-lg hover:shadow-sm transition-shadow duration-300">
            <Newsletter />
          </div>
          <Loyalty />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};
