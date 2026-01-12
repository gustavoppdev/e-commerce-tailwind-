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
  },
});

export type Pathnames = keyof typeof routing.pathnames;
