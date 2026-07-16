import Link from "next/link";
import { FileText } from "lucide-react";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  updatedAt: string | Date;
}

function formatUpdatedAt(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;

  const diffMs = Date.now() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Updated today";
  if (diffDays === 1) return "Updated 1 day ago";
  return `Updated ${diffDays} days ago`;
}

export function NoteCard({
  id,
  title,
  content,
  updatedAt,
}: NoteCardProps) {
  return (
    <Link
      href={`/notes/${id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50">
          <FileText className="h-4 w-4 text-orange-500" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {content.length > 90
              ? content.slice(0, 90) + "..."
              : content}
          </p>

          <span className="mt-3 inline-block text-xs text-gray-400">
            {formatUpdatedAt(updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}