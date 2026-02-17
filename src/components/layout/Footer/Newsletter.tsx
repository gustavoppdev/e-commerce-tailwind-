"use client";

// Next-Intl
import { useTranslations } from "next-intl";

// Zod
import { z } from "zod";

// React-Hook-Form
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Tanstack
import { useMutation } from "@tanstack/react-query";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { toast } from "sonner";

// Icons
import { Loader2Icon } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email({
    message: "invalidEmail",
  }),
});

type NewsletterSchema = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const t = useTranslations("Layout.Footer.newsletter");
  const tErrors = useTranslations("Others.errors.newsletter");

  const form = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
    mode: "onSubmit",
    defaultValues: { email: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewsletterSchema) => {
      // Simulando um atraso de rede de 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulação de resposta de sucesso
      return { success: true };

      /* Requisição
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to send");
      return response.json();
    */
    },
    onSuccess: () => {
      toast.success(t("successSubscribe"));
      form.reset();
    },
    onError: () => {
      toast.error(t("errorSubscribe"));
    },
  });

  const onSubmit = (data: NewsletterSchema) => {
    mutate(data);
  };

  return (
    <div className="py-12 px-6 lg:py-15 flex flex-col gap-4 max-w-md lg:max-w-sm xl:max-w-md">
      <div className="space-y-2">
        <h2 className="font-semibold">{t("title")}</h2>
        <p className="text-muted-foreground ">{t("description")}</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              {/* Container do Input + Botão */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 sm:flex-3">
                  <Input
                    {...field}
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    aria-invalid={fieldState.invalid}
                    className="rounded-sm h-11 autofill:shadow-[0_0_0_30px_white_inset] bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="sm:flex-1 w-full h-11"
                >
                  {isPending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    t("subscribeBtn")
                  )}
                </Button>
              </div>

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
      </form>
    </div>
  );
};

export default Newsletter;
