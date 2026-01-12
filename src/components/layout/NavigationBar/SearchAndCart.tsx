// Components
import { Button } from "@/components/ui/button";

// Icons
import { Handbag, Search } from "lucide-react";

const SearchAndCart = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant={"ghost"} size={"icon-lg"}>
        <Search className="size-6 text-gray-400" strokeWidth={1.5} />
      </Button>
      <Button variant={"ghost"} className="relative ">
        <Handbag className="size-6 text-gray-400" strokeWidth={1.5} />
        <span className="text-gray-600">0</span>
      </Button>
    </div>
  );
};

export default SearchAndCart;
