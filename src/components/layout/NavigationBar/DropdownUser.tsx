// Auth.js
import { signOut } from "@/auth";

// Next-Intl
import { useTranslations } from "next-intl";

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>{t("orders")}</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">{t("logout")}</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
