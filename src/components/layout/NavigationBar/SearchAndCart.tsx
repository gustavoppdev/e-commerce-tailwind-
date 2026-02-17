"use client";

// Next-Intl
import { useTranslations } from "next-intl";
import Link from "next/link";

// Componentes & Hooks
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

// Icons
import { Handbag, Search } from "lucide-react";

const SearchAndCart = () => {
  const { totalItems } = useCart();
  const t = useTranslations("Others.alt");

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={"ghost"}
        size={"icon-lg"}
        aria-label={t("search")}
        asChild
      >
        <Link href={"/products"}>
          <Search className="size-6 text-gray-400" strokeWidth={1.5} />
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        className="relative"
        aria-label={t("shoppingCart")}
        asChild
      >
        <Link href={"/cart"}>
          <Handbag className="size-6 text-gray-400" strokeWidth={1.5} />
          <span className="text-gray-600">{totalItems}</span>
        </Link>
      </Button>
    </div>
  );
};

export default SearchAndCart;
