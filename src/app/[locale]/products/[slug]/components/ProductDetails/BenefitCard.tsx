// Next-Intl
import { useTranslations } from "next-intl";

// Icons
import { Globe, CircleDollarSign } from "lucide-react";

// Constants
import { ProductBenefits } from "@/constants";

const BenefitCard = () => {
  const t = useTranslations("Sections.ProductPage.benefits");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-center">
      {ProductBenefits.map((benefit, index) => (
        <div
          key={benefit.title}
          className="p-6 border bg-neutral-100 rounded-lg flex flex-col gap-1 items-center justify-center"
        >
          {index === 0 ? (
            <Globe className="size-6 text-muted-foreground" />
          ) : (
            <CircleDollarSign className="size-6 text-muted-foreground" />
          )}
          <h4 className="font-medium">{t(benefit.title)}</h4>
          <p className="text-muted-foreground">{t(benefit.description)}</p>
        </div>
      ))}
    </div>
  );
};

export default BenefitCard;
