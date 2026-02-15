// Next-Intl
import { useTranslations } from "next-intl";

// React Hook Form
import { Control, Controller, FieldValues, Path } from "react-hook-form";

// Componentes
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Constantes
import { COUNTRIES_ARRAY } from "@/constants";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onValueChange?: (value: string) => void;
}

const CheckoutCountryForm = <T extends FieldValues>({
  control,
  name,
  onValueChange,
}: Props<T>) => {
  const t = useTranslations("Sections.CheckoutPage.countries");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel className="text-gray-600">{t("country")}</FieldLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) onValueChange(value);
            }}
            value={field.value}
          >
            <SelectTrigger
              className="w-full border-gray-300"
              defaultValue={field.value}
              aria-label={t("country")}
            >
              <SelectValue placeholder={t("country")} />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES_ARRAY.map((country) => (
                <SelectItem key={country} value={country}>
                  {t(country)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};

export default CheckoutCountryForm;
