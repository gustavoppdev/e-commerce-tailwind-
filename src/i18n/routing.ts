import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "pt"],

  // Used when no locale matches
  defaultLocale: "pt",

  pathnames: {
    "/": {
      pt: "/",
      en: "/",
    },
    "/auth/login": {
      pt: "/auth/login",
      en: "/auth/login",
    },
    "/products": {
      pt: "/produtos",
      en: "/products",
    },
    "/products/[slug]": {
      pt: "/produtos/[slug]",
      en: "/products/[slug]",
    },
    "/cart": {
      pt: "/carrinho",
      en: "/cart",
    },
    "/checkout": {
      pt: "/checkout",
      en: "/checkout",
    },
    "/checkout/success": {
      pt: "/checkout/sucesso",
      en: "/checkout/success",
    },
    "/order-history": {
      pt: "/historico-de-pedidos",
      en: "/order-history",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
