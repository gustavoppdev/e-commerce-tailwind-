import { useQuery } from "@tanstack/react-query";
import { getCartProducts } from "@/sanity/lib/queries";
import { useLocale } from "next-intl";
import { useCart } from "./useCart";

export const useCartDetails = () => {
  const { cart } = useCart();
  const locale = useLocale() as "pt" | "en";

  // Extraímos apenas os IDs para a query do Sanity
  const productIds = cart.map((item) => item.id);

  // 1. Busca os dados reais do Sanity
  const {
    data: products,
    isLoading,
    ...query
  } = useQuery({
    queryKey: ["cart-details", productIds],
    queryFn: () => getCartProducts(productIds),
    enabled: productIds.length > 0, // Não busca se o carrinho estiver vazio
    staleTime: 1000 * 60 * 5, // Considera os dados "frescos" por 5 minutos
  });

  // 2. Cruzamento de dados (Merge)
  // Criamos um novo array que une a 'quantidade' do context com o 'preço' do Sanity
  const items = cart.map((cartItem) => {
    const product = products?.find((p) => p._id === cartItem.id);

    // Encontra a variante de cor específica para pegar a imagem correta
    const selectedVariant = product?.colors?.find(
      (c) => c._key === cartItem.variantKey,
    );

    return {
      ...cartItem,
      name: product?.name?.[locale],
      price: product?.price?.[locale === "pt" ? "brl" : "usd"],
      slug: product?.slug?.[locale]?.current,
      image: selectedVariant,
      colorName: selectedVariant?.colorName,
      stock: product?.stock,
      // Subtotal do item (preço * quantidade)
      subtotal:
        (product?.price?.[locale === "pt" ? "brl" : "usd"] ?? 0) *
        cartItem.quantity,
    };
  });

  // 3. Cálculos globais
  const cartTotal = items.reduce(
    (acc: number, item: { subtotal: number }) => acc + item.subtotal,
    0,
  );

  return {
    items, // Array completo com dados do Sanity + Contexto
    cartTotal, // Valor total financeiro
    isLoading: isLoading && productIds.length > 0,
    isEmpty: cart.length === 0,
    ...query,
  };
};

export type ItemCartType = ReturnType<typeof useCartDetails>["items"][number];
