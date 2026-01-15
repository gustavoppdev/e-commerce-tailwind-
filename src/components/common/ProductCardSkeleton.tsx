import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="flex shrink-0 w-[65vw] sm:w-[40vw] md:w-[30vw] lg:w-full flex-col gap-4 items-center">
      {/* Imagem - Mantemos o aspect-square para bater com o original */}
      <Skeleton className="aspect-square w-full rounded-lg" />

      <div className="flex flex-col gap-2 w-full items-center">
        {/* Cor (Texto menor) */}
        <Skeleton className="h-4 w-20" />

        {/* Título */}
        <Skeleton className="h-5 w-3/4" />

        {/* Preço */}
        <Skeleton className="h-5 w-1/4" />

        {/* Bolinhas de cores */}
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
