// Auth.js
import { auth, signOut } from "@/auth";

// Next.js & Next-Intl
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

// Components
import { Button } from "@/components/ui/button";
import { DropdownUser } from "./DropdownUser";

const AuthSection = async () => {
  const t = await getTranslations("Layout");
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <DropdownUser username={session.user.name ?? ""} />
      ) : (
        <>
          <div className="hidden lg:flex items-center gap-1">
            <Button variant={"link"} className="text-gray-600">
              <Link href={"/auth/login"}>{t("Auth.signIn")}</Link>
            </Button>
            <span className="h-4 w-px block bg-gray-200 rounded"></span>
            <Button variant={"link"} className="text-gray-600">
              <Link href={"/auth/login"}>{t("Auth.createAccount")}</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthSection;
