"use client";
// React Hook Form
import { FormProvider } from "react-hook-form";

// Components
import CheckoutForm from "./components/CheckoutForm";
import CheckoutOrderSummary from "./components/CheckoutOrderSummary";

// Hooks
import { useCheckout } from "@/hooks/useCheckout";

const CheckoutPage = () => {
  const { form, deliveryType, handleSetDeliveryType, onSubmit } = useCheckout();

  return (
    <FormProvider {...form}>
      <main className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 relative">
        <CheckoutForm
          setDeliveryType={handleSetDeliveryType}
          deliveryType={deliveryType}
        />
        <CheckoutOrderSummary onSubmit={onSubmit} deliveryType={deliveryType} />
      </main>
    </FormProvider>
  );
};

export default CheckoutPage;
