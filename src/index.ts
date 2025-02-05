import express from "express";
import cors from "cors";
import { chat, template } from "./functions";
import {config} from "dotenv"

config()
const PORT = process.env.APP_PORT_NUMBER||3000
const app = express();
app.use(cors());
app.use(express.json());


app.post("/chat", async (req, res) => {
  const { messages } = req.body;
  console.log("chat hit");

  chat(messages, res);
});

app.post("/technology", async (req, res) => {
  const { prompt } = req.body;
  console.log("tech hit");

  template(prompt, res);
});

app.listen(PORT, () => console.log("running on "+PORT));
