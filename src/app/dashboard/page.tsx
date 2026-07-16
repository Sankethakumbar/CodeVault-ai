// src/app/dashboard/page.tsx

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/dashboard/navbar";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { getCurrentUser } from "@/lib/auth";

import { RecentNotes } from "@/components/dashboard/RecentNotes";



export default async function DashboardPage() {
  const user = await getCurrentUser();


  if (!user) {
    redirect("/login");
  }
    const notes = await prisma.note.findMany({
  where: {
    userId: user.id,
  },
  orderBy: {
    updatedAt: "desc",
  },
});

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <Navbar
        user={{
          name: user.username, // Change to user.name if your Prisma field is 'name'
          email: user.email,
        }}
      />

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        <WelcomeCard user={{ name: user.username }} />

        {/* <RecentNotes notes={notes} /> */}
        <RecentNotes notes={notes} />




        {/* Categories */}

        {/* Quick Actions */}
      </main>
    </div>
  );
}