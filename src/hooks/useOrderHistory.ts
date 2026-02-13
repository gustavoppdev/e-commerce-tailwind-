import { useState, useEffect } from "react";
import { Order } from "@/types";

const STORAGE_KEY = "tailwind-store-order-history";

interface UseOrderHistoryReturn {
  orders: Order[];
  lastOrder: Order | null;
  saveOrder: (order: Order) => void;
  clearHistory: () => void;
  isLoading: boolean;
}

export const useOrderHistory = (): UseOrderHistoryReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega os pedidos salvos ao iniciar
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem(STORAGE_KEY);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error("Erro ao carregar histórico de pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salva um novo pedido
  const saveOrder = (newOrder: Order) => {
    try {
      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
      console.log("Pedido salvo com sucesso:", newOrder.id);
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
    }
  };

  // Limpa o histórico
  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setOrders([]);
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
    }
  };

  return {
    orders,
    lastOrder: orders[0] || null,
    saveOrder,
    clearHistory,
    isLoading,
  };
};
