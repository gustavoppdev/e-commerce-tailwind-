import { COUNTRIES_ARRAY, LOCALES_ARRAY } from "@/constants";
import { z } from "zod";

/**
 * Schema de validação Zod para o formulário de Checkout.
 * Centralizado aqui para ser reutilizado tanto no hook (se criar um)
 * quanto na página e nos componentes de interface.
 */

export const checkoutSchema = z.object({
  // --- Informações Pessoais ---
  firstName: z.string().min(2, "firstNameMin"),
  lastName: z.string().min(2, "lastNameMin"),
  phone: z.string().min(8, "phoneMin"),

  // --- Endereço ---
  address: z.string().min(5, "addressMin"),
  complement: z.string().optional().or(z.literal("")), // Opcional
  city: z.string().min(2, "cityMin"),
  country: z.enum(COUNTRIES_ARRAY),
  state: z.string().min(2, "stateInvalid"),
  zipCode: z.string().min(5, "zipCodeMin"), // CEP

  // --- Pagamento ---
  // Discriminated Unions são ótimos para validação condicional.
  // O campo 'method' determina quais outros campos são obrigatórios.
  payment: z.discriminatedUnion("method", [
    // 1. Cartão de Crédito (Campos obrigatórios)
    z.object({
      method: z.literal("creditCard"),
      cardNumber: z
        .string()
        .min(16, "cardNumberInvalid") // Idealmente use uma máscara aqui
        .max(19),
      cardName: z.string().min(3, "cardNameMin"),
      cardExpiry: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "cardExpiryInvalid"),
      cardCvc: z.string().min(3, "cardCvcMin").max(4),
    }),
    z.object({
      method: z.literal("paypal"),
    }),
    z.object({
      method: z.literal("eTransfer"),
    }),
  ]),
  locale: z.enum(LOCALES_ARRAY),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
