// Tipos & Next-Intl
import { FullProduct, LocaleType } from "@/types";
import { useTranslations } from "next-intl";

type Features = FullProduct["features"];

type Props = {
  features: Features;
  locale: LocaleType;
};

const ProductFeatures = ({ features, locale }: Props) => {
  const t = useTranslations("Sections.ProductPage.productDetails");

  return (
    <div className="border-t py-6 flex flex-col gap-4">
      <h3 className="font-medium">{t("title")}</h3>

      <ul className="flex flex-col gap-2 text-muted-foreground text-sm ml-2">
        {features?.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span>-</span>
            {feature[locale]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
