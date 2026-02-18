<div align="center">

# E-Commerce Tailwind

### Modern E-Commerce Platform

_Uma plataforma de e-commerce completa construída com as melhores práticas de desenvolvimento front-end_

#### [🔗 Acessar Demo](https://e-commerce-tailwind.vercel.app/)

---

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-f36458?style=flat-square&logo=sanity)](https://www.sanity.io/)

</div>

---

## ✨ Sobre o Projeto

**E-Commerce Tailwind** é uma plataforma de e-commerce moderna com foco em:

- **Arquitetura**: Next.js 16 com App Router e React Server Components
- **CMS**: Sanity integrado com Studio embutido na aplicação (`/studio`)
- **Autenticação**: NextAuth v5 com provider Google OAuth
- **Internacionalização**: `next-intl` com rotas dinâmicas (`/en`, `/pt`)
- **SEO**: Metadata e OpenGraph dinâmicos por página e produto
- **Type Safety**: TypeScript + validação Zod + tipagem gerada pelo Sanity
- **UI/UX**: Design system com Tailwind CSS 4, shadcn/ui e Radix UI

## 🛠️ Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Sanity CMS · NextAuth v5 · TanStack Query · shadcn/ui · React Hook Form · Zod · next-intl · Resend

## ✨ Destaques

- Internacionalização completa (i18n) com rotas dinâmicas e traduzidas
- CMS headless com Sanity e Studio embutido
- Autenticação com Google OAuth via NextAuth v5
- SEO otimizado com metadata e OpenGraph dinâmicos por produto
- Carrinho de compras e fluxo de checkout completo
- Histórico de pedidos por usuário
- Validação robusta de formulários com Zod
- Design system acessível com shadcn/ui e Radix UI
- Type safety completo com tipos gerados automaticamente pelo Sanity

## 🏗️ Arquitetura

```
src/
├── app/
│   ├── [locale]/              # Rotas internacionalizadas
│   │   ├── layout.tsx         # Layout root + metadata
│   │   ├── globals.css        # Design tokens CSS
│   │   ├── (home)/            # Página inicial
│   │   ├── products/          # Listagem e detalhe de produtos
│   │   ├── cart/              # Carrinho de compras
│   │   ├── checkout/          # Fluxo de checkout
│   │   ├── order-history/     # Histórico de pedidos
│   │   └── auth/              # Páginas de autenticação
│   ├── api/                   # API Routes (NextAuth, etc.)
│   └── studio/                # Sanity Studio embutido
├── components/                # Componentes reutilizáveis globais
│   ├── layout/                # Header, Footer, Navbar
│   └── ui/                    # shadcn/ui components
├── sanity/                    # Schemas e configuração do Sanity
├── lib/                       # Utilitários e helpers
├── hooks/                     # Custom React Hooks
├── contexts/                  # React Contexts
├── providers/                 # Providers globais
├── actions/                   # Server Actions
├── i18n/                      # Configuração next-intl
├── constants/                 # Dados estáticos
└── types/                     # TypeScript definitions
```

## 📄 Licença

Este projeto é open source e está disponível sob a [MIT License](LICENSE).

---

## 👨‍💻 Autor

**Gustavo Henrique**

Desenvolvedor Front-end especializado em React, Next.js e arquiteturas modernas. Este projeto demonstra habilidades em:

- Arquitetura de aplicações escaláveis com Next.js App Router
- Integração com CMS headless (Sanity)
- Autenticação moderna com NextAuth v5
- React Server Components e Server Actions
- Design systems e componentização com shadcn/ui
- Type safety e qualidade de código
- SEO e acessibilidade
- Internacionalização (i18n)

---

<div align="center">

**[⬆ Voltar ao topo](#e-commerce-tailwind)**

Feito com ❤️ e TypeScript

</div>
