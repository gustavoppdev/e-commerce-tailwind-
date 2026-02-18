import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";

export const OrderHistoryEmptyState = () => {
  const t = useTranslations("Sections.OrderHistory.empty");

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
      <div className="bg-muted p-6 rounded-full">
        <PackageOpen className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="space-y-2 max-w-sm">
        <h3 className="text-xl font-semibold">{t("title")}</h3>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <Button asChild size="lg">
        <Link href="/products">{t("actionBtn")}</Link>
      </Button>
    </div>
  );
};
