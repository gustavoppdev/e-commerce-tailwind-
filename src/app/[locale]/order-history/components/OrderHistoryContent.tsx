"use client";

import { useOrderHistory } from "@/hooks/useOrderHistory";
import { OrderCard } from "./OrderCard";
import { OrderHistorySkeleton } from "./OrderHistorySkeleton";
import { OrderHistoryEmptyState } from "./OrderHistoryEmptyState";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const OrderHistoryContent = ({ session }: Props) => {
  const { orders, isLoading } = useOrderHistory();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <OrderHistorySkeleton />
        <OrderHistorySkeleton />
      </div>
    );
  }

  if (orders.length === 0 || !session?.user) {
    return <OrderHistoryEmptyState />;
  }

  return (
    <section className="flex flex-col gap-8">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </section>
  );
};

export default OrderHistoryContent;
