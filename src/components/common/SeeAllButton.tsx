// Next-Intl
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Components
import { Button } from "@/components/ui/button";

// Utils & Icons
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Props = {
  styles?: string;
};

const SeeAllButton = ({ styles }: Props) => {
  const t = useTranslations("Sections.Trending");

  return (
    <Button
      variant={"link"}
      className={cn(
        "text-indigo-600 hover:text-indigo-600/80 font-semibold",
        styles
      )}
      asChild
    >
      <Link href={"/products"} className="flex items-center gap-2">
        {t("seeAllBtn")} <ArrowRight className="size-4" />
      </Link>
    </Button>
  );
};

export default SeeAllButton;
