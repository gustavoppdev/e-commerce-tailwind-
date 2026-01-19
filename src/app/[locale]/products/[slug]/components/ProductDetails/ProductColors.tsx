import { GET_PRODUCT_BY_SLUG_QUERY_RESULT } from "@/../sanity.types";
import { LocaleType } from "@/types";
import { cn } from "@/lib/utils";

// Definimos o tipo de uma única cor para facilitar
type ColorOption = NonNullable<
  NonNullable<GET_PRODUCT_BY_SLUG_QUERY_RESULT>["colors"]
>[number];

type Props = {
  product: NonNullable<GET_PRODUCT_BY_SLUG_QUERY_RESULT>;
  locale: LocaleType;
  selectedColor: ColorOption | undefined;
  onColorChange: (color: ColorOption) => void;
};

const ProductColors = ({
  product,
  locale,
  selectedColor,
  onColorChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium ">{locale === "pt" ? "Cores" : "Colors"}</h3>

      <div className="flex items-center justify-start gap-3">
        {product?.colors?.map((color) => {
          const isSelected = selectedColor?._key === color._key;

          return (
            <button
              key={color._key}
              onClick={() => onColorChange(color)}
              className={cn(
                "relative size-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out",
                "border-black/50",
                isSelected ? "border-2" : "hover:border",
              )}
            >
              {/* O círculo da cor interna */}
              <div
                className="size-8 rounded-full border border-black/5"
                style={{ backgroundColor: color.colorHex || "#ccc" }}
              />

              {/* Tooltip nativo simples */}
              <span className="sr-only">{color.colorName?.[locale]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductColors;
