import { AzureOpenAI } from "openai";
import type {
  ChatCompletion,
  ChatCompletionCreateParamsStreaming,
  ChatCompletionCreateParamsNonStreaming,
} from "openai/resources/index";

import { BASE_PROMPT, getSystemPrompt } from "./prompt";
import { basePromptReact } from "./defaults/react";
import { basePromptNode } from "./defaults/node";
import { sampleresponse } from "./utils/sampleResponse";



const endpoint =
  process.env["AZURE_OPENAI_ENDPOINT"] ;
const apiKey =
  process.env["AZURE_OPENAI_API_KEY"] ;

const apiVersion = "2024-08-01-preview";
const deploymentName = "gpt-4o-test";

function getClient(): AzureOpenAI {
  return new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment: deploymentName,
  });
}

function createChatMessages(
  messages: any
): ChatCompletionCreateParamsStreaming {
  return {
    messages: [
      {
        role: "system",
        content: getSystemPrompt(),
      },{
        role:"system",
        content:"make sure the base files are also created and added for the particular project and include the steps for those too in your response"
      }, 
  
    
      // { role: "user", content: BASE_PROMPT  },
      ...messages,
    ],
    model: deploymentName,
    stream: true,
  };
}

function createTemplateMessage(
  message: any
): ChatCompletionCreateParamsNonStreaming {
  return {
    messages: [
      {
        role: "system",
        content:
          "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "",
    max_tokens: 200,
  };
}

export async function chat(message: any, res: any) {
  const client = getClient();
  const messages = createChatMessages(message);
  const result = await client.chat.completions.create(messages);
  for await (const chunk of result) {
    // process.stdout.write(chunk.choices[0]?.delta?.content || "");
    res.write(chunk.choices[0]?.delta?.content || "");
  }
  res.end();
}

export async function template(message: any, res: any) {
  const client = getClient();
  const messages = createTemplateMessage(message);
  const result = await client.chat.completions.create(messages);

  let response = "";

  for (const choice of result.choices) {
    console.log(choice.message);
    response += choice.message.content;
  }

  if (response.startsWith("react")) {
    res.json({
      prompts: [
        BASE_PROMPT,
        `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePromptReact}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      ],
      uiPrompts: [basePromptReact],
    });

    return;
  }
  if (response.startsWith("node")) {
    res.json({
      prompts: [
        `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePromptNode}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      ],
      uiPrompts: [basePromptNode],
    });
    return;
  } else {
    res.json({ msg: "we do not support that technology yet" });
  }
}



export async function templateUtil(res:any){

    res.json({
      prompts: [
        `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePromptReact}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      ],
      uiPrompts: [basePromptReact],
    });

}


export async function chatUtil(res:any){
  res.send(sampleresponse)
}