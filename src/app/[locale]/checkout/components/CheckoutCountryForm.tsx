import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES_ARRAY } from "@/constants";
import { useTranslations } from "next-intl";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onValueChange?: (value: string) => void; // Prop para notificar mudança
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
              field.onChange(value); // Atualiza o hook-form
              if (onValueChange) onValueChange(value); // Reseta o estado
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
