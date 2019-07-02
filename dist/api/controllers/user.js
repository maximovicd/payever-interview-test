"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const ImageCacheService_1 = __importDefault(require("../service/ImageCacheService"));
exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send("Missing userId parameter");
    }
    return axios_1.default.get(`https://reqres.in/api/users/${userId}`).then((apiRes) => {
        return res.send(apiRes.data);
    })
        .catch((e) => res.status(500).send(e.message));
};
exports.getUserAvatar = (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send("Missing userId parameter");
    }
    const sendByName = (fileName) => {
        if (!fileName) {
            throw new Error("Error downloading file");
        }
        const buffer = fs_1.default.readFileSync(fileName).toString("base64");
        return res.send(buffer);
    };
    if (ImageCacheService_1.default.fileExists(userId)) {
        return sendByName(ImageCacheService_1.default.getFilenameForUserId(userId));
    }
    return axios_1.default.get(`https://reqres.in/api/users/${userId}`).then((apiRes) => ImageCacheService_1.default.createFile(userId, apiRes.data.data.avatar, sendByName))
        .catch((e) => res.status(500).send(e.message));
};
exports.deleteUserAvatar = (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send("Missing userId parameter");
    }
    try {
        fs_1.default.unlinkSync(ImageCacheService_1.default.getFilenameForUserId(userId));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
};
//# sourceMappingURL=user.js.map