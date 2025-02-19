"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userId: { type: String, unique: true },
    date: { type: Date, default: Date.now },
    attemptsLeft: { type: Number, default: 3 },
});
exports.userModel = mongoose_1.default.model("userModel", userSchema);
