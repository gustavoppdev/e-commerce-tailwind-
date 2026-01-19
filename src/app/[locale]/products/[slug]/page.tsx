import { getProductBySlug } from "@/sanity/lib/queries";
import { LocaleType } from "@/types";
import { Metadata } from "next";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { notFound, redirect } from "next/navigation";
import RecentReviews from "./components/RecentReviews";

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

  const name = product?.name?.[locale] ?? "Product";
  const description = product?.description?.[locale] ?? "";
  const imageUrl = product?.colors?.[0].images?.[0].asset?.url ?? "";

  return {
    title: `${name} | Tailwind Store`,
    description: description[0],

    // Configurações para Redes Sociais (Facebook, LinkedIn, etc)
    openGraph: {
      title: name,
      description: description[0],
      type: "website", // Ou "article" para produtos
      images: [{ url: imageUrl, width: 1200, height: 630, alt: name }],
    },

    // Configurações para o X/Twitter
    twitter: {
      card: "summary_large_image",
      title: name,
      description: description[0],
      images: [imageUrl],
    },

    // SEO para multi-idioma (Hreflang automático do Next.js)
    alternates: {
      canonical: `/${locale}/products/${slug}`,
      languages: {
        "pt-BR": `/pt/products/${product?.slug?.pt?.current}`,
        "en-US": `/en/products/${product?.slug?.en?.current}`,
      },
    },

    // Controle de Indexação
    robots: {
      index: true,
      follow: true,
    },
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug, locale } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // 1. Verificamos qual é o slug correto para o locale atual
  const correctSlug = product.slug?.[locale]?.current;

  // 2. Se o slug na URL for diferente do slug planejado para este idioma
  // (Isso acontece quando trocamos o idioma no Switcher)
  if (slug !== correctSlug) {
    // Redirecionamos para a URL com o slug traduzido
    redirect(`/${locale}/products/${correctSlug}`);
  }

  return (
    <main className="section-container mt-8 min-h-screen">
      <ProductDetails product={product} locale={locale} />

      <RecentReviews />
    </main>
  );
};

export default ProductPage;
