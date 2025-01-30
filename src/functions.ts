import ollama from "ollama";
import { basePromptNode } from "./defaults/node";
import { basePromptReact } from "./defaults/react";
import { getSystemPrompt } from "./prompt";

export async function technologyHandler(prompt: string) {
  const message = [
    {
      role: "system",
      content:
      "Return either node or react based on what do you think this project should be. ONLY return a SINGLE WORD either 'node' or 'react'. Do not return anything extra",
    },
    { role: "user", content: prompt }
  ];
  const response = await ollama.chat({
    model: "codegemma:latest",

    messages: message,
    options: {
      temperature: 0,
    },
    stream: false,
  });
  return response.message.content;
}




export async function Chat(prompt: string) {
  const message = [
    { role: "system", content: getSystemPrompt() },
    { role: "assistant", content: basePromptReact },
    { role: "user", content: prompt },
  ];
  const response = await ollama.chat({
    model: "deepseek-coder-v2:16b",
    options: { temperature: 0.7 },
    messages: message,
    stream: true,
  });
  for await (const part of response) {
    process.stdout.write(part.message.content);
  }
}

// Chat("write a server side todo list project using nodejs ");

