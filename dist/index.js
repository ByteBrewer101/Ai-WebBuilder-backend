"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const functions_1 = require("./functions");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PORT = process.env.APP_PORT_NUMBER || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messages } = req.body;
    console.log("chat hit");
    // chat(messages, res);
    (0, functions_1.chatUtil)(res);
    return;
}));
app.post("/technology", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    console.log("tech hit");
    // template(prompt, res);
    (0, functions_1.templateUtil)(res);
    return;
}));
app.listen(PORT, () => console.log("running on " + PORT));
