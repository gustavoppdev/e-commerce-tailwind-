// Next.js
import Image from "next/image";

// Componentes & Assets
import Sale from "./Sale";
import Testimonials from "./Testimonials";
import { saleImage } from "@/assets";

export const ConversionSection = () => {
  return (
    <section className="section-container relative py-10 lg:py-15 2xl:py-25">
      {/* Imagem de fundo */}
      <Image
        src={saleImage}
        alt=""
        fill
        sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
        placeholder="blur"
        blurDataURL={saleImage.blurDataURL}
        className="object-cover"
      />
      {/* Gradiente */}
      <div className="bg-linear-to-b from-white/90 via-white/96 to-white absolute inset-0 z-10"></div>

      {/* Seção de Desconto/Sale */}
      <Sale />

      {/* Seção de Depoimentos/Testimonials */}
      <Testimonials />
    </section>
  );
};
