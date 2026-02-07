// Next-Intl
import { useTranslations } from "next-intl";

// Components
import InputForm from "@/components/common/InputForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// React Hook Form
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useWatch,
} from "react-hook-form";

// Icons & Utils
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodFormProps<T extends FieldValues> {
  control: Control<T>;
}

const PaymentMethodForm = <T extends FieldValues>({
  control,
}: PaymentMethodFormProps<T>) => {
  const t = useTranslations("Sections.CheckoutPage.form");

  const selectedMethod = useWatch({
    control,
    name: "payment.method" as Path<T>,
  });

  const methods = [
    { id: "creditCard", icon: <CreditCard className="w-4 h-4 min-w-4" /> },
    { id: "paypal", icon: <Wallet className="w-4 h-4 min-w-4" /> },
    { id: "eTransfer", icon: <Landmark className="w-4 h-4 min-w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <Controller
        name={"payment.method" as Path<T>}
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4"
          >
            {methods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center space-x-3 border rounded-lg p-4 transition-colors ${
                  field.value === method.id
                    ? "border-primary cursor-pointer"
                    : "border-gray-300 opacity-60 cursor-not-allowed"
                } ${method.id !== "creditCard" && "cursor-not-allowed"}`}
              >
                <RadioGroupItem
                  value={method.id}
                  id={method.id}
                  disabled={method.id !== "creditCard"}
                  className="border-gray-400"
                />
                <Label
                  htmlFor={method.id}
                  className={cn(
                    "flex items-center gap-2 font-medium xl:text-xs 2xl:text-sm",
                    method.id !== "creditCard" && "cursor-not-allowed",
                  )}
                >
                  {method.icon}
                  {t(method.id)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />

      {selectedMethod === "creditCard" && (
        <div className="grid grid-cols-1 gap-4 mt-8">
          <InputForm
            name={"payment.cardNumber" as Path<T>}
            control={control}
            label="cardNumber"
          />
          <InputForm
            name={"payment.cardName" as Path<T>}
            control={control}
            label="cardName"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputForm
              name={"payment.cardExpiry" as Path<T>}
              control={control}
              label="cardExpiry"
              styles="md:col-span-2"
            />
            <InputForm
              name={"payment.cardCvc" as Path<T>}
              control={control}
              label="cardCvc"
              styles="md:col-span-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm;
