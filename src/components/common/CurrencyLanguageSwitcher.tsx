"use client";

// React
import { useTransition } from "react";

// Next.js & Next-Intl
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";

// Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Constants & Icons
import { REGIONS } from "@/constants";
import { ChevronDown } from "lucide-react";

type Props = {
  layout?: "normal" | "footer";
};

export default function CurrencyLanguageSwitcher({ layout = "normal" }: Props) {
  const t = useTranslations("Others.currencyLanguageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const currentRegion = REGIONS[locale] || REGIONS.pt;
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: "pt" | "en") => {
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace({ pathname, params } as any, { locale: newLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label={t("changeLanguage")} variant={"ghost"}>
          <Image
            src={currentRegion.flag}
            alt={currentRegion.currency}
            width={26}
            height={26}
            sizes="26px"
            className="object-contain"
            priority
          />

          {layout === "normal" ? (
            <>
              <span className="text-gray-600">{currentRegion.currency}</span>
              <ChevronDown className="size-4 text-gray-400" />
            </>
          ) : (
            t("change")
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLocaleChange("pt")}
          disabled={locale === "pt" || isPending}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image src={REGIONS.pt.flag} alt="BRL" width={22} height={22} />
          <span>{t("portuguese")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange("en")}
          disabled={locale === "en" || isPending}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image src={REGIONS.en.flag} alt="USD" width={22} height={22} />
          <span>{t("english")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
