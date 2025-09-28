import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { User } from "next-auth";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
interface Props {
  user: User | undefined;
}
const AvatarDropDown = ({ user }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={user!.image!}
          fallback="?"
          radius="full"
          className="cursor-pointer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>{user!.email}</DropdownMenu.Label>
        <DropdownMenu.Item onClick={() => signOut()}>Log out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
export default AvatarDropDown;
