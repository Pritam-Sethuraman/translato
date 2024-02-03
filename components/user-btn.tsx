"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type Props = {
  session: Session | null;
};

function UserButton({ session }: Props) {
  if (!session)
    return (
      <Button variant={"outline"} onClick={() => signIn()}>
        Sign In
      </Button>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name="Pritam Sethuraman"
          image="https://github.com/shadcn.png"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
