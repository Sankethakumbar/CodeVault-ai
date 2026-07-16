import { generateAI } from "@/actions/ai";

export default async function TestAIPage() {
  const result = await generateAI(
    `React Hooks allow function components to use state and side effects.
    useState manages state.
    useEffect handles side effects.`
  );

  console.log(result);

  return (
    <div className="p-8">
      <h1>AI Test</h1>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}