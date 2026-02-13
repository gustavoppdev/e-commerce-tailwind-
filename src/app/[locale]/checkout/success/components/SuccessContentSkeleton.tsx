import { Skeleton } from "@/components/ui/skeleton";

const SuccessContentSkeleton = () => {
  return (
    <div className="max-lg:container max-lg:mx-auto max-lg:px-4 max-lg:md:px-10 max-lg:xl:px-20 mt-10 flex flex-col gap-6 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="mt-10 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Lista de produtos Skeleton */}
      <div className="flex flex-col gap-2">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4 py-4 border-b">
            <Skeleton className="h-24 w-24 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Resumo Skeleton */}
      <div className="space-y-4 border-b pb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default SuccessContentSkeleton;
