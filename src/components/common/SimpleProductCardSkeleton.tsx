import { Skeleton } from "../ui/skeleton";

const SimpleProductCardSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="relative aspect-3/4 w-full rounded-lg overflow-hidden" />

      <div className="flex items-center justify-between gap-4 mt-4 mb-1 font-medium">
        <Skeleton className="w-24 h-4 rounded" />
        <Skeleton className="w-24 h-4 rounded" />
      </div>

      <div className="flex gap-4 items-center">
        <Skeleton className="w-12 h-4 rounded" />
        <Skeleton className="w-12 h-4 rounded" />
      </div>
    </div>
  );
};

export default SimpleProductCardSkeleton;
