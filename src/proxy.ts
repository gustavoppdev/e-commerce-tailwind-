import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/auth"; // Importe o auth que criamos no src/auth.ts

// 1. Criamos o middleware de idiomas
const intlMiddleware = createMiddleware(routing);

// 2. Exportamos o auth envolvendo a lógica
export default auth((req) => {
  // O 'req' aqui já contém 'req.auth' se o usuário estiver logado

  // Se você quiser proteger uma rota privada, ex: /cart ou /profile
  // const isPrivatePage = req.nextUrl.pathname.includes('/profile');
  // if (isPrivatePage && !req.auth) {
  //   return Response.redirect(new URL('/login', req.url));
  // }

  return intlMiddleware(req);
});

export const config = {
  // Mantemos o seu matcher original, ele é ótimo
  matcher: [
    // Pula todas as pastas internas e arquivos estáticos
    // E agora pula explicitamente a rota /studio
    "/((?!api|_next|_vercel|studio|.*\\..*).*)",
  ],
};
