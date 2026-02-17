// Next-Intl
import { getTranslations } from "next-intl/server";

// Auth.js
import { auth } from "@/auth";

// Components
import CartProductList from "./components/CartProductList";
import CartOrderSummary from "./components/CartOrderSummary";

const CartPage = async () => {
  const t = await getTranslations("Sections.CartPage");
  const session = await auth();

  return (
    <main className="section-container min-h-[calc(100dvh-113px)] lg:min-h-[calc(100dvh-145px)]">
      <div className="pb-10 pt-12.5 space-y-4">
        <h1 className="font-bold text-2xl lg:text-3xl 2xl:text-4xl">
          {t("headline")}
        </h1>
        <p className="text-muted-foreground">{t("paragraph")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-20">
        <CartProductList />

        <CartOrderSummary session={session} />
      </div>
    </main>
  );
};

export default CartPage;
