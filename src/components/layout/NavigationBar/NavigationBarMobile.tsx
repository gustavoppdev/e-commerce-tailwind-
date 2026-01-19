import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import React from "react";

const NavigationBarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="pl-0!">
          <MenuIcon className="size-6 text-gray-400" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationBarMobile;
