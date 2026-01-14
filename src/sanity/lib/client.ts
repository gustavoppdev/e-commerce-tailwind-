import { createClient } from "next-sanity";

export const client = createClient({
  // O seu ID que vimos no comando lá no início
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

  // O nome do seu banco de dados
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  // A data de hoje ou a data em que você iniciou o projeto (formato YYYY-MM-DD)
  // Isso serve para garantir que o Sanity use uma versão estável da API
  apiVersion: "2026-01-12",

  // useCdn: false garante que os dados venham sempre atualizados.
  // Se for true, ele é mais rápido, mas pode demorar uns minutos para mostrar novos produtos.
  // Para e-commerce, geralmente usamos false.
  useCdn: false,
});
