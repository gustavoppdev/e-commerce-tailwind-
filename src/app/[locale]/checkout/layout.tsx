import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Metadata.Checkout");

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    locale,
    canonicalPath: "/checkout",
    alternatePaths: {
      pt: "/checkout",
      en: "/checkout",
    },
  });
}
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
