// Auth.js
import { handleSignOut } from "@/actions/auth";

// Next-Intl
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type Props = {
  username: string;
};

export function DropdownUser({ username }: Props) {
  const t = useTranslations("Layout.Auth");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-gray-700">
          {username}
          <ChevronDown className="size-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/order-history">{t("orders")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form action={handleSignOut}>
              <button type="submit">{t("logout")}</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
