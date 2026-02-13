// Next.js & Next-Intl
import Image from "next/image";
import { Link } from "@/i18n/navigation";

// Hooks
import { ItemCartType } from "@/hooks/useCartDetails";
import { useCart } from "@/hooks/useCart";

// Components
import CartProductQuantity from "./CartProductQuantity";
import ProductStock from "@/app/[locale]/products/[slug]/components/ProductDetails/ProductStock";
import { Button } from "@/components/ui/button";

// Types & Icons
import { LocaleType } from "@/types";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  item: ItemCartType;
  locale: LocaleType;
  price: string;
  layout?: "checkout" | "cart";
};

const CartProduct = ({ item, locale, price, layout = "cart" }: Props) => {
  const { removeFromCart } = useCart();

  return (
    <li
      className={cn(
        "flex gap-4 lg:gap-6 py-6 border-t first:border-t-0 last:border-b",
        layout === "checkout" && "p-4",
      )}
    >
      <div
        className={cn(
          "relative w-full hover:opacity-90",
          layout === "checkout" && "aspect-square w-24",
          layout === "cart" && " aspect-square w-28 lg:w-36 lg:aspect-square",
        )}
      >
        <Link
          href={{
            pathname: "/products/[slug]",
            params: {
              slug: item.slug ?? "",
            },
          }}
        >
          <Image
            src={item.image?.asset?.url ?? ""}
            alt={item.name?.[locale] ?? ""}
            fill
            sizes="(max-width: 1024px) 96px, 144px"
            placeholder={item.image?.asset?.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={item.image?.asset?.metadata?.lqip ?? ""}
            priority
            fetchPriority="high"
            className="object-cover"
          />
        </Link>
      </div>

      {/*  */}
      <div className="flex flex-col gap-1 text-sm md:flex-1">
        <p className="font-medium">
          <Link
            href={{
              pathname: "/products/[slug]",
              params: {
                slug: item.slug ?? "",
              },
            }}
          >
            {item.name?.[locale]}
          </Link>
        </p>
        <p className="text-muted-foreground text-sm">
          {item.colorName?.[locale]}
        </p>
        <p
          className={cn("mb-2 font-medium", layout === "checkout" && "mt-auto")}
        >
          {price}
        </p>

        {layout === "cart" && (
          <CartProductQuantity item={item} styles="md:hidden" />
        )}

        {layout === "cart" && (
          <ProductStock
            stock={item.stock ?? 0}
            styles="text-xs lg:text-sm mt-2 md:mt-auto text-balance"
          />
        )}
      </div>

      {/*  */}
      <div
        className={cn(
          layout === "cart" &&
            "flex-1 flex justify-end md:justify-between items-start",
          layout === "checkout" &&
            "flex-1 flex flex-col-reverse justify-between items-end",
        )}
      >
        <CartProductQuantity
          item={item}
          styles={cn("hidden md:block", layout === "checkout" && "block ")}
        />
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          className="text-muted-foreground hover:text-red-600 cursor-pointer hover:bg-transparent items-start "
          onClick={() => removeFromCart(item.id, item.variantKey)}
          aria-label="Remover item"
        >
          <X className="size-4" />
        </Button>
      </div>
    </li>
  );
};

export default CartProduct;
