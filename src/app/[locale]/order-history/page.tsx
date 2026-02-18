import { getTranslations } from "next-intl/server";
import OrderHistoryContent from "./components/OrderHistoryContent";
import { auth } from "@/auth";

const OrderHistoryPage = async () => {
  const t = await getTranslations("Sections.OrderHistory");
  const session = await auth();

  return (
    <main className="section-container space-y-10">
      <div className="pb-10 pt-12.5 space-y-4">
        <h1 className="font-bold text-4xl">{t("headline")}</h1>
        <p className="text-muted-foreground">{t("paragraph")}</p>
      </div>

      <OrderHistoryContent session={session} />
    </main>
  );
};

export default OrderHistoryPage;
