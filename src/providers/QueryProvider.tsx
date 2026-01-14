"use client"; // Importante: TanStack Query usa Context, então precisa ser Client

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Criamos o QueryClient dentro de um state para garantir que o Next.js
  // não crie um novo cliente a cada re-renderização no lado do servidor.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tempo que os dados ficam "frescos" no cache antes de tentarem ser buscados de novo
            staleTime: 1000 * 60 * 5, // 5 minutos
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Isso aqui vai abrir um painel no canto da tela para monitorarmos as buscas */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
