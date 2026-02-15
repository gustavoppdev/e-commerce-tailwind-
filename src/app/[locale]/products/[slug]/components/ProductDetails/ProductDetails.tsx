// Tipos & Utils
import { GET_PRODUCT_BY_SLUG_QUERY_RESULT } from "@/../sanity.types";
import { formatCurrency } from "@/lib/utils";
import { LocaleType } from "@/types";

// Componentes
import ProductHeader from "./ProductHeader";
import ProductDescription from "./ProductDescription";
import BenefitCard from "./BenefitCard";
import ProductFeatures from "./ProductFeatures";
import ProductInteractiveArea from "./ProductInteractiveArea";

type Props = {
  product: NonNullable<GET_PRODUCT_BY_SLUG_QUERY_RESULT>;
  locale: LocaleType;
};

const ProductDetails = ({ product, locale }: Props) => {
  // Este componente orquestra os dados e injeta o conteúdo estático nos "slots" do componente cliente.

  const price = formatCurrency(
    product.price?.[locale === "pt" ? "brl" : "usd"] ?? 0,
    locale,
  );

  return (
    <ProductInteractiveArea
      product={product}
      locale={locale}
      // Passamos os componentes renderizados
      // O Next.js serializa o ReactNode (HTML) e manda para o cliente.

      headerMobile={
        <ProductHeader
          product={product}
          locale={locale}
          price={price}
          layout="mobile"
        />
      }
      headerDesktop={
        <ProductHeader
          product={product}
          locale={locale}
          price={price}
          layout="desktop"
        />
      }
      descriptionSlot={
        <ProductDescription description={product.description} locale={locale} />
      }
      featuresSlot={
        <ProductFeatures features={product.features} locale={locale} />
      }
      benefitSlot={<BenefitCard />}
    />
  );
};

export default ProductDetails;
