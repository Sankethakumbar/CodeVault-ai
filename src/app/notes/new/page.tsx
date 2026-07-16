import { NoteEditor } from "@/components/notes/NoteEditor";
import { generateAI } from "@/actions/ai";
export default function NewNotePage() {
  return <NoteEditor />;


}

const test = await generateAI(
  "React Hooks allow function components to use state and side effects."
);

console.log(test);