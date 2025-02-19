import express from "express";
import cors from "cors";
import { chat, chatUtil, template, templateUtil } from "./functions";
import { config } from "dotenv";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { dbMiddleware } from "./middleware";
import mongoose from "mongoose";
import { userModel } from "./db";
config();
const mongouri = process.env.MONGO_URI || "";

async function main() {
  await mongoose.connect(mongouri);

  console.log("db connected");
}

main().catch((err) => console.log(err));

const PORT = process.env.APP_PORT_NUMBER || 3000;
const app = express();
app.use(cors());
app.use(express.json());




const productRouter = express.Router();
app.use(productRouter);

//@ts-expect-error
productRouter.use(dbMiddleware);

productRouter.post("/chat", requireAuth(), async (req, res) => {
  const { messages } = req.body;
  console.log("chat hit");

  chat(messages, res);
  // chatUtil(res);
  return;
});

productRouter.post("/technology", requireAuth(), async (req, res) => {
  const { prompt } = req.body;
  console.log("tech hit");

  template(prompt, res);

  // templateUtil(res);
  return;
});

app.listen(PORT, () => console.log("running on " + PORT));
