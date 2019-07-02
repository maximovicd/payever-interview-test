"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./api/controllers/user");
const app = express_1.default();
app.get("/api/user/:userId", user_1.getUser);
app.get("/api/user/:userId/avatar", user_1.getUserAvatar);
app.delete("/api/user/:userId/avatar", (req, res, next) => {
    res.send(`Delete user ${req.params.userId} avatar`);
});
exports.default = app;
//# sourceMappingURL=app.js.map