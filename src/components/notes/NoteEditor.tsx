"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { createNote, updateNote } from "@/actions/notes/note";
import { generateAI } from "@/actions/ai";

interface NoteEditorProps {
  note?: {
    id: string;
    title: string;
    content: string;

    summary?: string | null;
    knowledgeTree?: string | null;
    tags?: string[];
    interviewQuestions?: string[];
    flashcards?: {
      question: string;
      answer: string;
    }[];
  };
}

export function NoteEditor({ note }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

const [summary, setSummary] = useState(note?.summary ?? "");
const [knowledgeTree, setKnowledgeTree] = useState(
  note?.knowledgeTree ?? ""
);

const [tags, setTags] = useState<string[]>(
  note?.tags ?? []
);

const [questions, setQuestions] = useState<string[]>(
  note?.interviewQuestions ?? []
);

const [flashcards, setFlashcards] = useState<
  { question: string; answer: string }[]
>(note?.flashcards ?? []);
  async function handleGenerateAI() {
    try {
      setIsGenerating(true);

      const ai = await generateAI(content);

      setSummary(ai.summary);
      setKnowledgeTree(ai.knowledgeTree);
      setTags(ai.tags);
      setQuestions(ai.interviewQuestions);
      setFlashcards(ai.flashcards);
    } catch (error) {
      console.error(error);
      alert("Failed to generate AI.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsSaving(true);

      if (note) {
await updateNote(
  note.id,
  title,
  content,
  summary,
  knowledgeTree,
  tags,
  questions,
  flashcards
);
        window.location.href = `/notes/${note.id}`;
      } else {
        await createNote(
  title,
  content,
  summary,
  knowledgeTree,
  tags,
  questions,
  flashcards
);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save note.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <p className="text-xs font-mono tracking-wide text-orange-500">
          {note ? "NOTE.EDIT()" : "NOTE.CREATE()"}
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-8">
          {note ? "Edit Note" : "Create New Note"}
        </h1>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. React Hooks Deep Dive"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Learning / Notes
            </label>

            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Write or paste what you learned..."
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />

            <p className="mt-2 text-xs text-gray-400">
              Paste what you learned from ChatGPT, YouTube, documentation,
              blogs or any technical resource.
            </p>
          </div>

          {summary && (
            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">

              <div>
                <h2 className="text-lg font-semibold mb-2">
                  📝 Summary
                </h2>
                <p className="text-gray-700">{summary}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">
                  🌳 Knowledge Tree
                </h2>

                <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">
                  {knowledgeTree}
                </pre>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">
                  🏷 Tags
                </h2>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">
                  💼 Interview Questions
                </h2>

                <ul className="list-disc pl-5 space-y-2">
                  {questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">
                  🃏 Flashcards
                </h2>

                <div className="space-y-3">
                  {flashcards.map((card, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <p>
                        <strong>Q:</strong> {card.question}
                      </p>

                      <p className="mt-2">
                        <strong>A:</strong> {card.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving || !title || !content}
              className="rounded-lg bg-[#0F172A] px-8 py-3 text-sm font-semibold text-white hover:bg-[#1E293B] transition-colors disabled:opacity-50"
            >
              {isSaving
                ? note
                  ? "Updating..."
                  : "Saving..."
                : note
                ? "Update Note"
                : "Save Note"}
            </button>

            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating || !content}
              className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-50 px-5 py-2.5 text-sm font-medium text-orange-600 hover:bg-orange-100 transition-colors disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate AI"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}