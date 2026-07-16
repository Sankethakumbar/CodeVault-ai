"use server";

import groq from "@/lib/groq";

export async function generateAI(content: string) {
  const prompt = `
You are an expert software engineer, technical educator, and interviewer.

Your job is to convert developer notes into an interview-ready study guide.

Return ONLY valid JSON.

{
  "summary": "A concise 2-3 sentence summary.",

  "knowledgeTree": "A detailed hierarchical knowledge tree in plain text using tree characters.",

  "tags": [
    "3-5 short technical tags"
  ],

  "interviewQuestions": [
    "Exactly 5 interview questions from beginner to advanced."
  ],

  "flashcards": [
    {
      "question": "",
      "answer": ""
    }
  ]
}

Rules:

1. Return ONLY valid JSON.
2. No markdown.
3. No explanations.
4. No code fences.
5. Generate exactly 5 interview questions.
6. Generate exactly 5 flashcards.

For knowledgeTree:
Generate a detailed Knowledge Tree in plain text.

Rules:

• Use a hierarchical tree structure.

• Include only the sections relevant to the topic.

Possible sections include:

- Definition
- Purpose
- Why it is used
- Syntax (if applicable)
- Key Concepts
- Types / Variations
- Workflow / Lifecycle (if applicable)
- Advantages
- Limitations (if applicable)
- When to Use
- Best Practices
- Common Mistakes
- Real-world Example
- Interview Tips

• Keep every point short (1-2 lines).

• Include small code snippets wherever useful.

• Make it interview-oriented and easy to revise in under 2 minutes.


Developer Notes:

${content}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const result = response.choices[0].message.content;

  if (!result) {
    throw new Error("No AI response.");
  }

  return JSON.parse(result);
}