// Next.js & Next-Intl
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

// Constantes & Tipos
import { CATEGORY_SLUGS } from "@/constants";
import { Collection } from "@/types";

type Props = {
  collection: Collection;
};

const CollectionCard = ({ collection }: Props) => {
  const t = useTranslations("Sections.Collections");

  const slug =
    CATEGORY_SLUGS[collection.key as keyof typeof CATEGORY_SLUGS]["en"];

  return (
    <li className="flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300 relative">
      <div className="relative aspect-video lg:aspect-square w-full rounded-md overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <Image
          src={collection.image}
          alt={collection.title}
          placeholder="blur"
          fill
          sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) 608px, (max-width: 1024px) 688px, (max-width: 1280px) 288px, (max-width: 1536px) 346px, 432px"
          className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-85"
        />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm text-muted-foreground">
          <Link
            href={{
              pathname: "/products",
              query: { categories: slug },
            }}
            className="after:absolute after:inset-0"
          >
            {t(collection.title)}
          </Link>
        </h3>
        <p className="font-semibold">{t(collection.description)}</p>
      </div>
    </li>
  );
};

export default CollectionCard;
