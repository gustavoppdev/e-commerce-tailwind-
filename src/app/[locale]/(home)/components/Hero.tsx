// Next.js & Next-Intl
import { useTranslations } from "next-intl";
import Image from "next/image";

// Componentes & Assets
import { Button } from "@/components/ui/button";
import { heroImage } from "@/assets";

const Hero = () => {
  const t = useTranslations("Sections.Hero");
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-neutral-100">
      {/* CTA - Textos */}
      <div className="flex flex-col gap-4 lg:gap-5 2xl:gap-6 items-start my-20 justify-center px-4 md:px-10">
        <h1 className="font-bold text-4xl md:text-5xl 2xl:text-6xl">
          {t("headline")}
        </h1>
        <p className="text-muted-foreground text-xl">{t("paragraph")}</p>
        <Button size={"lg"}>{t("ctaBtn")}</Button>
      </div>

      {/* CTA - Imagem */}
      <div className="relative w-full min-h-[25dvh] lg:min-h-0 lg:aspect-85/96">
        <Image
          src={heroImage}
          alt={t("altImage")}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 
           (max-width: 768px) 640px, 
           (max-width: 1024px) 768px, 
           (max-width: 1280px) 452px, 
           (max-width: 1536px) 540px, 
           668px"
        />
      </div>
    </section>
  );
};

export default Hero;
