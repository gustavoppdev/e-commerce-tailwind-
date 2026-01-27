import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/auth";

// 1. Criamos o middleware de idiomas (next-intl)
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  // A propriedade req.auth é preenchida pelo wrapper 'auth' se houver sessão ativa
  const isLogged = !!req.auth;
  const { pathname } = req.nextUrl;

  // 2. Definimos a lógica para a página de login
  // Usamos .includes ou um regex para detectar '/auth/login' independente do locale
  const isLoginPage = pathname.includes("/auth/login");

  if (isLoginPage && isLogged) {
    // Extraímos o locale da URL atual ou usamos o padrão (defaultLocale)
    // Isso garante que o redirecionamento para '/' mantenha o idioma do usuário
    const locale = pathname.split("/")[1] || routing.defaultLocale;

    // Redireciona o usuário logado para a Home (ex: /pt ou /en)
    return Response.redirect(new URL(`/${locale}`, req.nextUrl));
  }

  // 3. Caso não seja um redirecionamento de auth, prosseguimos com o next-intl
  // Isso cuidará da detecção de idioma e redirecionamento de rotas normais
  return intlMiddleware(req);
});

export const config = {
  // O Matcher garante que o middleware não rode em arquivos estáticos,
  // API routes, Vercel internals ou no Sanity Studio
  matcher: ["/((?!api|_next|_vercel|studio|.*\\..*).*)"],
};
