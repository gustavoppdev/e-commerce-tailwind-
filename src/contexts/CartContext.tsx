import React, { createContext, useState, useEffect, useMemo } from "react";

// 1. Definição dos Tipos
export type CartItem = {
  id: string; // ID do produto no Sanity
  variantKey: string; // O _key da cor selecionada no Sanity
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variantKey: string) => void;
  updateQuantity: (id: string, variantKey: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number; // Apenas a contagem física de itens
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Inicializamos com um array vazio para evitar erros de hidratação no Next.js
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Verificamos se estamos no navegador (Client-side)
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("tailwind-store-cart");
      try {
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
        return [];
      }
    }
    return [];
  });
  2;
  // 2. Sincronização: Apenas SALVAMOS no localStorage quando o cart mudar
  useEffect(() => {
    localStorage.setItem("tailwind-store-cart", JSON.stringify(cart));
  }, [cart]);

  // 4. Funções de Manipulação
  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Verifica se o item com o mesmo ID E a mesma variante já existe
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.id === newItem.id && item.variantKey === newItem.variantKey,
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      }

      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string, variantKey: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.variantKey === variantKey),
      ),
    );
  };

  const updateQuantity = (id: string, variantKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, variantKey);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.variantKey === variantKey
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  // 5. Helpers derivados (Uso de useMemo para performance)
  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
