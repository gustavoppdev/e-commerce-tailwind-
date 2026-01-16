import { Pathnames } from "@/i18n/routing";
import { StaticImageData } from "next/image";

export type TranslationKey = string;

export type NavigationLink = {
  label: TranslationKey;
  href: Pathnames;
};

// 1. Definimos o tipo para as moedas aceitas
export type Currency = "BRL" | "USD";

// 2. Definimos a estrutura de cada região
export interface RegionData {
  label: string;
  currency: Currency;
  symbol: string;
  flag: StaticImageData;
  intlLocale: string; // Útil para formatação (pt-BR vs en-US)
}

export type HeroBenefit = {
  subtitle: TranslationKey;
  description: TranslationKey;
};

export type Collection = {
  title: TranslationKey;
  description: TranslationKey;
  image: StaticImageData;
  key: string;
};

export type Testimonial = {
  quote: TranslationKey;
  author: TranslationKey;
};
