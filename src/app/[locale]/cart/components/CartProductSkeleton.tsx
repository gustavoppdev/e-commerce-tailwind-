import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  layout?: "checkout" | "cart";
};

const CartProductSkeleton = ({ layout = "cart" }: Props) => {
  return (
    <li
      className={cn(
        "flex gap-4 lg:gap-6 py-6 border-t first:border-t-0 last:border-b",
        layout === "checkout" && "p-4",
      )}
    >
      {/* Imagem Placeholder */}
      <Skeleton
        className={cn(
          layout === "cart"
            ? "aspect-3/4 w-24 lg:w-42 lg:aspect-square"
            : "w-24 aspect-square",
        )}
      />

      {/* Detalhes do Produto */}
      <div className="flex flex-col gap-1 text-sm md:flex-1">
        {/* Título (Nome do Produto) */}
        <Skeleton className="h-5 w-[80%] md:w-[60%]" />

        {/* Cor/Atributo */}
        <Skeleton className="h-4 w-[40%] mt-1" />

        {/* Preço */}
        <Skeleton className="h-5 w-[30%] mt-2 mb-2" />

        {/* Quantidade (Mobile) */}
        {layout === "cart" && <Skeleton className="h-10 w-24 md:hidden" />}

        {/* Stock Status */}
        {layout === "cart" && (
          <Skeleton className="h-4 w-[50%] mt-2 md:mt-auto" />
        )}
      </div>

      {/* Ações e Quantidade (Desktop) */}
      <div
        className={cn(
          layout === "cart" && "flex-1 flex justify-between items-start",
          layout === "checkout" &&
            "flex-1 flex flex-col-reverse justify-between items-end",
        )}
      >
        {/* Quantidade (Desktop) */}
        <Skeleton className="hidden md:block h-10 w-20" />

        {/* Botão de Remover (X) */}
        <Skeleton className="size-8 rounded-md" />
      </div>
    </li>
  );
};

export default CartProductSkeleton;
