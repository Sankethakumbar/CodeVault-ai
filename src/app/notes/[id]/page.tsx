import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NoteDetail } from "@/components/notes/NoteDetail";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { id } = await params;

  const note = await prisma.note.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!note) {
    redirect("/dashboard");
  }

  return <NoteDetail note={note} />;
}