import Image from "next/image";
import { cn } from "@/lib/utils";
import { FullProduct } from "@/types";

// Tipagem para facilitar o acesso às imagens do Sanity
type ColorImage = NonNullable<FullProduct["colors"]>[number]["images"];
type SingleImage = NonNullable<ColorImage>[number];

type Props = {
  activeImage: SingleImage | undefined;
  colorImages: SingleImage[];
  onImageChange: (image: SingleImage) => void;
  productName: string;
};

const ProductImage = ({
  activeImage,
  colorImages,
  onImageChange,
  productName,
}: Props) => {
  if (!activeImage)
    return (
      <div className="aspect-square w-full bg-gray-100 rounded-lg animate-pulse" />
    );

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem Principal */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
        <Image
          src={activeImage.asset?.url ?? ""}
          alt={productName}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) calc(100vw - 1rem), (max-width: 768px) 606px, (max-width: 1024px) 686px, (max-width: 1280px) 450px, (max-width: 1536px) 538px, 666px"
          className="object-cover transition-all duration-500"
          placeholder="blur"
          blurDataURL={activeImage.asset?.metadata?.lqip ?? ""}
        />
      </div>

      {/* Galeria de Miniaturas (Thumbnails) */}
      {colorImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {colorImages.map((img) => {
            const isSelected = activeImage._key === img._key;

            return (
              <button
                key={img._key}
                onClick={() => onImageChange(img)}
                className={cn(
                  "relative size-20 shrink-0 rounded-md overflow-hidden border-2 transition-all",
                  isSelected
                    ? "border-black"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={img.asset?.url ?? ""}
                  alt="Thumbnail"
                  fill
                  sizes="76px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductImage;
