"use client";

// Next-Intl
import { useLocale, useTranslations } from "next-intl";

// React Hook Form & Schemas
import { useFormContext } from "react-hook-form";
import { CheckoutSchema } from "../schemas";

// Componentes
import InputForm from "@/components/common/InputForm";
import { FieldGroup } from "@/components/ui/field";
import DeliveryMethodsForm from "./DeliveryMethodsForm";
import PaymentMethodForm from "./PaymentMethodForm";
import CheckoutCountryForm from "./CheckoutCountryForm";
import CheckoutStatesForm from "./CheckoutStatesForm";
import { Button } from "@/components/ui/button";

// Tipos
import { DeliveryMethods, LocaleType } from "@/types";

type Props = {
  setDeliveryType: (type: DeliveryMethods) => void;
  deliveryType: DeliveryMethods;
};

const CheckoutForm = ({ setDeliveryType, deliveryType }: Props) => {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("Sections.CheckoutPage");

  const form = useFormContext<CheckoutSchema>();

  const fillDummyData = () => {
    form.clearErrors();
    form.setValue("firstName", "João");
    form.setValue("lastName", "Silva");
    form.setValue("phone", "(11) 98765-4321");
    form.setValue("address", "Avenida Paulista, 1000");
    form.setValue("complement", "Apto 121");
    form.setValue("city", "São Paulo");
    form.setValue("country", "brazil");
    form.setValue("state", "SP");
    form.setValue("zipCode", "01310-100");

    form.setValue("payment.method", "creditCard");
    form.setValue("payment.cardNumber", "4444 4444 4444 4444");
    form.setValue("payment.cardName", "JOAO SILVA");
    form.setValue("payment.cardExpiry", "12/28");
    form.setValue("payment.cardCvc", "123");
  };

  const handleChangeCountry = () => {
    form.setValue("phone", "");
    form.setValue("state", "");
  };
  return (
    <form id="checkout-form-context">
      <div className="flex justify-between items-center flex-wrap py-6 gap-1">
        <h1 className="font-medium text-lg">{t("shippingInformation")}</h1>
        <Button onClick={fillDummyData} type="button" variant={"outline"}>
          {t("autofill")}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            name="firstName"
            control={form.control}
            label="firstName"
          />
          <InputForm name="lastName" control={form.control} label="lastName" />
        </FieldGroup>

        <InputForm name="address" control={form.control} label="address" />

        <InputForm
          name="complement"
          control={form.control}
          label="complement"
        />

        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-start">
          <InputForm name="city" control={form.control} label="city" />

          <CheckoutCountryForm
            control={form.control}
            name="country"
            onValueChange={handleChangeCountry}
          />

          <CheckoutStatesForm control={form.control} />

          <InputForm name="zipCode" control={form.control} label="zipCode" />
        </FieldGroup>

        <InputForm name="phone" control={form.control} label="phone" />

        <div className="space-y-4 border-t pt-6 mt-6">
          <h2 className="font-medium text-lg">{t("deliveryMethod")}</h2>

          <DeliveryMethodsForm
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            locale={locale}
          />
        </div>

        <div className="space-y-4 border-t pt-6 mt-6">
          <h2 className="font-medium text-lg">{t("payment")}</h2>

          <PaymentMethodForm control={form.control} />
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
