import { FullProduct } from "@/types";
import { LocaleType } from "@/types";

type Description = FullProduct["description"];

type Props = {
  description: Description;
  locale: LocaleType;
};

const ProductDescription = ({ description, locale }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium ">
        {locale === "pt" ? "Descrição" : "Description"}
      </h3>

      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        {description?.[locale]?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
