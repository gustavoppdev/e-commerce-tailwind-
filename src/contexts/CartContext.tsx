"use client";

import React, { createContext, useState, useEffect, useMemo } from "react";

export type CartItem = {
  id: string;
  variantKey: string;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variantKey: string) => void;
  updateQuantity: (id: string, variantKey: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isLoaded: boolean; // Útil para evitar flashes na UI
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Carrega do LocalStorage apenas uma vez após montar
  useEffect(() => {
    const savedCart = localStorage.getItem("tailwind-store-cart");
    if (savedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Salva no LocalStorage sempre que o cart mudar (após carregado)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tailwind-store-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.id === newItem.id && item.variantKey === newItem.variantKey,
      );

      if (existingItemIndex > -1) {
        // CORREÇÃO: Cria um novo array E um novo objeto para o item atualizado
        return prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
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
    if (quantity <= 0) return removeFromCart(id, variantKey);

    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.variantKey === variantKey
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

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
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
