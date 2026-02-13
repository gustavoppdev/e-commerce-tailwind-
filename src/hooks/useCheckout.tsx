// React
import { useState } from "react";

// React Hook Form
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Next.js
import { useLocale } from "next-intl";

// Types
import { DeliveryMethods, LocaleType } from "@/types";
import {
  CheckoutSchema,
  checkoutSchema,
} from "@/app/[locale]/checkout/schemas";
import { useOrderHistory } from "./useOrderHistory";
import { useCartDetails } from "./useCartDetails";
import { useCart } from "./useCart";
import { v4 as uuidv4 } from "uuid";
import { Order } from "@/types";
import { useRouter } from "@/i18n/navigation";

interface UseCheckoutReturn {
  form: UseFormReturn<CheckoutSchema>;
  deliveryType: DeliveryMethods;
  handleSetDeliveryType: (type: DeliveryMethods) => void;
  onSubmit: (data: CheckoutSchema) => void;
}

export const useCheckout = (): UseCheckoutReturn => {
  const locale = useLocale() as LocaleType;
  const router = useRouter();

  const [deliveryType, setDeliveryType] = useState<DeliveryMethods>("standard");

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      complement: "",
      city: "",
      country: "brazil",
      state: "",
      zipCode: "",
      phone: "",
      locale: locale,
      payment: {
        method: "creditCard",
        cardNumber: "",
        cardName: "",
        cardExpiry: "",
        cardCvc: "",
      },
    },
  });

  const handleSetDeliveryType = (type: DeliveryMethods) => {
    setDeliveryType(type);
  };

  const { saveOrder } = useOrderHistory();
  const { items, cartSubtotal, taxes, getDeliveryCost } = useCartDetails();
  const { clearCart } = useCart();

  const onSubmit = async (data: CheckoutSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      form.setValue("locale", locale);

      const deliveryFee = getDeliveryCost(deliveryType);
      const total = cartSubtotal + taxes + deliveryFee;

      const newOrder: Order = {
        id: uuidv4(),
        date: new Date().toISOString(),
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          variantKey: item.variantKey,
          name: item.name,
          price: item.price,
          slug: item.slug,
          image: item.image ?? null,
          colorName: item.colorName,
          subtotal: item.subtotal,
        })),
        total,
        subtotal: cartSubtotal,
        deliveryFee,
        taxes,
        status: "processing",
        shippingAddress: {
          street: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        paymentMethod: {
          method: data.payment.method,
          endingIn:
            data.payment.method === "creditCard"
              ? data.payment.cardNumber.slice(-4)
              : "",
          cardExpiry:
            data.payment.method === "creditCard" ? data.payment.cardExpiry : "",
        },
        orderLocale: data.locale,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      saveOrder(newOrder);
      clearCart();
    } catch (error) {
      console.error("Erro ao finalizar checkout:", error);
    } finally {
      router.push("/checkout/success");
    }
  };

  return {
    form,
    deliveryType,
    handleSetDeliveryType,
    onSubmit,
  };
};
