// Next.js & Next-Intl
import { useTranslations } from "next-intl";
import Image from "next/image";

// Assets & Icons
import { loyaltyImage } from "@/assets";
import { ArrowRight } from "lucide-react";

const Loyalty = () => {
  const t = useTranslations("Layout.Footer.loyalty");
  return (
    <div className="py-12 px-6 lg:py-15 relative grid place-content-center text-center rounded-lg overflow-hidden text-white hover:opacity-90 transition-opacity duration-300 cursor-pointer">
      <Image
        src={loyaltyImage}
        alt=""
        fill
        sizes="(max-width: 640px) calc(100vw - 1rem), (max-width: 768px) 608px, (max-width: 1024px) 688px, (max-width: 1280px) 452px, (max-width: 1536px) 540px, 668px"
        placeholder="blur"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-indigo-600/85 z-10"></div>
      <div className="max-w-md lg:max-w-sm xl:max-w-md flex flex-col gap-4 relative z-20">
        <h2 className="font-semibold text-2xl md:text-3xl">{t("title")}</h2>
        <p className="text-gray-200">
          {t.rich("description", {
            emphasis: (chunks) => (
              <span className="inline-flex items-center gap-2 font-semibold">
                {chunks} <ArrowRight className="size-4" />
              </span>
            ),
          })}
        </p>
      </div>
    </div>
  );
};

export default Loyalty;
