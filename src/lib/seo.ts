import { Metadata } from "next";

type SEOConfig = {
  title: string;
  description: string;
  locale: string;
  canonicalPath: string;
  image?: string;
  noIndex?: boolean;
  alternatePaths?: {
    pt: string;
    en: string;
  };
  ogTitle?: string;
};

export function constructMetadata({
  title,
  description,
  locale,
  canonicalPath,
  image,
  noIndex = false,
  alternatePaths,
  ogTitle,
}: SEOConfig): Metadata {
  const siteName = "Tailwind Store";
  const fullTitle = `${title} - ${siteName}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description,
    keywords: ["Tailwind Store", "Store", "E-commerce", "Minimalist"],
    authors: [{ name: siteName }],
    openGraph: {
      title: ogTitle || fullTitle,
      description,
      type: "website",
      siteName,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      url: `${baseUrl}/${locale}${canonicalPath}`,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [{ url: image }] : undefined,
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
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}
