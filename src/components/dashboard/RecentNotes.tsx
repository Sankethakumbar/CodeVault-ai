import { NoteCard } from "../notes/NoteCard";

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
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-gray-900 font-medium">No notes yet.</p>
          <p className="text-sm text-gray-500 mt-1">
            Create your first note to start building your knowledge vault.
          </p>
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