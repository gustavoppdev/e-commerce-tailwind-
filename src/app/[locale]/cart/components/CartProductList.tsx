"use client";

// Next.js & Next-Intl
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Hooks & Utils
import { useCartDetails } from "@/hooks/useCartDetails";
import { formatCurrency } from "@/lib/utils";

// Components
import CartProduct from "./CartProduct";
import CartProductSkeleton from "./CartProductSkeleton";
import { Button } from "@/components/ui/button";

// Types & Icons
import { LocaleType } from "@/types";
import { ShoppingCart } from "lucide-react";

const CartProductList = () => {
  const { items, isLoading, isEmpty } = useCartDetails();
  const locale = useLocale() as LocaleType;
  const tEmpty = useTranslations("Sections.CartPage.cartEmpty");

  if (isLoading) {
    return (
      <ul className="border-t lg:col-span-3">
        {Array.from({ length: items.length }).map((_, index) => (
          <CartProductSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (isEmpty) {
    return (
      <div className="border-t lg:col-span-3 grid place-content-center justify-items-center gap-4 text-center">
        <ShoppingCart className="size-24 text-gray-200" />
        <h3 className="font-medium text-lg">{tEmpty("title")}</h3>
        <p className="text-muted-foreground max-w-lg">
          {tEmpty("description")}
        </p>
        <Button asChild>
          <Link href={"/products"}>{tEmpty("button")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <ul className="border-t lg:col-span-3 max-h-170 overflow-y-scroll scrollbar-minimalist">
      {items.map((item, index) => {
        const price = formatCurrency(item.price ?? 0, locale);

        return (
          <CartProduct
            key={`${index}-${item.id}`}
            item={item}
            locale={locale}
            price={price}
          />
        );
      })}
    </ul>
  );
};

export default CartProductList;
