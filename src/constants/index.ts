import {
  brazilFlag,
  deskAndOfficeImage,
  euaFlag,
  selfImprovementImage,
  travelImage,
} from "@/assets";
import {
  Collection,
  FooterLinkBottom,
  HeroBenefit,
  NavigationLink,
  RecentReview,
  RegionData,
  Testimonial,
} from "@/types";

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
