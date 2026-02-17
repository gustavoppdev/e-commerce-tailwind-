import {
  brazilFlag,
  confirmationPageImage,
  deskAndOfficeImage,
  euaFlag,
  selfImprovementImage,
  travelImage,
} from "@/assets";
import {
  Collection,
  CountriesType,
  DeliveryMethodType,
  FooterLinkBottom,
  HeroBenefit,
  LocaleType,
  NavigationLink,
  ProductFilterGroup,
  RecentReview,
  RegionData,
  StatesType,
  Testimonial,
} from "@/types";
import { ShieldCheck, Star, Zap } from "lucide-react";

// Navbar
export const NavigationLinks: NavigationLink[] = [
  {
    label: "NavigationLinks.home",
    href: "/",
  },
  {
    label: "NavigationLinks.deskAndOffice",
    hrefSlug: "desk-and-office",
  },
  {
    label: "NavigationLinks.selfImprovement",
    hrefSlug: "self-improvement",
  },
  {
    label: "NavigationLinks.travel",
    hrefSlug: "travel",
  },
];

// HeroBenefits
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

// CurrencyLanguageSwitcher
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

// CollectionCard
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

export const CategorySlug = (collection: Collection) =>
  CATEGORY_SLUGS[collection.key as keyof typeof CATEGORY_SLUGS]["en"];

// Collections
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
  {
    title: "list.all.title",
    description: "list.all.description",
    image: confirmationPageImage,
    key: "all",
  },
];

// Testimonials
export const TestimonialsArray: Testimonial[] = [
  {
    quote: "list.01.quote",
    author: "list.01.author",
  },
  {
    quote: "list.02.quote",
    author: "list.02.author",
  },
  {
    quote: "list.03.quote",
    author: "list.03.author",
  },
];

// ProductBenefits
export const ProductBenefits = [
  {
    title: "01.title",
    description: "01.description",
  },
  {
    title: "02.title",
    description: "02.description",
  },
];

// RecentReviews
export const RecentReviewsArray: RecentReview[] = [
  {
    rating: 5,
    emphasis: "list.01.emphasis",
    quote: ["list.01.quote1", "list.01.quote2"],
    author: "list.01.author",
    date: "list.01.date",
  },
  {
    rating: 5,
    emphasis: "list.02.emphasis",
    quote: ["list.02.quote1", "list.02.quote2"],
    author: "list.02.author",
    date: "list.02.date",
  },
  {
    rating: 4,
    emphasis: "list.01.emphasis",
    quote: ["list.03.quote1", "list.03.quote2"],
    author: "list.03.author",
    date: "list.03.date",
  },
];

// Footer
export const FooterLinks = [
  {
    title: "01.products",
    links: [
      { label: "01.pens", href: "/products/pens" },
      { label: "01.journals", href: "/products/journals" },
      { label: "01.deskObjects", href: "/products/desk-objects" },
      { label: "01.mugs", href: "/products/mugs" },
      { label: "01.accessories", href: "/products/accessories" },
    ],
  },
  {
    title: "02.company",
    links: [
      { label: "02.whoWeAre", href: "/about" },
      { label: "02.sustainability", href: "/sustainability" },
      { label: "02.press", href: "/press" },
      { label: "02.careers", href: "/careers" },
    ],
  },
  {
    title: "03.customerService",
    links: [
      { label: "03.contact", href: "/contact" },
      { label: "03.shipping", href: "/shipping-info" },
      { label: "03.returns", href: "/returns-exchanges" },
      { label: "03.faq", href: "/faq" },
    ],
  },
  {
    title: "04.legal",
    links: [
      { label: "04.termsService", href: "/legal/terms" },
      { label: "04.privacyPolicy", href: "/legal/privacy" },
      { label: "04.returnPolicy", href: "/legal/returns" },
    ],
  },
];

// Footer
export const FooterLinksBottom: FooterLinkBottom[] = [
  {
    label: "links.01",
    href: "#",
  },
  {
    label: "links.02",
    href: "#",
  },
  {
    label: "links.03",
    href: "#",
  },
];

// Products
export const PRODUCT_FILTERS: ProductFilterGroup[] = [
  {
    id: "colors",
    label: "list.colors.title",
    options: [
      { label: "list.colors.black", value: "black", hex: "#000000" },
      {
        label: "list.colors.aluminium",
        value: "natural-aluminum",
        hex: "#bcbcbc",
      },
      { label: "list.colors.amber", value: "amber", hex: "#ffba00" },
      { label: "list.colors.natural", value: "natural", hex: "#c2582d" },
      { label: "list.colors.white", value: "white", hex: "#fafafa" },
    ],
  },
  {
    id: "categories",
    label: "list.categories.title",
    options: [
      { label: "list.categories.desk", value: "desk-and-office" },
      { label: "list.categories.self", value: "self-improvement" },
      { label: "list.categories.travel", value: "travel" },
    ],
  },
  {
    id: "materials",
    label: "list.materials.title",
    options: [
      { label: "list.materials.wood", value: "wood" },
      { label: "list.materials.leather", value: "leather" },
      { label: "list.materials.metal", value: "metal" },
      { label: "list.materials.paper", value: "paper" },
      { label: "list.materials.glass", value: "glass" },
    ],
  },
];

// Login
export const LoginBenefits = [
  {
    icon: Zap,
    title: "benefits.list.01.title",
    description: "benefits.list.01.description",
  },
  {
    icon: Star,
    title: "benefits.list.02.title",
    description: "benefits.list.02.description",
  },
  {
    icon: ShieldCheck,
    title: "benefits.list.03.title",
    description: "benefits.list.03.description",
  },
];

// Frete gratis
export const FREE_DELIVERY_THRESHOLD = {
  pt: 260,
  en: 50,
};

// Taxa padrão
export const TAX_RATE = 0.03;

// Métodos de entrega
export const DeliveryMethodsArray: DeliveryMethodType[] = [
  {
    key: "standard",
    title: "standard.title",
    description: "standard.description",
    price: {
      pt: 50,
      en: 10,
    },
  },
  {
    key: "express",
    title: "express.title",
    description: "express.description",
    price: {
      pt: 130,
      en: 25,
    },
  },
];

// Países
export const COUNTRIES_ARRAY: CountriesType[] = [
  "brazil",
  "unitedStates",
  "canada",
];

// Estados por país
export const STATES_BY_COUNTRY: StatesType = {
  brazil: {
    AC: "Acre",
    AL: "Alagoas",
    AP: "Amapá",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goiás",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraima",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins",
  },
  unitedStates: {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  },
  canada: {
    AB: "Alberta",
    BC: "British Columbia",
    MB: "Manitoba",
    NB: "New Brunswick",
    NL: "Newfoundland and Labrador",
    NS: "Nova Scotia",
    ON: "Ontario",
    PE: "Prince Edward Island",
    QC: "Quebec",
    SK: "Saskatchewan",
  },
};

// Locales
export const LOCALES_ARRAY: LocaleType[] = ["pt", "en"];
