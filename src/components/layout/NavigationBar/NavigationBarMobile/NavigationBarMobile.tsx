"use client";

// Next.js & Next-Intl
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

// Componentes
import CurrencyLanguageSwitcher from "@/components/common/CurrencyLanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserArea from "./UserArea";

// React & Auth
import { Session } from "next-auth";
import { useState } from "react";

// Constantes & Icones
import { CollectionsArray } from "@/constants";
import { MenuIcon } from "lucide-react";

type Props = {
  session: Session | null;
};

export const NavigationBarMobile = ({ session }: Props) => {
  const tCollections = useTranslations("Sections.Collections");

  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="pl-0! relative" aria-label="Menu">
          <MenuIcon className="size-6 text-gray-400" />
          <span
            aria-label={session ? "Online" : "Offline"}
            className={`absolute size-2 rounded-full bottom-1.5 right-3 ${session ? "bg-green-500" : "bg-red-500"}`}
          ></span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[90%] max-w-[338px] sm:max-w-[338px] "
      >
        <SheetHeader>
          <SheetTitle>
            <CurrencyLanguageSwitcher />
          </SheetTitle>
          <SheetDescription className="sr-only" />
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Coleções */}
          <div className="grid grid-cols-2 gap-4 px-4">
            {CollectionsArray.map((collection) => (
              <div key={collection.key} className="relative text-balance group">
                <Image
                  src={collection.image}
                  alt={tCollections(collection.title)}
                  width={136}
                  height={136}
                  sizes="136px"
                  className="aspect-square rounded-lg object-cover group-hover:opacity-90"
                />

                <div className="space-y-2 mt-2 text-sm">
                  <Link
                    href={{
                      pathname: "/products",
                      ...(collection.key !== "all" && {
                        query: {
                          categories: collection.key,
                        },
                      }),
                    }}
                    className="after:absolute after:inset-0"
                    onClick={() => setOpen(false)}
                  >
                    <div className="w-[136px] truncate font-medium">
                      {tCollections(collection.title)}
                    </div>
                    <span className="text-muted-foreground">
                      {tCollections(collection.description)}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-6" />

          {/* Área do usuário */}
          <UserArea session={session} setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
