import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NavigationBar } from "@/components/layout/NavigationBar";
import QueryProvider from "@/providers/QueryProvider";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
import Topbar from "@/components/layout/NavigationBar/Topbar";
import ScrollToTop from "@/components/common/ScrollToTop";
import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Metadata.Home" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    canonicalPath: "/",
    locale,
  });
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider locale={locale}>
          <CartProvider>
            <Topbar />
            <ScrollToTop />
            <NavigationBar />
            <QueryProvider>
              {children}
              <Footer />
            </QueryProvider>
            <Toaster />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
