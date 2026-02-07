import { Pathnames } from "@/i18n/routing";
import { StaticImageData } from "next/image";
import {
  GET_PRODUCT_BY_SLUG_QUERY_RESULT,
  GET_PRODUCTS_QUERY_RESULT,
} from "../../sanity.types";

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

export type FooterLink = {
  title: TranslationKey;
  links: {
    label: TranslationKey;
    href: string;
  }[];
};

export type FooterLinkBottom = {
  label: string;
  href: string;
};

export type LocaleType = "pt" | "en";

export type FullProduct = NonNullable<GET_PRODUCT_BY_SLUG_QUERY_RESULT>;

export type RecentReview = {
  rating: number;
  emphasis: TranslationKey;
  quote: TranslationKey[];
  author: TranslationKey;
  date: TranslationKey;
};

// Extraímos o tipo base do produto
type Product = NonNullable<GET_PRODUCTS_QUERY_RESULT>[number];

// Tipos literais extraídos do Sanity
type CategoryValue = Product["category"];
type MaterialValue = Product["material"] extends { pt?: string }
  ? NonNullable<Product["material"]["pt"]>
  : string;

// Interface para as opções individuais
interface FilterOption<T> {
  label: string;
  value: T;
  hex?: string; // Opcional, usado apenas para cores
}

// Interface para cada grupo de filtro (Categories, Materials, Colors)
interface FilterGroup<T> {
  id: "categories" | "materials" | "colors";
  label: string;
  options: FilterOption<T>[];
}

// O tipo unificado que permite diferentes tipos de value no mesmo array
export type ProductFilterGroup =
  | FilterGroup<CategoryValue>
  | FilterGroup<MaterialValue>
  | FilterGroup<string>; // string para cores

export type LoginBenefit = {
  icon: React.ReactNode;
  title: TranslationKey;
  description: TranslationKey;
};

export type DeliveryMethods = "standard" | "express";

export type DeliveryMethodType = {
  key: DeliveryMethods;
  title: TranslationKey;
  description: TranslationKey;
  price: {
    pt: number;
    en: number;
  };
};

export type CountriesType = "brazil" | "unitedStates" | "canada";

export type StatesType = {
  [key in CountriesType]: Record<string, string>;
};

// 3. Tipos para o Histórico de Pedidos
export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  quantity: number;
  variantKey: string;
  name?: string;
  price?: number;
  slug?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any; // Mantendo any por enquanto para evitar dependencias complexas do Sanity aqui
  colorName?: string;
  subtotal: number;
}

export interface Order {
  id: string; // ID único do pedido (UUID)
  date: string; // Data em formato ISO
  items: OrderItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  status: OrderStatus;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}
