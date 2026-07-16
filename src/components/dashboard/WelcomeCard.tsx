// src/components/dashboard/welcome/WelcomeCard.tsx

import { Card } from "@/components/ui/card";

interface WelcomeCardProps {
  user: {
    name: string;
  };
}

export function WelcomeCard({ user }: WelcomeCardProps) {
  const firstName =
  user.name.split(" ")[0];

const formattedName =
  firstName.charAt(0).toUpperCase() +
  firstName.slice(1).toLowerCase();

  return (
    <Card className="rounded-2xl border border-black/5 bg-white px-8 py-7 shadow-none">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#F59E0B]">
        DASHBOARD.WELCOME()
      </p>

      <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#0B1220] sm:text-4xl">
        Welcome back, {formattedName} 👋
      </h1>

      <p className="mt-4 max-w-lg text-base leading-relaxed text-[#0B1220]/60">
        Capture your technical learning, organize it with AI, and revisit it
        whenever you need. Every note you save becomes part of your personal
        knowledge vault.
      </p>
    </Card>
  );
}