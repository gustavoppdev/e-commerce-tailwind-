import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Metadata.Success");

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    locale,
    canonicalPath: "/checkout/success",
    alternatePaths: {
      pt: "/checkout/sucesso",
      en: "/checkout/success",
    },
  });
}
export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
