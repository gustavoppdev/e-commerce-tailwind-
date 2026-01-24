// src/lib/seo.ts
import { Metadata } from "next";

type SEOConfig = {
  title: string;
  description: string;
  locale: string;
  canonicalPath: string; // ex: "/products" ou "/products/slug"
  image?: string;
  noIndex?: boolean;
  alternatePaths?: {
    pt: string;
    en: string;
  };
};

export function constructMetadata({
  title,
  description,
  locale,
  canonicalPath,
  image,
  noIndex = false,
  alternatePaths,
}: SEOConfig): Metadata {
  const siteName = "Tailwind Store";
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      siteName,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}${canonicalPath}`,
      languages: alternatePaths
        ? {
            "pt-BR": `${baseUrl}/pt${alternatePaths.pt}`,
            "en-US": `${baseUrl}/en${alternatePaths.en}`,
          }
        : undefined,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
