import { Skeleton } from "@/components/ui/skeleton";

export const OrderHistorySkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton (Matches OrderHeader) */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-20 bg-gray-50 rounded-lg p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
        <div className="flex-1 flex lg:justify-end">
          <Skeleton className="h-10 w-full lg:w-32 rounded-md" />
        </div>
      </div>

      {/* Table Skeleton (Matches OrderCard Table) */}
      <div className="w-full m-4 space-y-4">
        {/* Table Header */}
        <div className="hidden md:flex items-center border-b pb-4">
          <Skeleton className="h-4 w-[30%] mr-4" />
          <Skeleton className="h-4 w-[20%] mr-4" />
          <Skeleton className="h-4 w-[20%] mr-4" />
          <Skeleton className="h-4 w-[30%] ml-auto" />
        </div>

        {/* Table Body Items */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center py-4 border-b last:border-0 gap-4"
          >
            <div className="w-full md:w-[30%] flex gap-6 items-center">
              <Skeleton className="h-16 w-16 rounded-md shrink-0" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-3 w-[60%] md:hidden" />
              </div>
            </div>
            <Skeleton className="hidden md:block h-4 w-[20%]" />
            <Skeleton className="hidden md:block h-4 w-[20%]" />
            <div className="w-full md:w-[30%] flex md:justify-end">
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
