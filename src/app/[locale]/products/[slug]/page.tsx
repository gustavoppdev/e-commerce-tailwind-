// Next
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Sanity
import { getProductBySlug } from "@/sanity/lib/queries";

// Types
import { LocaleType } from "@/types";

// Components
import ProductDetails from "./components/ProductDetails/ProductDetails";
import RecentReviews from "./components/RecentReviews";
import RelatedProducts from "./components/RelatedProducts";
import { constructMetadata } from "@/lib/seo";
import { redirect } from "@/i18n/navigation";

type Props = {
  params: {
    slug: string;
    locale: LocaleType;
  };
};

// Função para gerar os Metadados
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  const description = product.description?.[locale]?.[0] ?? "";

  const imageUrl = product.colors?.[0]?.images?.[0]?.asset?.url ?? "";

  return constructMetadata({
    title: product.name?.[locale] ?? "Product",
    description,
    image: imageUrl,
    locale,
    canonicalPath: `/products/${slug}`,
    alternatePaths: {
      pt: `/products/${product.slug?.pt?.current}`,
      en: `/products/${product.slug?.en?.current}`,
    },
  });
}

const ProductPage = async ({ params }: Props) => {
  const { slug, locale } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // 1. Verificamos qual é o slug correto para o locale atual
  const correctSlug = product.slug?.[locale]?.current ?? "";

  if (slug !== correctSlug) {
    redirect({
      href: {
        pathname: "/products/[slug]",
        params: { slug: correctSlug },
      },
      locale: locale,
    });
  }

  return (
    <main className="section-container mt-8">
      <ProductDetails product={product} locale={locale} />

      <RecentReviews />

      <RelatedProducts currentProductId={product._id} />
    </main>
  );
};

export default ProductPage;
