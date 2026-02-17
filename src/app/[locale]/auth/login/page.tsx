// Auth.js
import { signIn } from "@/auth";

// Next.js & Next-Intl
import Image from "next/image";
import { useTranslations } from "next-intl";

// Componentes
import { Button } from "@/components/ui/button";

// Assets & Constantes
import { googleIcon, loginImage } from "@/assets";
import { LoginBenefits } from "@/constants";

export default function LoginPage() {
  const t = useTranslations("Layout.Auth.loginPage");

  return (
    <main className="section-container min-h-[calc(100dvh-113px)] lg:min-h-[calc(100dvh-145px)] w-full grid lg:grid-cols-2">
      {/* Lado Esquerdo - Imagem */}
      <div className="relative hidden lg:block h-full w-full">
        <Image
          src={loginImage}
          alt=""
          fill
          sizes="(max-width: 1280px) 472px, (max-width: 1536px) 560px, 688px"
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Lado Direito - Conteúdo Principal */}
      <div className="flex flex-col justify-center items-center lg:items-start px-6 sm:px-12 py-16 max-w-xl mx-auto w-full">
        <div className="w-full">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4 text-center lg:text-left">
            {t("headline")}
          </h1>
          <p className="text-neutral-600 text-base leading-relaxed mb-8 text-center lg:text-left">
            {t("description")}
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("google", {
                redirectTo: "/",
              });
            }}
            className="w-full"
          >
            <Button
              variant="outline"
              type="submit"
              size={"lg"}
              className="w-full py-7 text-base"
            >
              <Image src={googleIcon} alt="Google" className="size-5" />
              {t("loginWithGoogle")}
            </Button>
          </form>

          {/* Seção de Benefícios */}
          <div className="grid gap-6 border-t border-neutral-100 dark:border-neutral-800 pt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {t("benefits.title")}
            </h2>

            {LoginBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
                    <Icon className="size-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      {t(benefit.title)}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {t(benefit.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <ul className="mt-16 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-neutral-400">
            {["privacyPolicy", "termsService", "help"].map((item) => (
              <li
                key={item}
                className="hover:text-indigo-600 transition-colors cursor-pointer"
              >
                {t(item)}
              </li>
            ))}
            <li className="ml-auto hidden md:block cursor-pointer">
              {t("copyright", { year: new Date().getFullYear() })}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
