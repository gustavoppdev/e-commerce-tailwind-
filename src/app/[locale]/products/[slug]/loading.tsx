import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="section-container mt-8 animate-in fade-in duration-500 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Lado Esquerdo: Galeria de Imagens */}
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-muted/50">
          <Skeleton className="h-full w-full" />
          {/* Spinner centralizado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        </div>

        {/* Lado Direito: Detalhes e Ações */}
        <div className="flex flex-col gap-8 py-2">
          <div className="space-y-4">
            {/* Categoria / Material */}
            <Skeleton className="h-4 w-32" />
            {/* Nome do Produto */}
            <Skeleton className="h-12 w-10/12" />
            {/* Preço */}
            <Skeleton className="h-8 w-40" />
          </div>

          <div className="space-y-3">
            {/* Parágrafos de Descrição */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Seleção de Variações (Cores) */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" /> {/* Label "Cores" */}
            <div className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>

          {/* Botão de Checkout */}
          <div className="mt-auto space-y-4">
            <Skeleton className="h-14 w-full rounded-full" />
            {/* Garantias / Info Adicional */}
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Seção Inferior: Relacionados */}
      <div className="mt-24 border-t pt-16">
        <Skeleton className="h-8 w-64 mb-10" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>
      </div>
    </main>
  );
}
