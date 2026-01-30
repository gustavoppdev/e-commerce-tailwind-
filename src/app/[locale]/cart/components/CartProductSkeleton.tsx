import { Skeleton } from "@/components/ui/skeleton";

const CartProductSkeleton = () => {
  return (
    <li className="flex gap-4 lg:gap-6 py-6 border-t first:border-t-0 last:border-b">
      {/* Imagem Placeholder */}
      <Skeleton className="aspect-3/4 w-24 lg:w-42 lg:aspect-square" />

      {/* Detalhes do Produto */}
      <div className="flex flex-col gap-1 text-sm md:flex-1">
        {/* Título (Nome do Produto) */}
        <Skeleton className="h-5 w-[80%] md:w-[60%]" />

        {/* Cor/Atributo */}
        <Skeleton className="h-4 w-[40%] mt-1" />

        {/* Preço */}
        <Skeleton className="h-5 w-[30%] mt-2 mb-2" />

        {/* Quantidade (Mobile) */}
        <Skeleton className="h-10 w-24 md:hidden" />

        {/* Stock Status */}
        <Skeleton className="h-4 w-[50%] mt-2 md:mt-auto" />
      </div>

      {/* Ações e Quantidade (Desktop) */}
      <div className="flex-1 flex justify-between items-start">
        {/* Quantidade (Desktop) */}
        <Skeleton className="hidden md:block h-10 w-24" />

        {/* Botão de Remover (X) */}
        <Skeleton className="size-8 rounded-md" />
      </div>
    </li>
  );
};

export default CartProductSkeleton;
