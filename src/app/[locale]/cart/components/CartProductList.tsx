"use client";

// Next.js & Next-Intl
import { useLocale } from "next-intl";

// Hooks & Utils
import { useCartDetails } from "@/hooks/useCartDetails";
import { formatCurrency } from "@/lib/utils";

// Components
import CartProduct from "./CartProduct";
import CartProductSkeleton from "./CartProductSkeleton";

// Types & Icons
import { LocaleType } from "@/types";
import EmptyCart from "@/components/common/EmptyCart";

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
