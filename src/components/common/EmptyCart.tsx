// Next.js & Next-Intl
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Components
import { Button } from "../ui/button";

// Utils & Icons
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

type Props = {
  layout: "cart" | "checkout";
  styles?: string;
};

const EmptyCart = ({ layout, styles }: Props) => {
  const tEmpty = useTranslations("Sections.CartPage.cartEmpty");
  return (
    <div
      className={cn(
        "grid place-content-center justify-items-center gap-4 text-center",
        styles,
      )}
    >
      <ShoppingCart
        className={cn(
          "text-gray-200",
          layout === "cart" ? "size-24" : "size-12",
        )}
      />
      <h3
        className={cn(
          "font-medium",
          layout === "cart" ? "text-lg" : "text-base",
        )}
      >
        {tEmpty("title")}
      </h3>
      <p
        className={cn(
          "text-muted-foreground max-w-lg px-4",
          layout === "cart" ? "text-base" : "text-sm",
        )}
      >
        {tEmpty("description")}
      </p>
      <Button asChild>
        <Link href={"/products"}>{tEmpty("button")}</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
