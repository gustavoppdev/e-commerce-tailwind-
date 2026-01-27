import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Metadata.Login");

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    canonicalPath: "/auth/login",
    alternatePaths: {
      pt: "/auth/login",
      en: "/auth/login",
    },
  });
}
export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
