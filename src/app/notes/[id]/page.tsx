import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { NoteDetail } from "@/components/notes/NoteDetail";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });

  if (!note) {
    notFound();
  }

  return <NoteDetail note={note} />;
}