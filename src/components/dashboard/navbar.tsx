// src/components/dashboard/navbar/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Plus, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-[#FDFCF9]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2">
          <Image
            src="/codevault-logo.svg"
            alt="CodeVault"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-serif text-lg font-semibold text-[#0B1220]">
            Code<span className="text-[#F59E0B]">Vault</span>
          </span>
        </Link>

        {/* Search trigger */}
        <button
          type="button"
          className="hidden flex-1 items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-[#0B1220]/40 transition hover:border-black/20 md:flex"
        >
          <Search className="h-4 w-4" />
          <span>Search your vault...</span>
          <kbd className="ml-auto rounded-md border border-black/10 bg-[#FDFCF9] px-1.5 py-0.5 font-mono text-[10px] text-[#0B1220]/40">
            ⌘K
          </kbd>
        </button>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#0B1220]/60 md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            onClick={() => router.push("/notes/new")}
            className="hidden bg-[#0B1220] text-white hover:bg-[#0B1220]/90 sm:flex"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            New Note
          </Button>
          <Button
            onClick={() => router.push("/dashboard/new")}
            size="icon"
            className="bg-[#0B1220] text-white hover:bg-[#0B1220]/90 sm:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full ring-offset-2 transition hover:ring-2 hover:ring-[#F59E0B]/40">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-[#0B1220] text-xs text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="text-sm font-medium text-[#0B1220]">
                  {user.name}
                </p>
                <p className="text-xs font-normal text-[#0B1220]/50">
                  {user.email}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}