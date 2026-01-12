import { brazilFlag, euaFlag } from "@/assets";
import { HeroBenefit, NavigationLink, RegionData } from "@/types";

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

export const HeroBenefits: HeroBenefit[] = [
  {
    description: "benefits.01.description",
    subtitle: "benefits.01.subtitle",
  },
  {
    description: "benefits.02.description",
    subtitle: "benefits.02.subtitle",
  },
  {
    description: "benefits.03.description",
    subtitle: "benefits.03.subtitle",
  },
];
