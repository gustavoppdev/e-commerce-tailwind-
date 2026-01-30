"use client";

// Components
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

// Icons
import { Handbag, Search } from "lucide-react";
import Link from "next/link";

const SearchAndCart = () => {
  const { totalItems } = useCart();
  return (
    <div className="flex items-center gap-2">
      <Button variant={"ghost"} size={"icon-lg"} asChild>
        <Link href={"/products"}>
          <Search className="size-6 text-gray-400" strokeWidth={1.5} />
        </Link>
      </Button>
      <Button variant={"ghost"} className="relative" asChild>
        <Link href={"/cart"}>
          <Handbag className="size-6 text-gray-400" strokeWidth={1.5} />
          <span className="text-gray-600">{totalItems}</span>
        </Link>
      </Button>
    </div>
  );
};

export default SearchAndCart;
