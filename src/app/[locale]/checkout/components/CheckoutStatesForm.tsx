"use client";

import React, { useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useWatch,
} from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { STATES_BY_COUNTRY } from "@/constants";
import { cn } from "@/lib/utils";
import { CountriesType } from "@/types";

interface Props<T extends FieldValues> {
  control: Control<T>;
}

const CheckoutStatesForm = <T extends FieldValues>({ control }: Props<T>) => {
  const t = useTranslations("Sections.CheckoutPage.states");
  const tErrors = useTranslations("Others.errors.checkoutFormErrors");
  const [open, setOpen] = useState(false);

  // Observa o país selecionado no formulário
  const country = useWatch({
    control,
    name: "country" as Path<T>,
  }) as CountriesType;

  // Filtra os estados baseados no país com fallback para objeto vazio
  const states = useMemo(() => {
    return country && STATES_BY_COUNTRY[country]
      ? STATES_BY_COUNTRY[country]
      : {};
  }, [country]);

  const stateEntries = Object.entries(states);

  return (
    <Controller
      name={"state" as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="flex flex-col gap-2 w-full">
          <FieldLabel className="text-gray-600">{t("label")}</FieldLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                disabled={stateEntries.length === 0}
                className={cn(
                  "w-full justify-between font-normal border-gray-300 h-10",
                  !field.value && "text-muted-foreground",
                  fieldState.invalid && "border-red-500",
                )}
              >
                {/* Verifica se o valor atual existe no mapeamento do país selecionado */}
                {field.value && states[field.value]
                  ? states[field.value]
                  : t("placeholder")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-[--radix-popover-trigger-width] p-0"
              align="start"
            >
              <Command>
                {/* O valor do Input não deve ser vinculado ao field do form para evitar o erro de substring */}
                <CommandInput placeholder={t("search")} />
                <CommandList>
                  <CommandEmpty>{t("empty")}</CommandEmpty>
                  <CommandGroup>
                    {stateEntries.map(([key, value]) => (
                      <CommandItem
                        key={key}
                        value={value} // O Command usa o label para busca
                        onSelect={() => {
                          field.onChange(key); // Salvamos a sigla (ex: SP) no banco
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === key ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {value}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {fieldState.invalid && (
            <FieldError
              errors={[{ message: tErrors(fieldState.error?.message || "") }]}
            />
          )}
        </Field>
      )}
    />
  );
};

export default CheckoutStatesForm;
