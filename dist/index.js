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
const express_2 = require("@clerk/express");
const middleware_1 = require("./middleware");
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)();
const mongouri = process.env.MONGO_URI || "";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(mongouri);
        console.log("db connected");
    });
}
main().catch((err) => console.log(err));
const PORT = process.env.APP_PORT_NUMBER || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const productRouter = express_1.default.Router();
app.use(productRouter);
//@ts-expect-error
productRouter.use(middleware_1.dbMiddleware);
productRouter.post("/chat", (0, express_2.requireAuth)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messages } = req.body;
    console.log("chat hit");
    // chat(messages, res);
    (0, functions_1.chatUtil)(res);
    return;
}));
productRouter.post("/technology", (0, express_2.requireAuth)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    console.log("tech hit");
    // template(prompt, res);
    (0, functions_1.templateUtil)(res);
    return;
}));
app.listen(PORT, () => console.log("running on " + PORT));
