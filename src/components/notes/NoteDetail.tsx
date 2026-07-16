import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

import { deleteNote } from "@/actions/notes/note";

export interface NoteDetailData {
  id: string;
  title: string;
  content: string;
  updatedAt: string | Date;

  summary?: string | null;
  knowledgeTree?: string | null;
  tags?: string[];
  interviewQuestions?: string[];
  flashcards?: any;
}

function formatUpdatedAt(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - d.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Updated just now";
  if (diffHours < 24)
    return `Updated ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);

  return `Updated ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

export function NoteDetail({ note }: { note: NoteDetailData }) {
  const hasAiInsights =
    note.summary ||
    note.knowledgeTree ||
    (note.tags && note.tags.length > 0) ||
    (note.interviewQuestions &&
      note.interviewQuestions.length > 0) ||
    (note.flashcards && note.flashcards.length > 0);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">
          {note.title}
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          {formatUpdatedAt(note.updatedAt)}
        </p>

        {/* Original Notes */}

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Notes
          </h2>

          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {note.content}
          </p>
        </div>

        {/* AI Insights */}

        {hasAiInsights && (
          <div className="mt-8 border-t border-gray-200 pt-6 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-500" />

              <h2 className="text-sm font-semibold text-gray-900">
                AI Insights
              </h2>
            </div>

            {/* Summary */}

            {note.summary && (
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Summary
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {note.summary}
                </p>
              </div>
            )}

            {/* Knowledge Tree */}

            {note.knowledgeTree && (
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Knowledge Tree
                </h3>

                <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                  {note.knowledgeTree}
                </pre>
              </div>
            )}

            {/* Tags */}

            {note.tags && note.tags.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Tags
                </h3>

                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Questions */}

            {note.interviewQuestions &&
              note.interviewQuestions.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Interview Questions
                  </h3>

                  <ul className="space-y-2">
                    {note.interviewQuestions.map((question, index) => (
                      <li
                        key={index}
                        className="text-gray-700"
                      >
                        • {question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Flashcards */}

            {note.flashcards &&
              note.flashcards.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Flashcards
                  </h3>

                  <div className="space-y-3">
                    {(note.flashcards as {
                      question: string;
                      answer: string;
                    }[]).map((card, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 bg-white p-4"
                      >
                        <p className="font-medium text-gray-900">
                          Q. {card.question}
                        </p>

                        <p className="mt-2 text-gray-700">
                          A. {card.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Actions */}

        <div className="mt-8 border-t border-gray-200 pt-6 flex justify-end gap-3">
          <form
            action={async () => {
              "use server";
              await deleteNote(note.id);
            }}
          >
            <button
              type="submit"
              className="rounded-lg border border-red-300 px-6 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </form>

          <Link
            href={`/notes/${note.id}/edit`}
            className="rounded-lg bg-[#0F172A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#1E293B] transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}