import { CountriesType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, locale: string) {
  const currency = locale === "pt" ? "BRL" : "USD";
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
}

export const cardNumberMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .substring(0, 19);
};

export const cardExpiryMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .substring(0, 5);
};

export const cardCvcMask = (value: string) => {
  return value.replace(/\D/g, "").substring(0, 4);
};

export const phoneMask = (value: string, country: CountriesType) => {
  const cleanValue = value.replace(/\D/g, "");

  // EUA e Canadá (en-US, en-CA, fr-CA)
  if (country === "unitedStates" || country === "canada") {
    return cleanValue
      .replace(/^(\d{3})(\d)/, "($1) $2")
      .replace(/(\d{3})(\d{1,4})$/, "$1-$2")
      .substring(0, 14); // Ex: (123) 456-7890
  }

  // Brasil (pt-BR)
  return cleanValue
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2")
    .substring(0, 15); // Ex: (11) 99999-9999
};
