// Constants
import { DeliveryMethodsArray } from "@/constants";

// Utils & Types
import { cn, formatCurrency } from "@/lib/utils";
import { DeliveryMethods, LocaleType } from "@/types";

// Icons
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  deliveryType: DeliveryMethods;
  setDeliveryType: (type: DeliveryMethods) => void;
  locale: LocaleType;
};

const DeliveryMethodsForm = ({
  deliveryType,
  setDeliveryType,
  locale,
}: Props) => {
  "use memo";
  const t = useTranslations("Sections.CheckoutPage.deliveryMethods");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {DeliveryMethodsArray.map((method) => (
        <button
          key={method.key}
          type="button"
          className={cn(
            "flex flex-col items-start text-sm border-2 p-4 rounded-lg transition-all duration-100 border-gray-300",
            deliveryType === method.key && "border-primary",
          )}
          onClick={() => setDeliveryType(method.key)}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <p className="font-medium capitalize">{t(method.title)}</p>

            {deliveryType === method.key && (
              <Check
                className="size-4 text-white bg-primary rounded-full p-[2px]"
                strokeWidth={2.5}
              />
            )}
          </div>
          <p className="text-muted-foreground">{t(method.description)}</p>

          <span className="mt-4 font-medium">
            {formatCurrency(method.price[locale], locale)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default DeliveryMethodsForm;
