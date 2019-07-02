"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
class ImageCacheService {
    static getFilenameForUserId(userId) {
        const fileName = `${ImageCacheService.FILES_LOCATION}${userId}.file`;
        return fileName;
    }
    static fileExists(userId) {
        const fileName = ImageCacheService.getFilenameForUserId(userId);
        return fs_1.default.existsSync(fileName);
    }
    static createFile(userId, fileURL, callback) {
        const fileName = ImageCacheService.getFilenameForUserId(userId);
        const file = fs_1.default.createWriteStream(fileName, {
            autoClose: true,
            encoding: "base64",
        });
        const request = https_1.default.get(fileURL, (response) => {
            if (response.statusCode !== 200) {
                return callback(null);
            }
            const stream = response.pipe(file);
            stream.on("close", () => callback(fileName));
        });
        request.on("error", () => callback(null));
    }
}
ImageCacheService.FILES_LOCATION = "./cache/";
exports.default = ImageCacheService;
//# sourceMappingURL=ImageCacheService.js.map