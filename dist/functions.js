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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = chat;
exports.template = template;
exports.templateUtil = templateUtil;
exports.chatUtil = chatUtil;
const openai_1 = require("openai");
const prompt_1 = require("./prompt");
const react_1 = require("./defaults/react");
const node_1 = require("./defaults/node");
const sampleResponse_1 = require("./utils/sampleResponse");
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const apiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2024-08-01-preview";
const deploymentName = "gpt-4o-test";
function getClient() {
    return new openai_1.AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment: deploymentName,
    });
}
function createChatMessages(messages) {
    return {
        messages: [
            {
                role: "system",
                content: (0, prompt_1.getSystemPrompt)(),
            }, {
                role: "system",
                content: "make sure the base files are also created and added for the particular project and include the steps for those too in your response"
            },
            // { role: "user", content: BASE_PROMPT  },
            ...messages,
        ],
        model: deploymentName,
        stream: true,
    };
}
function createTemplateMessage(message) {
    return {
        messages: [
            {
                role: "system",
                content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
            },
            {
                role: "user",
                content: "make sure what output you give it should run and not give error  "
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
function chat(message, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        var _d, _e;
        const client = getClient();
        const messages = createChatMessages(message);
        const result = yield client.chat.completions.create(messages);
        try {
            for (var _f = true, result_1 = __asyncValues(result), result_1_1; result_1_1 = yield result_1.next(), _a = result_1_1.done, !_a; _f = true) {
                _c = result_1_1.value;
                _f = false;
                const chunk = _c;
                // process.stdout.write(chunk.choices[0]?.delta?.content || "");
                res.write(((_e = (_d = chunk.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content) || "");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_f && !_a && (_b = result_1.return)) yield _b.call(result_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res.end();
    });
}
function template(message, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = getClient();
        const messages = createTemplateMessage(message);
        const result = yield client.chat.completions.create(messages);
        let response = "";
        for (const choice of result.choices) {
            console.log(choice.message);
            response += choice.message.content;
        }
        if (response.startsWith("react")) {
            res.json({
                prompts: [
                    prompt_1.BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePromptReact}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [react_1.basePromptReact],
            });
            return;
        }
        if (response.startsWith("node")) {
            res.json({
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${node_1.basePromptNode}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [node_1.basePromptNode],
            });
            return;
        }
        else {
            res.json({ msg: "we do not support that technology yet" });
        }
    });
}
function templateUtil(res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            prompts: [
                `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePromptReact}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
            ],
            uiPrompts: [react_1.basePromptReact],
        });
    });
}
function chatUtil(res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(sampleResponse_1.sampleresponse);
    });
}
