import { CollectionsArray } from "@/constants";
import { useTranslations } from "next-intl";
import CollectionCard from "./CollectionCard";

export const Collections = () => {
  const t = useTranslations("Sections.Collections");
  return (
    <section className="section-container py-10 lg:py-15 2xl:py-25">
      <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold my-10">
        {t("headline")}
      </h2>

      <ul className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {CollectionsArray.map((collection) => (
          <CollectionCard key={collection.title} collection={collection} />
        ))}
      </ul>
    </section>
  );
};
