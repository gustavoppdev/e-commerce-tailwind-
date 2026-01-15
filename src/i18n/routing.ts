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
  },
});

export type Pathnames = keyof typeof routing.pathnames;
