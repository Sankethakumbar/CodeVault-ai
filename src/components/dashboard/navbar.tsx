// src/components/dashboard/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Plus, LogOut } from "lucide-react";

import { logout } from "@/actions/auth/logout";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  searchQuery?: string;
}

export function Navbar({ user, searchQuery = "" }: NavbarProps) {
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

        {/* Search */}
        <form
          action="/dashboard"
          method="GET"
          className="hidden flex-1 md:flex"
        >
          <div className="group flex w-full max-w-xl items-center rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm transition-colors focus-within:border-[#F59E0B]/40 focus-within:ring-2 focus-within:ring-[#F59E0B]/20">
            <Search className="mr-2.5 h-4 w-4 shrink-0 text-[#0B1220]/35 transition-colors group-focus-within:text-[#F59E0B]" />

            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search your vault..."
              className="w-full bg-transparent text-sm text-[#0B1220] outline-none placeholder:text-[#0B1220]/40"
            />

            <button
              type="submit"
              className="ml-3 shrink-0 rounded-full bg-[#0B1220] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#1E293B]"
            >
              Search
            </button>
          </div>
        </form>

        {/* Right */}
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
            className="hidden bg-[#0B1220] text-white hover:bg-[#1E293B] sm:flex"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            New Note
          </Button>

          <Button
            onClick={() => router.push("/notes/new")}
            size="icon"
            className="bg-[#0B1220] text-white hover:bg-[#1E293B] sm:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* Avatar — display only, not interactive */}
          <Avatar className="h-9 w-9 cursor-default select-none opacity-70 grayscale-[15%]">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-[#0B1220] text-xs text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Standalone logout button */}
          <form action={logout}>
            <button
              type="submit"
              title="Log out"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#0B1220]/60 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}