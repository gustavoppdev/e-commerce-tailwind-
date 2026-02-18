// Next.js & Next-Intl
import { useTranslations } from "next-intl";
import Link from "next/link";

// Componentes
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";

// Auth & Icones
import { handleSignOut } from "@/actions/auth";
import { Session } from "next-auth";
import { User } from "lucide-react";

type Props = {
  session: Session | null;
  setOpen: (open: boolean) => void;
};

const UserArea = ({ session, setOpen }: Props) => {
  const t = useTranslations("Layout");

  return (
    <div className="mt-auto px-4 pb-8 space-y-4">
      {session?.user ? (
        <div className="space-y-4">
          <Separator className="my-6" />
          <div className="flex items-center gap-3 text-gray-700">
            <div className="bg-gray-100 p-2 rounded-full">
              <User className="size-5" />
            </div>
            <span className="font-medium truncate">{session.user.name}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="default"
              size={"lg"}
              className="w-full justify-start"
              onClick={() => setOpen(false)}
              asChild
            >
              <Link href="/order-history">{t("Auth.orders")}</Link>
            </Button>
            <form action={handleSignOut}>
              <Button
                variant="outline"
                className="w-full justify-start"
                size={"lg"}
                type="submit"
                onClick={() => setOpen(false)}
              >
                {t("Auth.logout")}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Button className="w-full" size={"lg"} asChild>
            <Link href="/auth/login" onClick={() => setOpen(false)}>
              {t("Auth.signIn")}
            </Link>
          </Button>
          <Button variant="outline" className="w-full" size={"lg"} asChild>
            <Link href="/auth/login" onClick={() => setOpen(false)}>
              {t("Auth.createAccount")}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserArea;
