import ollama from "ollama";
import express, { response } from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompt";
import { basePromptReact } from "./defaults/react";
import { basePromptNode } from "./defaults/node";
import { technologyHandler } from "./functions";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors())

app.post("/technology", async (req, res) => {
  const { prompt } = req.body;
console.log("technology hit");
  const response = await technologyHandler(prompt);

  if (!response) {
    res.json({
      msg: "error",
    });
  } else if (response.startsWith("react")) {
     res.json({
       prompts: [
  
         BASE_PROMPT,
         `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePromptReact}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
       ],
       uiPrompts: [basePromptReact],
     });
     return
  } else if (response.startsWith("node")) {
       res.json({
         prompts: [
           `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePromptNode}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
         ],
         uiPrompts: [basePromptNode],
       });
       return
  } else {
    res.json({
      msg: "we don't support this technology yet",
    });
  }
});

app.listen(5000, () => {
  console.log("backend running");
});
