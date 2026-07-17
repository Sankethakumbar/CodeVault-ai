// src/app/dashboard/page.tsx

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/dashboard/navbar";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { getCurrentUser } from "@/lib/auth";
import { RecentNotes } from "@/components/dashboard/RecentNotes";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { q } = await searchParams;

  const notes = await prisma.note.findMany({
    where: {
      userId: user.id,
      ...(q
        ? {
            OR: [
              {
                title: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <Navbar
        user={{
          name: user.username,
          email: user.email,
        }}
      />

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        <WelcomeCard user={{ name: user.username }} />

        <RecentNotes notes={notes} />


      </main>
    </div>
  );
}