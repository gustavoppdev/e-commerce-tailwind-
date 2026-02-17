// Next.js & Assets
import Image from "next/image";
import { confirmationPageImage } from "@/assets";

// Components
import SuccessContent from "./components/SuccessContent";

const SuccessPage = () => {
  return (
    <main className="lg:container lg:mx-auto lg:px-10 xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[calc(100dvh-113px)] lg:min-h-[calc(100dvh-145px)] place-content-start lg:place-content-stretch">
      <div className="relative w-full h-[30vh] lg:h-full">
        <Image
          src={confirmationPageImage}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 452px, (max-width: 1536px) 540px, 668px"
          placeholder="blur"
          blurDataURL={confirmationPageImage.blurDataURL}
          className="object-cover object-center"
          priority
          fetchPriority="high"
        />
      </div>

      {/* Dados do Pedido */}
      <SuccessContent />
    </main>
  );
};

export default SuccessPage;
