import {
  brazilFlag,
  deskAndOfficeImage,
  euaFlag,
  selfImprovementImage,
  travelImage,
} from "@/assets";
import { Collection, HeroBenefit, NavigationLink, RegionData } from "@/types";

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

export const CATEGORY_SLUGS = {
  "desk-and-office": {
    pt: "mesa-e-escritorio",
    en: "desk-and-office",
  },
  travel: {
    pt: "viagens",
    en: "travel",
  },
  "self-improvement": {
    pt: "auto-aperfeicoamento",
    en: "self-improvement",
  },
} as const;

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

export const CollectionsArray: Collection[] = [
  {
    title: "list.deskAndOffice.title",
    description: "list.deskAndOffice.description",
    image: deskAndOfficeImage,
    key: "desk-and-office",
  },
  {
    title: "list.selfImprovement.title",
    description: "list.selfImprovement.description",
    image: selfImprovementImage,
    key: "self-improvement",
  },
  {
    title: "list.travel.title",
    description: "list.travel.description",
    image: travelImage,
    key: "travel",
  },
];
