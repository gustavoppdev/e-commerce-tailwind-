// Next-Intl
import { useTranslations } from "next-intl";

// React Hook Form
import {
  Controller,
  Control,
  FieldValues,
  Path,
  useWatch,
} from "react-hook-form";

// Components
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Utils
import {
  cardCvcMask,
  cardExpiryMask,
  cardNumberMask,
  phoneMask,
} from "@/lib/utils";

// T define a estrutura do formulário (ex: CheckoutSchema)
interface InputFormProps<T extends FieldValues> {
  name: Path<T>; // Garante que o nome exista no schema
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
  styles?: string;
}

const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  styles,
}: InputFormProps<T>) => {
  const t = useTranslations("Sections.CheckoutPage.form");
  const tErrors = useTranslations("Others.errors.checkoutFormErrors");

  const selectedCountry = useWatch({
    control,
    name: "country" as Path<T>,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={styles}>
          <FieldLabel htmlFor={field.name} className="text-gray-600">
            {t(label)}
          </FieldLabel>

          <Input
            {...field}
            value={field.value ?? ""}
            id={field.name}
            placeholder={placeholder && placeholder}
            aria-invalid={fieldState.invalid}
            type={type}
            className="border-gray-300 text-sm"
            onChange={(e) => {
              let value = e.target.value;

              // Lógica de Máscara Simples baseada no nome do campo
              if (name.includes("cardNumber")) {
                value = cardNumberMask(value);
              } else if (name.includes("cardExpiry")) {
                value = cardExpiryMask(value);
              } else if (name.includes("cardCvc")) {
                value = cardCvcMask(value);
              } else if (name.includes("phone")) {
                value = phoneMask(value, selectedCountry);
              }

              field.onChange(value);
            }}
          />

          {fieldState.invalid && (
            <FieldError
              errors={[
                {
                  message: tErrors(fieldState.error?.message || ""),
                },
              ]}
            />
          )}
        </Field>
      )}
    />
  );
};

export default InputForm;
