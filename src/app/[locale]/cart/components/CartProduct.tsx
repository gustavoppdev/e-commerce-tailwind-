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

type Props = {
  item: ItemCartType;
  locale: LocaleType;
  price: string;
};

const CartProduct = ({ item, locale, price }: Props) => {
  const { removeFromCart } = useCart();

  return (
    <li className="flex gap-4 lg:gap-6 py-6 border-t first:border-t-0 last:border-b">
      <div className="relative aspect-3/4 w-24 lg:w-42 lg:aspect-square hover:opacity-90">
        <Link
          href={{
            pathname: "/products/[slug]",
            params: {
              slug: item.slug ?? "",
            },
          }}
        >
          <Image
            src={item.image?.images?.asset?.url ?? ""}
            alt={item.name ?? ""}
            fill
            sizes="(max-width: 1024px) 96px, 168px"
            placeholder="blur"
            blurDataURL={item.image?.images?.asset?.metadata?.lqip ?? ""}
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
            {item.name}
          </Link>
        </p>
        <p className="text-muted-foreground text-sm">
          {item.colorName?.[locale]}
        </p>
        <p className="mb-2 font-medium">{price}</p>

        <CartProductQuantity item={item} styles="md:hidden" />

        <ProductStock
          stock={item.stock ?? 0}
          styles="text-xs lg:text-sm mt-2 md:mt-auto text-balance"
        />
      </div>

      {/*  */}
      <div className="flex-1 flex justify-between items-start">
        <CartProductQuantity item={item} styles="hidden md:block" />
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          className="text-muted-foreground hover:text-red-600 cursor-pointer hover:bg-transparent items-start"
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
