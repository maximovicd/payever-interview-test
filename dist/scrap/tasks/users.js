"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const USERS_FILE = "./scrapped_users.json";
const scrapUsers = (page) => {
    return axios_1.default.get(`https://reqres.in/api/users?page=${page}`)
        .then((res) => {
        const users = res.data.data;
        if (users) {
            for (const u of users) {
                fs_1.default.appendFileSync(USERS_FILE, JSON.stringify(u) + ",\r\n");
            }
        }
    })
        .catch((e) => { throw e; });
};
exports.default = scrapUsers;
//# sourceMappingURL=users.js.map