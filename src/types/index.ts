import { Pathnames } from "@/i18n/routing";
import { StaticImageData } from "next/image";
import {
  GET_CART_PRODUCTS_QUERY_RESULT,
  GET_PRODUCT_BY_SLUG_QUERY_RESULT,
  GET_PRODUCTS_QUERY_RESULT,
} from "../../sanity.types";

// Chave de tradução
export type TranslationKey = string;

// Links de navegação
export type NavigationLink = {
  label: TranslationKey;
  href: Pathnames;
};

// Moedas
export type Currency = "BRL" | "USD";

// CurrencyLanguageSwitcher
export interface RegionData {
  label: string;
  currency: Currency;
  symbol: string;
  flag: StaticImageData;
  intlLocale: string;
}

// Hero Benefits - Home Page
export type HeroBenefit = {
  subtitle: TranslationKey;
  description: TranslationKey;
};

// Collections - Home Page
export type Collection = {
  title: TranslationKey;
  description: TranslationKey;
  image: StaticImageData;
  key: string;
};

// Testimonials - Home Page
export type Testimonial = {
  quote: TranslationKey;
  author: TranslationKey;
};

// Footer
export type FooterLink = {
  title: TranslationKey;
  links: {
    label: TranslationKey;
    href: string;
  }[];
};

// Footer
export type FooterLinkBottom = {
  label: string;
  href: string;
};

// Locales
export type LocaleType = "pt" | "en";

// Full Product
export type FullProduct = NonNullable<GET_PRODUCT_BY_SLUG_QUERY_RESULT>;

// Recent Reviews - Product Page
export type RecentReview = {
  rating: number;
  emphasis: TranslationKey;
  quote: TranslationKey[];
  author: TranslationKey;
  date: TranslationKey;
};

// Product
type Product = NonNullable<GET_PRODUCTS_QUERY_RESULT>[number];

// Product Categories
type CategoryValue = Product["category"];

// Product Materials
type MaterialValue = Product["material"] extends { pt?: string }
  ? NonNullable<Product["material"]["pt"]>
  : string;

// Filtros individuais
interface FilterOption<T> {
  label: string;
  value: T;
  hex?: string;
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

// Login Benefits - Login Page
export type LoginBenefit = {
  icon: React.ReactNode;
  title: TranslationKey;
  description: TranslationKey;
};

// Metodos de envio
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

// Paises, Estados - Checkout Page
export type CountriesType = "brazil" | "unitedStates" | "canada";

export type StatesType = {
  [key in CountriesType]: Record<string, string>;
};

// Historico de pedidos
export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

// Item do pedido
export interface OrderItem {
  id: string;
  quantity: number;
  variantKey: string;
  name?: NonNullable<GET_CART_PRODUCTS_QUERY_RESULT>[number]["name"];
  price?: number;
  slug?: string;
  image:
    | NonNullable<
        NonNullable<GET_CART_PRODUCTS_QUERY_RESULT>[number]["colors"]
      >[number]["images"]
    | null;
  colorName?: NonNullable<
    NonNullable<GET_CART_PRODUCTS_QUERY_RESULT>[number]["colors"]
  >[number]["colorName"];
  subtotal: number;
}

// Pedido
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
  paymentMethod: {
    method: string;
    endingIn: string;
    cardExpiry: string;
  };
  orderLocale: LocaleType;
  firstName: string;
  lastName: string;
}

export type OrderDetailsType = {
  label: TranslationKey;
  value: number;
  isShipping?: boolean;
};
