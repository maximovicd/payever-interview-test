"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const users_1 = __importDefault(require("./tasks/users"));
const app = express_1.default();
const port = 1338;
let currentPage = 1;
node_cron_1.default.schedule("* * * * *", () => {
    try {
        users_1.default(currentPage);
        currentPage++;
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e.message);
    }
});
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Cron task running on ${port}`));
//# sourceMappingURL=index.js.map