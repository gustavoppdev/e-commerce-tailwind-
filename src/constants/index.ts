import { brazilFlag, euaFlag } from "@/assets";
import { NavigationLink, RegionData } from "@/types";

export const NavigationLinks: NavigationLink[] = [
  {
    label: "NavigationLinks.women",
    href: "/",
  },
  {
    label: "NavigationLinks.men",
    href: "/",
  },
  {
    label: "NavigationLinks.company",
    href: "/",
  },
  {
    label: "NavigationLinks.stores",
    href: "/",
  },
];

export const REGIONS: Record<string, RegionData> = {
  pt: {
    label: "Português",
    currency: "BRL",
    symbol: "R$",
    flag: brazilFlag,
    intlLocale: "pt-BR",
  },
  en: {
    label: "English",
    currency: "USD",
    symbol: "$",
    flag: euaFlag,
    intlLocale: "en-US",
  },
};
