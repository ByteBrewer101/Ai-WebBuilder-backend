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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMiddleware = dbMiddleware;
const db_1 = require("../db");
const express_1 = require("@clerk/express");
function dbMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }
            let user = yield db_1.userModel.findOne({ userId });
            if (!user) {
                const clerkUser = yield express_1.clerkClient.users.getUser(userId);
                if (!clerkUser) {
                    return res.status(404).json({ error: "User not found in Clerk" });
                }
                user = yield db_1.userModel.create({
                    userId,
                    attemptsLeft: 6,
                    date: new Date(),
                });
                return next();
            }
            const currentDate = new Date();
            const lastAttemptDate = user.date;
            if (lastAttemptDate.getDate() === currentDate.getDate() &&
                lastAttemptDate.getMonth() === currentDate.getMonth() &&
                lastAttemptDate.getFullYear() === currentDate.getFullYear()) {
                if (user.attemptsLeft > 0) {
                    user.attemptsLeft -= 1;
                    yield user.save();
                    return next(); // Allow the request
                }
                else {
                    return res
                        .status(429)
                        .json({ error: "Daily attempt limit reached. Try again tomorrow." });
                }
            }
            else {
                user.attemptsLeft = 6;
                user.date = currentDate;
                yield user.save();
                return next();
            }
        }
        catch (error) {
            console.error("Database middleware error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
