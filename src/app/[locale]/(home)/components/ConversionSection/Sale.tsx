// Next.js & Next-Intl
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Components
import { Button } from "@/components/ui/button";

const Sale = () => {
  const t = useTranslations("Sections.Sale");
  return (
    <div className="flex flex-col gap-4 lg:gap-6 text-center items-center py-20 relative z-20">
      <h2 className="font-bold text-4xl lg:text-5xl">{t("headline")}</h2>
      <p className="text-muted-foreground text-xl max-w-2xl">
        {t("paragraph")}
      </p>
      <Button
        size={"lg"}
        className="bg-gray-900 hover:bg-gray-900/80 w-full sm:w-auto"
        asChild
      >
        <Link href="/products">{t("ctaBtn")}</Link>
      </Button>
    </div>
  );
};

export default Sale;
