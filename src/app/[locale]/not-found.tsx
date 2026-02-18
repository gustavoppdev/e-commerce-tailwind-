import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const NotFoundPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Others.NotFound" });

  return (
    <div className="section-container min-h-[60vh] flex flex-col items-center justify-center text-center gap-6">
      <h1 className="text-4xl md:text-5xl font-bold text-app-primary-50">
        404
      </h1>
      <div className="space-y-4 max-w-lg">
        <h2 className="text-2xl md:text-3xl font-semibold">{t("title")}</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("description")}
        </p>
      </div>

      <Button asChild className="mt-4">
        <Link href="/">{t("button")}</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
