import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { NoteEditor } from "@/components/notes/NoteEditor";

export default async function EditNotePage({
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

return (
  <NoteEditor
    note={{
      id: note.id,
      title: note.title,
      content: note.content,

      summary: note.summary,
      knowledgeTree: note.knowledgeTree,
      tags: note.tags,
      interviewQuestions: note.interviewQuestions,

      flashcards:
        (note.flashcards as {
          question: string;
          answer: string;
        }[]) ?? [],
    }}
  />
);
}