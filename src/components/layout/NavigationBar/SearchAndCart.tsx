// Components
import { Button } from "@/components/ui/button";

// Icons
import { Handbag, Search } from "lucide-react";
import Link from "next/link";

const SearchAndCart = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant={"ghost"} size={"icon-lg"} asChild>
        <Link href={"/products"}>
          <Search className="size-6 text-gray-400" strokeWidth={1.5} />
        </Link>
      </Button>
      <Button variant={"ghost"} className="relative ">
        <Handbag className="size-6 text-gray-400" strokeWidth={1.5} />
        <span className="text-gray-600">0</span>
      </Button>
    </div>
  );
};

export default SearchAndCart;
