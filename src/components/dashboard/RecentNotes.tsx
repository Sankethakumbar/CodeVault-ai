import { NoteCard } from "../notes/NoteCard";
import Link from "next/link";
interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string | Date;
}

interface RecentNotesProps {
  notes: Note[];
}

export function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <section>
      <p className="text-xs font-mono tracking-wide text-orange-500">
        NOTES.RECENT()
      </p>
      <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-4">
        Recent Notes
      </h2>

      {notes.length === 0 ? (
         <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white/50 px-6 py-14 text-center">
   <p className="font-serif text-base font-medium text-[#0B1220]">No notes yet</p>
   <p className="mt-1 text-sm text-[#0B1220]/50">Create your first note to start building your knowledge vault.</p>
   <Link href="/notes/new" className="mt-5 rounded-xl bg-[#0B1220] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1E293B]">
     + Create your first note
   </Link>
 </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      )}
    </section>
  );
}