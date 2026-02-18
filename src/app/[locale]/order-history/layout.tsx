import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Metadata.OrderHistory");

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    canonicalPath: "/order-history",
    alternatePaths: {
      pt: "/historico-de-pedidos",
      en: "/order-history",
    },
  });
}
export default function OrderHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
