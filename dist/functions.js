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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.technologyHandler = technologyHandler;
exports.Chat = Chat;
const ollama_1 = __importDefault(require("ollama"));
function technologyHandler(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = [
            {
                role: "system",
                content: "Return either node or react based on what do you think this project should be. ONLY return a SINGLE WORD either 'node' or 'react'. Do not return anything extra",
            },
            { role: "user", content: prompt }
        ];
        const response = yield ollama_1.default.chat({
            model: "codegemma:latest",
            messages: message,
            options: {
                temperature: 0,
            },
            stream: false,
        });
        return response.message.content;
    });
}
function Chat(message, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        // const message = [
        //   { role: "system", content: getSystemPrompt() },
        //   { role: "assistant", content: basePromptReact },
        //   { role: "user", content: prompt },
        // ];
        console.log("chat hit");
        const response = yield ollama_1.default.chat({
            model: "codegemma:latest",
            options: { temperature: 0.7 },
            messages: message,
            stream: true,
        });
        try {
            for (var _d = true, response_1 = __asyncValues(response), response_1_1; response_1_1 = yield response_1.next(), _a = response_1_1.done, !_a; _d = true) {
                _c = response_1_1.value;
                _d = false;
                const part = _c;
                res.write(part.message.content);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = response_1.return)) yield _b.call(response_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res.end();
    });
}
// Chat("write a server side todo list project using nodejs ");
