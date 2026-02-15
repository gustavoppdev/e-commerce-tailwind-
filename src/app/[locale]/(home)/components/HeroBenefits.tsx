// Next-Intl
import { useTranslations } from "next-intl";

// Constantes & Utils
import { HeroBenefits as HeroBenefitsData } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {
  layout: "mobile" | "desktop";
};

const HeroBenefits = ({ layout }: Props) => {
  const t = useTranslations("Sections.Hero");

  // Seção de Benefícios, ex: 15% de desconto na primeira compra

  return (
    <section
      className={cn(
        "grid grid-cols-1 lg:grid-cols-3 text-center bg-white",
        layout === "mobile" ? "lg:hidden" : "hidden lg:grid",
      )}
    >
      {HeroBenefitsData.map((benefit) => (
        <div
          key={benefit.subtitle}
          className="p-6 space-y-1 border-b lg:border-r lg:first:border-l"
        >
          <h2 className="text-muted-foreground text-sm">
            {t(benefit.subtitle)}
          </h2>
          <p className="font-semibold">{t(benefit.description)}</p>
        </div>
      ))}
    </section>
  );
};

export default HeroBenefits;
