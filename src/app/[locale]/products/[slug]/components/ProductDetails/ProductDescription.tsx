// Tipos
import { FullProduct } from "@/types";
import { LocaleType } from "@/types";

// Next-Intl
import { useTranslations } from "next-intl";

type Description = FullProduct["description"];

type Props = {
  description: Description;
  locale: LocaleType;
};

const ProductDescription = ({ description, locale }: Props) => {
  const t = useTranslations("Sections.ProductPage.productDescription");
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium ">{t("title")}</h3>

      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        {description?.[locale]?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
