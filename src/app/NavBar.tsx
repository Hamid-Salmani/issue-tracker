"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";
import AvatarDropDown from "./AvatarDropDown";
const NavBar = () => {
  const CurrentPathName = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Issues", href: "/issues" },
  ];
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/30 shadow-md px-6 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center space-x-2 text-sky-600 hover:text-sky-700 transition-colors"
      >
        <AiFillBug className="w-6 h-6" />
        <span className="font-bold text-lg tracking-tight">BugTracker</span>
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames(
                "font-medium transition-colors px-2 py-1 rounded-md",
                {
                  "text-sky-700 bg-white/80 shadow-sm":
                    CurrentPathName.startsWith(link.href),
                  "text-gray-600 hover:text-sky-600":
                    !CurrentPathName.startsWith(link.href),
                }
              )}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && <AvatarDropDown user={session.user} />}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log in</Link>
        )}
      </Box>
    </nav>
  );
};
export default NavBar;
