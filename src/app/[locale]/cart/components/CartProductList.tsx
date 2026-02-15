"use client";

// Next.js & Next-Intl
import { useLocale } from "next-intl";

// Hooks & Utils
import { useCartDetails } from "@/hooks/useCartDetails";
import { formatCurrency } from "@/lib/utils";

// Componentes
import CartProduct from "./CartProduct";
import CartProductSkeleton from "./CartProductSkeleton";
import EmptyCart from "@/components/common/EmptyCart";

// Types
import { LocaleType } from "@/types";

const CartProductList = () => {
  const { items, isLoading, isEmpty } = useCartDetails();
  const locale = useLocale() as LocaleType;

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
      <EmptyCart layout="cart" styles="border-t lg:col-span-3 py-8 lg:py-0" />
    );
  }

  return (
    <ul className="border-t lg:col-span-3 max-h-170 overflow-y-scroll scrollbar-minimalist">
      {items.map((item) => {
        const price = formatCurrency(item.price ?? 0, locale);

        return (
          <CartProduct
            key={`${item.id}-${item.variantKey}`}
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
