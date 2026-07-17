"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNote(
  title: string,
  content: string,
  summary: string | null,
  knowledgeTree: string | null,
  tags: string[],
  interviewQuestions: string[],
  flashcards: { question: string; answer: string }[]
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await prisma.note.create({
    data: {
      title,
      content,
      summary,
      knowledgeTree,
      tags,
      interviewQuestions,
      flashcards,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");

  return { success: true };
}


// deleteNote — AFTER (fixed)
export async function deleteNote(id: string) {
  const user = await getCurrentUser();       // ← ADD
  if (!user) throw new Error("Unauthorized"); // ← ADD
  await prisma.note.delete({
    where: {
      id,
      userId: user.id,        //  only deletes if user owns it
    },
  });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}



export async function updateNote(
  id: string,
  title: string,
  content: string,
  summary: string | null,
  knowledgeTree: string | null,
  tags: string[],
  interviewQuestions: string[],
  flashcards: { question: string; answer: string }[]
) {
    const user = await getCurrentUser();        // ← ADD
  if (!user) throw new Error("Unauthorized"); // ← ADD
  await prisma.note.update({
    
    where: {
      id,
      userId: user.id,         // ← ADD — only updates if user owns it
    },
    data: {
      title,
      content,
      summary,
      knowledgeTree,
      tags,
      interviewQuestions,
      flashcards,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/notes/${id}`);

  return { success: true };
}